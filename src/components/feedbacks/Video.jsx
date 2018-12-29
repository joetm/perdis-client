import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'
import CaptureButton from '../CaptureButton'


const styles = {
  video: {
    width:'240px',
    height:'180px',
    border: '1px solid #000000',
    backgroundColor: '#303030',
  },
}


const StartButtonTxt = function () { return <span><Icon fa="play"></Icon> Start Recording</span> }
const StopButtonTxt  = function () { return <span><Icon fa="stop"></Icon> Stop Recording</span> }


export default class VideoComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      buttonTxt: <StartButtonTxt />,
      submitBtnDisabled: true,
    }
    // ---
    this.videoRef    = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.enableSubmitBtn = this.enableSubmitBtn.bind(this)
    this.resetVideo = this.resetVideo.bind(this)
    this.startRecording = this.startRecording.bind(this)
    this.captureSuccess = this.captureSuccess.bind(this)
    this.captureError = this.captureError.bind(this)
    // this.state.buttonAction = this.state.buttonAction.bind(this)
  }
  submit() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'video',
      id: artworkID,
      payload: 'TODO',
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
  }
  startRecording() {
    const videoOptions = {
      limit: 1,
      duration: 60,
      quality: 1,
    }
    navigator.device.capture.captureVideo(
        this.captureSuccess, this.captureError, videoOptions
    )
  }
    captureSuccess (mediaFiles) {
      console.log(mediaFiles);
    }
    captureError () {
      //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      alert('Error code: ' + error.code, null, 'Capture Error');
    }
  render() {
    if (Device.desktop) {
      return (<Block>Can't preview this feedback in the browser.</Block>)
    }
    return (
      <Block id="webcam-video">

        <p>Send a selfie video to the artist!</p>

{/*
        <Block>
          <video id="video"    ref={this.videoRef}    style={styles.video}    playsInline={true} autoPlay={true} muted={true}></video>
        </Block>
*/}

        <div id="errorMsg"></div>

        <CaptureButton
          buttonText="Take Video"
          icon="camera_round"
          onCaptureClick={this.startRecording}
        />

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
