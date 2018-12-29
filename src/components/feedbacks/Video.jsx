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
      video: null,
    }
    // ---
    // this.videoRef    = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.resetVideo = this.resetVideo.bind(this)
    this.startRecording = this.startRecording.bind(this)
    this.captureSuccess = this.captureSuccess.bind(this)
    this.captureError = this.captureError.bind(this)
    // this.state.buttonAction = this.state.buttonAction.bind(this)
  }
  submit() {
    const { send, artworkID } = this.props
    const { video } = this.state
    const feedback = {
      type: 'video',
      id: artworkID,
      payload: video,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetVideo()
    }
  }
  resetVideo () {
    this.setState({
      video: null,
      submitBtnDisabled: true,
    })
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
      // end:0
      // fullPath:"file:///storage/emulated/0/DCIM/Camera/VID_20181229_130634.mp4"
      // lastModified:null
      // lastModifiedDate:1546106798000
      // localURL:"cdvfile://localhost/sdcard/DCIM/Camera/VID_20181229_130634.mp4"
      // name:"VID_20181229_130634.mp4"
      // size:39525
      // start:0
      // type:"video/mp4"
      this.setState({
        video: mediaFiles[0],
        submitBtnDisabled: false,
      });
    }
    captureError () {
      //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      alert('Capture Error. Error code: ' + error.code);
    }
  render() {
    if (Device.desktop) {
      return (<Block>Can't preview this feedback type in the browser.</Block>)
    }
    const { video } = this.state
    return (
      <Block id="webcam-video">

        <p>Send a selfie video to the artist!</p>

        {
          video && video.fullPath &&
          <Block>
            <video src={video.fullPath} id="video" style={styles.video} playsInline={true} autoPlay={true} muted={true}></video>
          </Block>
        }

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
