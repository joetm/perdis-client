import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'

const styles = {
  video: {
    width:'240px',
    height:'180px',
    border: '1px solid #000000',
    marginRight: '10px',
    backgroundColor: '#303030',
  },
  recorded: {
    width:'240px',
    height:'180px',
    border: '1px solid #000000',
    marginLeft: '10px',
    backgroundColor: '#303030',
  },
}


/* globals MediaRecorder */

const StartButtonTxt = function () { return <span><Icon fa="play"></Icon> Start Recording</span> }
const StopButtonTxt  = function () { return <span><Icon fa="stop"></Icon> Stop Recording</span> }


export default class VideoComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.recordedBlobs = []
    this.mediaSource = new MediaSource()
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false)
    this.mediaRecorder
    this.sourceBuffer
    // ---
    this.state = {
      buttonTxt: <StartButtonTxt />,
      buttonAction: this.start,
      submitBtnDisabled: true,
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
      payload: 'TODO',
    }
    if (Device.desktop) {
      const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})
      // const url = window.URL.createObjectURL(blob)
      feedback.payload = blob
    }
    const ret = send(feedback)
    if (ret) {
      this.resetVideo()
    }
  }
  enableSubmitBtn() {
    this.setState({
      submitBtnDisabled: false,
    })
  }
  resetVideo () {
    if (Device.desktop) {
      this.recordedBlobs = []
      // this.mediaRecorder
      this.sourceBuffer = null
      // kill the stuff in the video frame
      const recordedNode = this.recordedRef.current
      recordedNode.stop()
      recordedNode.src = null
      recordedNode.srcObject = null
      recordedNode.removeAttribute('src')
      recordedNode.removeAttribute('srcObject')
      recordedNode.controls = false
      recordedNode.load()
    } else {
      // TODO
    }
  }
  handleSourceOpen(event) {
    if (Device.desktop) {
      console.log('MediaSource opened')
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
      console.log('Source buffer: ', this.sourceBuffer)
    }
  }
  activateStream() {
    console.log('activateStream')
    const hasEchoCancellation = true
    // const videoNode = this.videoRef.current
    // const canvasNode = window.canvas = this.recordedRef.current
    // canvasNode.width = 240;
    // canvasNode.height = 180;
    const constraints = {
      audio: {
        echoCancellation: {exact: hasEchoCancellation}
      },
      video: {
        width: 1280, height: 720
      }
    }
    // console.log('Using media constraints:', constraints)
    navigator.mediaDevices.getUserMedia(constraints).then(
      // (stream)
      this.handleGetUserMediaSuccess
    ).catch(
      this.handleGetUserMediaError
    )
  }
    handleGetUserMediaSuccess(stream) {
      console.log('getUserMedia() got stream:', stream);
      window.stream = stream // make stream available to browser console
      const videoNode = this.videoRef.current
      videoNode.srcObject = stream
    }
    handleGetUserMediaError(error) {
      console.error('navigator.getUserMedia error: ', error)
    }
  handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data)
    }
  }
  start() {
    const videoNode = this.videoRef.current
    // const recordedNode = this.recordedRef.current

    let options = {mimeType: 'video/webm;codecs=vp9'}
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`);
      // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
      options = {mimeType: 'video/webm;codecs=vp8'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
        options = {mimeType: 'video/webm'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not Supported`);
          // errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
          options = {mimeType: ''};
        }
      }
    }

    try {
      this.mediaRecorder = new MediaRecorder(window.stream, options)
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
    };
    this.mediaRecorder.ondataavailable = this.handleDataAvailable
    this.mediaRecorder.start(10) // collect 10ms of data
    console.log('MediaRecorder started', this.mediaRecorder)

    // change button text and action
    this.setState({
      buttonTxt: <StopButtonTxt />,
      buttonAction: this.stop,
    })
  }
  stop() {
    // const videoNode = this.videoRef.current
    // const recordedNode = this.recordedRef.current
    this.mediaRecorder.stop()
    // change button text and action
    this.setState({
      buttonTxt: <StartButtonTxt />,
      buttonAction: this.start,
    })
    // console.log('Recorded Blobs: ', this.recordedBlobs)
    this.play()
    // enable the submit button
    this.enableSubmitBtn()
  }
  play() {
    // const videoNode = this.videoRef.current
    const recordedNode = this.recordedRef.current
    const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'})
    recordedNode.src = null
    recordedNode.srcObject = null
    recordedNode.src = window.URL.createObjectURL(superBuffer)
    recordedNode.controls = true
    recordedNode.play()
  }
  componentDidMount() {
    if (Device.desktop) {
      this.activateStream()
    }
  }
  render() {
    return (
      <Block id="webcam-video">

        <p>Send a selfie video to the artist!</p>

        <Block>
          <video id="video"    ref={this.videoRef}    style={styles.video}    playsInline={true} autoPlay={true} muted={true}></video>
          <video id="recorded" ref={this.recordedRef} style={styles.recorded} playsInline={true} loop={true}></video>
        </Block>

        <div id="errorMsg"></div>

        <Block>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button onClick={this.state.buttonAction}>
                {this.state.buttonTxt}
              </Button>
            </Col>
            {/*
            <Col width="25">
              <Button onClick={this.stop}>
                <StopButtonTxt />
              </Button>
            </Col>
            <Col width="20">
              <Button onClick={this.play}>
                <Icon fa="stop"></Icon> Play Recording
              </Button>
            </Col>
            */}
            <Col width="33"></Col>
          </Row>
        </Block>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button fill
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
