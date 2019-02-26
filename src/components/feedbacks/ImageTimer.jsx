import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import CaptureButton from '../CaptureButton'
import Timer from '../Timer'


const styles = {
  video: {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '640px',
    border: '3px solid red',
    backgroundColor: '#303030',
  },
  img: {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '640px',
    border: '3px solid #303030',
    backgroundColor: '#303030',
  },
  center: {
    textAlign: 'center',
  },
}


export default class ImageTimerComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      submitBtnDisabled: true,
      errorMsg: null,
      image: null,
      artworkID: false,
      isRecording: false,
      selfieCaptured: false,
      timerRunning: false,
    }
    // ---
    this.videoRef  = React.createRef()
    this.canvasRef = React.createRef()
    // ---
    this.activateWebStream = this.activateWebStream.bind(this)
      this.handleStreamSuccess = this.handleStreamSuccess.bind(this)
      this.handleStreamError = this.handleStreamError.bind(this)
  }
  submit = () => {
    console.log("submitting feedback")
    const { send, artworkID } = this.props
    const { image } = this.state
    const feedback = {
      type: 'image',
      id: artworkID,
      payload: image,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetCapture()
    }
  }
  activateWebStream() {
    console.log('activateWebStream')
    const constraints = {
      audio: false,
      video: true
    }
    navigator.mediaDevices.getUserMedia(constraints).then(
      this.handleStreamSuccess
    ).catch(
      this.handleStreamError
    )
  }
    handleStreamSuccess(stream) {

      this.stream = stream

      this.setState({timerRunning: true})

      const videoNode = this.videoRef.current
      try {
        videoNode.srcObject = this.stream
      } catch (error) {
        videoNode.src = window.URL.createObjectURL(this.stream)
      }

    }
    handleStreamError(error) {
      console.error('navigator.getUserMedia error [%s]: ', error.code, error.name, error.message)
      let name = error.name
      if (error.name == 'NotSupportedError') {
        name = 'Browser Not Supported'
      }
      this.setState({
        errorMsg: name + ': ' + error.message,
      })
    }
  startTimer = () => {
    this.activateWebStream()
  }
  capture = () => {
    const videoNode = this.videoRef.current
    const canvasNode = this.canvasRef.current
    canvasNode.width = videoNode.videoWidth
    canvasNode.height = videoNode.videoHeight
    canvasNode.getContext('2d').drawImage(videoNode, 0, 0, canvasNode.width, canvasNode.height)
    const image = canvasNode.toDataURL("image/jpeg")
    // console.log('selfie', image);

    // stop streaming
    this.resetVideo()

    // store the image and
    // enable the submit button
    this.setState({
      image,
      submitBtnDisabled: false,
      isRecording: false,
      selfieCaptured: true,
      timerRunning: false,
    })
  }
  onResetButtonClick = () => {
    this.resetCapture()
  }
  resetCapture = () => {
    // stop the stream
    this.resetVideo()
    // clear image in canvas
    const canvasNode = this.canvasRef.current
    const context = canvasNode.getContext('2d')
    context.clearRect(0, 0, canvasNode.width, canvasNode.height)
    // reset state
    this.setState({
      image: null,
      submitBtnDisabled: true,
      isRecording: false,
      selfieCaptured: false,
      timerRunning: false,
    })
  }
  resetVideo = () => {
    console.log("Reset video")
    if (this.stream) {
      // stop all tracks in stream
      const tracks = this.stream.getTracks()
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop()
        console.log("Stopped track", i)
      }
    }
    this.stream = null
    // kill the stuff in the video frame
    const videoNode = this.videoRef.current
    // videoNode.stop()
    // videoNode.src = null
    // videoNode.srcObject = null
    videoNode.removeAttribute('src')
    videoNode.removeAttribute('srcObject')
    // videoNode.controls = false
    // videoNode.load()
  }
  componentWillReceiveProps(nextProps) {
    // (re-)activate the recording when artwork changes
    console.info("componentWillReceiveProps", "new:", nextProps.artworkID, "old:", this.state.artworkID)
    // !this.state.image || 
    if (nextProps.artworkID !== this.state.artworkID) {
      this.setState({artworkID: nextProps.artworkID})
      // this.activateWebStream()
    }
  }
  render() {
    const { submitBtnDisabled, errorMsg, image, isRecording, selfieCaptured, timerRunning } = this.state
    const { feedback, updateNavCenterMsg } = this.props
    return (
      <Block id="webcam-video">

        <h2>{feedback.instructions}</h2>

        <div style={{display: errorMsg ? 'block' : 'none'}} id="errorMsg">{errorMsg}</div>

        <div style={{position: 'relative', display: timerRunning ? 'block' : 'none'}}>
            {
              timerRunning &&
                <Timer
                  action={this.capture}
                  isRunning={timerRunning}
                />
            }
            <video  id="video"  ref={this.videoRef}  style={styles.video} autoPlay={'autoplay'} playsInline></video>
        </div>
        <div style={{display: selfieCaptured ? 'block' : 'none'}}>
            <canvas id="canvas" ref={this.canvasRef} style={styles.img}></canvas>
        </div>

        <Row>
          <Col width="20"></Col>
          <Col width="60">
            {
              !timerRunning && !image &&
              <CaptureButton
                buttonText="Take Picture"
                icon="camera_round"
                onCaptureClick={this.startTimer}
              />
            }
            {
              selfieCaptured &&
              <CaptureButton
                buttonText="Reset Picture"
                icon="delete_round"
                onCaptureClick={this.onResetButtonClick}
              />
            }
          </Col>
          <Col width="20"></Col>
        </Row>

        <Row>
          <Col width="20"></Col>
          <Col width="60">
            <Button
              fill big
              disabled={submitBtnDisabled}
              onClick={this.submit}
            >
              Submit
            </Button>
          </Col>
          <Col width="20"></Col>
        </Row>
        <div>Clicking this button will submit your image to the artist</div>

      </Block>
    ) 
  }
}
