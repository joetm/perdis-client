import React from 'react'
import { Block, Row, Col, Button, Preloader } from 'framework7-react'
import { Device } from 'framework7'

const styles = {
  video: {
    width:'480px',
    height:'360px',
    border: '1px solid #000000',
    marginLeft: '10px',
    backgroundColor: '#303030',
  }
}

const TIMEOUT = 3000; // 10000;

const hasEchoCancellation = true
const cameraOptions = {
  audio: {
    echoCancellation: {exact: hasEchoCancellation}
  },
  video: {
    facingMode: "user", // front camera
    width: 1280,
    height: 720,
  }
}

/* globals MediaRecorder */

export default class ReactionComponent extends React.Component {
  constructor(props) {
    super(props)
    // this.recordedBlobs = []
    // this.mediaSource = new MediaSource()
    // this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false)
    // this.mediaRecorder
    // this.sourceBuffer
    // ---
    this.stream
    // ---
    this.state = {
      submitBtnDisabled: true,
      videoVisible: false,
      artworkID: false,
    }
    // ---
    this.recordedRef = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.skip = this.skip.bind(this)
    this.activateStream = this.activateStream.bind(this)
      this.handleStreamSuccess = this.handleStreamSuccess.bind(this)
      this.handleStreamError = this.handleStreamError.bind(this)
    this.resetVideo = this.resetVideo.bind(this)
    // this.start = this.start.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    // this.handleDataAvailable = this.handleDataAvailable.bind(this)
    // this.handleSourceOpen = this.handleSourceOpen.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    // (re-)activate the recording when artwork changes
    console.info("componentWillReceiveProps")
    if (!this.state.artworkID || nextProps.artworkID !== this.state.artworkID) {
      this.setState({artworkID: nextProps.artworkID})
      this.activateStream()
    }
  }
  submit() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'reaction',
      id: artworkID,
    }
    // const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})
    // feedback.payload = blob
    // const superBuffer = new Blob(this.stream, {type: 'video/webm'})
    // const buff = window.URL.createObjectURL(superBuffer)
    // feedback.payload = buff
    feedback.payload = this.stream
    send(feedback)
    // unload video and stream
    this.resetVideo()
  }
  skip() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'reaction',
      id: artworkID,
    }
    feedback.payload = "skip"
    send(feedback)
    // unload video and stream
    this.resetVideo()
  }
  startTimer() {
    setTimeout(() => {
      // stop recording
      // this.mediaRecorder.stop()
      console.log('this.stream', this.stream)
      const tracks = this.stream.getTracks()
      console.log('tracks', tracks)
      // stop audio
      tracks[0].stop()
      // stop video
      tracks[1].stop()
      // update UI
      this.setState({
        videoVisible: true,
        submitBtnDisabled: false,
      })
      // play the video
      this.play()
    }, TIMEOUT)
  }
  // handleSourceOpen(event) {
  //   console.log('MediaSource opened')
  //   this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
  //   console.log('Source buffer: ', this.sourceBuffer)
  // }
  resetVideo() {
    this.stream = null;
    const recordedNode = this.recordedRef.current
    recordedNode.srcObject = null
    recordedNode.src = null
    this.setState({
      videoVisible: false,
    })
  }
  activateStream() {
    if (Device.desktop) {
      console.log('activateStream:WEB')
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      navigator.mediaDevices.getUserMedia(cameraOptions).then(
        this.handleStreamSuccess
      ).catch(
        this.handleStreamError
      )
    } else {
      // request permissions
      // cordova.plugins.diagnostic.requestCameraAuthorization(
      //   function (status) {
      //     console.log('activateStream:Android')
      //     console.log("Camera status", status)
      //     if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
      //       // this.resetVideo()
      //       if (!navigator.mediaDevices.getUserMedia) {
      //         console.error("getUserMedia not available");
      //       }
            // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-media-capture/
            navigator.device.capture.captureVideo(
              this.handleStreamSuccess,
              this.handleStreamError,
              cameraOptions
            )
      //     } else {
      //       // permission denied - inform user
      //       console.error("Permission was denied")
      //     }
      //   }, function(error){
      //       console.error("Permission Error: " + error);
      //   }, false
      // )
    }// if (Device.desktop)
  }
    handleStreamSuccess(stream) {
      console.log('getUserMedia() got stream:', stream)
      // window.stream = stream // make stream available to browser console
      this.stream = stream // make stream available so that it can be stopped later
      // const videoNode = this.videoRef.current
      // videoNode.srcObject = stream
      this.startTimer()
    }
    handleStreamError(error) {
      console.error('navigator.getUserMedia error: ', error)
    }
  // handleDataAvailable(event) {
  //   if (event.data && event.data.size > 0) {
  //     this.recordedBlobs.push(event.data)
  //   }
  // }
  // start() {
  //   const recordedNode = this.recordedRef.current

  //   let options = {mimeType: 'video/webm;codecs=vp9'}
  //   if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //     console.error(`${options.mimeType} is not Supported`);
  //     // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //     options = {mimeType: 'video/webm;codecs=vp8'};
  //     if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //       console.error(`${options.mimeType} is not Supported`);
  //       // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //       options = {mimeType: 'video/webm'};
  //       if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  //         console.error(`${options.mimeType} is not Supported`);
  //         // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
  //         options = {mimeType: ''};
  //       }
  //     }
  //   }
  //   try {
  //     this.mediaRecorder = new MediaRecorder(window.stream, options)
  //   } catch (e) {
  //     console.error('Exception while creating MediaRecorder:', e)
  //     // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`
  //     return
  //   }
  //   console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options)
  //   // recordButton.textContent = 'Stop Recording';
  //   // playButton.disabled = true;
  //   this.mediaRecorder.onstop = function (event) {
  //     console.log('Recorder stopped: ', event)
  //   };
  //   this.mediaRecorder.ondataavailable = this.handleDataAvailable
  //   this.mediaRecorder.start(10) // collect 10ms of data
  //   console.log('MediaRecorder started', this.mediaRecorder)
  // }
  play() {
    // const recordedNode = this.recordedRef.current
    // const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'})
    // recordedNode.src = null
    // recordedNode.srcObject = null
    // recordedNode.src = window.URL.createObjectURL(superBuffer)
    // recordedNode.controls = true
    // recordedNode.play()
    const recordedNode = this.recordedRef.current
    console.log('this.stream', this.stream);
    // recordedNode.srcObject = this.stream;
    recordedNode.src = window.URL.createObjectURL(this.stream);
    recordedNode.onloadedmetadata = function(e) {
      recordedNode.play();
    };
  }
  stop() {

  }
  componentDidMount() {
    this.activateStream()
  }
  render() {
    const { videoVisible } = this.state
    return (
      <Block id="webcam-video">

        {
          videoVisible &&
            <Block>
              <video
                style={styles.video}
                id="recorded"
                ref={this.recordedRef}
                muted={true}
                loop={true}
              ></video>
            </Block>
        }

        <div id="errorMsg"></div>

        <Block style={{margin: '10em 0', display: videoVisible ? 'none' : 'block'}}>
          <h1>Look at the artwork!</h1>
          <Preloader color="black" size="50"></Preloader>
        </Block>

        <Block style={{display: videoVisible ? 'block' : 'none'}}>
          <h1>We recorded your reaction to this artwork.</h1>
          <h2>Submit the reaction to the artist?</h2>
        </Block>

        <Block style={{display: videoVisible ? 'block' : 'none'}}>
          <Row>
            <Col width="20"></Col>
            <Col width="30">
              <Button fill
                onClick={this.submit}
                disabled={this.state.submitBtnDisabled}
              >
                Submit
              </Button>
            </Col>
            <Col width="30">
              <Button fill
                onClick={this.skip}
              >
                Skip
              </Button>
            </Col>
            <Col width="20"></Col>
          </Row>
          <div>Clicking the submit button will submit your video to the artist</div>
        </Block>

      </Block>
    ) 
  }
}
