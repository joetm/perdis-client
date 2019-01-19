import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'
import { getMediaRecorderOptions } from './videohelpers'


// const hasEchoCancellation = true
const cameraOptions = {
  audio: false, // { echoCancellation: {exact: hasEchoCancellation} },
  video: {
    facingMode: "user", // front camera
    width:  1280,
    height: 720,
  }
}


// storage location:
// externalDataDirectory file:///storage/emulated/0/Android/data/com.perdis.prototype/files/


/* globals MediaRecorder */

const StartButtonTxt = function () { return <span><Icon fa="dot-circle"></Icon> Start Recording</span> }
const StopButtonTxt  = function () { return <span><Icon fa="stop-circle"></Icon> Stop Recording</span> }

// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html
function writeFile(fileEntry, dataObj) {
  // If data object is not passed in, cancel saving
  if (!dataObj) { return }
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function() {
      console.log("Successful file write.", fileEntry)
    };
    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString())
    };
    fileWriter.write(dataObj)
  });
}


export default class VideoComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.recordedBlobs = []
    this.mediaSource = new MediaSource()
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false)
    this.mediaRecorder
    this.sourceBuffer
    this.stream
    // ---
    this.state = {
      buttonTxt: <StartButtonTxt />,
      buttonAction: this.start,
      submitBtnDisabled: true,
      artworkID: false,
      isRecording: false,
      isPlaying: false,
    }
    // ---
    this.videoRef    = React.createRef()
    this.recordedRef = React.createRef()
    this.submit = this.submit.bind(this)
    this.activateStream = this.activateStream.bind(this)
      this.handleGetUserMediaSuccess = this.handleGetUserMediaSuccess.bind(this)
      this.handleGetUserMediaError = this.handleGetUserMediaError.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.play = this.play.bind(this)
    this.handleDataAvailable = this.handleDataAvailable.bind(this)
    this.handleSourceOpen = this.handleSourceOpen.bind(this)
    this.state.buttonAction = this.state.buttonAction.bind(this)
    this.enableSubmitBtn = this.enableSubmitBtn.bind(this)
    this.resetVideo = this.resetVideo.bind(this)
  }
  submit() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'video',
      id: artworkID,
    }
    const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})

    // write video to external storage
    if (Device.android) {

      window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, (dirEntry) => {
        console.log('file system open: ' + dirEntry.name)
        dirEntry.getFile("TESTFILE.webm", { create: true, exclusive: false }, (fileEntry) => {
          writeFile(fileEntry, blob)
        }, this.onErrorCreateFile)
      }, this.onErrorLoadFs)

      // this stores in private app dir
      // console.log('LocalFileSystem.PERSISTENT', LocalFileSystem.PERSISTENT);
      // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (fs) => {
      //   console.log('file system open: ' + fs.name);
      //   fs.root.getFile("TESTFILE.mp4", { create: true, exclusive: false }, (fileEntry) => {
      //     writeFile(fileEntry, blob)
      //   }, this.onErrorCreateFile)
      // }, this.onErrorLoadFs);

    }

    // TODO: store the path to the local file
    feedback.payload = blob
    const ret = send(feedback)
    if (ret) {
      this.resetVideo()
    }
  }
    onErrorLoadFs(error) {
      console.error('onErrorLoadFs', error)
    }
    onErrorCreateFile(error) {
      console.error('onErrorCreateFile', error)
    }
  enableSubmitBtn() {
    this.setState({
      submitBtnDisabled: false,
    })
  }
  resetVideo () {
    this.stream = null
    this.recordedBlobs = []
    this.sourceBuffer = null
    // this.mediaRecorder = null

    // kill the stuff in the video frame
    const videoNode = this.videoRef.current
    // videoNode.stop()
    videoNode.src = null
    videoNode.srcObject = null
    const recordedNode = this.recordedRef.current
    // recordedNode.stop()
    recordedNode.src = null
    recordedNode.srcObject = null
    // recordedNode.removeAttribute('src')
    // recordedNode.removeAttribute('srcObject')
    // recordedNode.controls = false
    // recordedNode.load()
    this.setState({
      isRecording: false,
      isPlaying: false,
    })
  }
  handleSourceOpen(event) {
    console.log('MediaSource opened')
    const options = getMediaRecorderOptions()
    this.sourceBuffer = this.mediaSource.addSourceBuffer(options) // 'video/webm; codecs="vp8"'
    console.log('Source buffer: ', this.sourceBuffer)
  }
  componentWillReceiveProps(nextProps) {
    // (re-)activate the recording when artwork changes
    console.info("componentWillReceiveProps")
    if (!this.state.artworkID || nextProps.artworkID !== this.state.artworkID) {
      this.setState({artworkID: nextProps.artworkID})
      this.activateStream()
    }
  }
  activateStream() {
    console.log('activateStream')
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    navigator.mediaDevices.getUserMedia(cameraOptions).then(
      this.handleGetUserMediaSuccess
    ).catch(
      this.handleGetUserMediaError
    )
  }
    handleGetUserMediaSuccess(stream) {
      console.log('getUserMedia() got stream:', stream);
      this.stream = stream // make stream available to other parts of the script
      const videoNode = this.videoRef.current
      videoNode.controls = false
      try {
        videoNode.srcObject = stream
      } catch (error) {
        videoNode.src = window.URL.createObjectURL(stream)
      }
    }
    handleGetUserMediaError(error) {
      console.error('navigator.getUserMedia error: ', error)
      this.setState({
        isRecording: false,
        isPlaying: false,
      })
    }
  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }
  start() {
    let options = getMediaRecorderOptions();

    // reset buffer
    this.recordedBlobs = []

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options)
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e)
      // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`
      return
    }

    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options)

    // recordButton.textContent = 'Stop Recording';
    // playButton.disabled = true;
    this.mediaRecorder.onstop = function (event) {
      console.log('Recorder stopped: ', event)
    }// .bind(this)

    this.mediaRecorder.ondataavailable = this.handleDataAvailable
    this.mediaRecorder.start(10) // collect 10ms of data
    console.log('MediaRecorder started', this.mediaRecorder)

    // change button text and action
    this.setState({
      buttonTxt: <StopButtonTxt />,
      buttonAction: this.stop,
      isRecording: true,
      isPlaying: false,
    })
  }
  stop() {
    this.mediaRecorder.stop()
    // change button text and action
    this.setState({
      buttonTxt: <StartButtonTxt />,
      buttonAction: this.start,
      isRecording: false,
      isPlaying: false,
    })
    this.play()
    // enable the submit button
    this.enableSubmitBtn()
  }
  play() {
    // const videoNode = this.videoRef.current
    const recordedNode = this.recordedRef.current
    // console.log('Recorded Blobs: ', this.recordedBlobs)
    const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'})
    // console.log('superBuffer: ', superBuffer)
    recordedNode.src = null
    recordedNode.srcObject = null

    try {
      recordedNode.srcObject = superBuffer
    } catch (error) {
      recordedNode.src = window.URL.createObjectURL(superBuffer)
    }

    recordedNode.onloadedmetadata = function(e) {
      console.log("video loaded", e)
      // console.log('width is',  this.videoWidth);
      // console.log('height is', this.videoHeight);
      recordedNode.controls = true
      this.setState({
        isPlaying: true
      })
      recordedNode.play()
    }.bind(this)
  }
  componentDidMount() {
    this.activateStream()
  }
  render() {
    const { isRecording, isPlaying } = this.state
    return (
      <Block id="webcam-video">

        <p>Send a selfie video to the artist!</p>

        <Block style={{display: isRecording ? 'block' : 'none'}}>
          <video id="video"    ref={this.videoRef}    style={{
              maxHeight: '250px',
              width: 'auto',
              maxWidth: '100%',
              border: isRecording ? '3px solid red' : '3px solid #303030',
              backgroundColor: '#303030',
            }}
            playsInline autoPlay muted
          ></video>
        </Block>

        <Block style={{display: isPlaying ? 'block' : 'none'}}>
          <video id="recorded" ref={this.recordedRef} style={{
              maxHeight: '250px',
              width: 'auto',
              maxWidth: '100%',
              border: '1px solid #000000',
              backgroundColor: '#303030'
            }}
            playsInline autoPlay loop muted
          ></video>
        </Block>

        <div id="errorMsg"></div>

        <Block>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button outline big
                onClick={this.state.buttonAction}
              >
                {this.state.buttonTxt}
              </Button>
            </Col>
            <Col width="33"></Col>
          </Row>
        </Block>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button fill big
              onClick={this.submit}
              disabled={this.state.submitBtnDisabled}
            >
              Submit
            </Button>
          </Col>
          <Col width="33"></Col>
        </Row>
        <div>Clicking this button will submit your video to the artist</div>

      </Block>
    ) 
  }
}
