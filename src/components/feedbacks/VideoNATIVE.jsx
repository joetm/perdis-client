import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'
import CaptureButton from '../CaptureButton'


const styles = {
  video: {
    border: '1px solid #000000',
    backgroundColor: '#303030',
  },
}


const StartButtonTxt = function () { return <span><Icon fa="video"></Icon> Record video</span> }
const ReStartButtonTxt  = function () { return <span><Icon fa="video"></Icon> Record different video</span> }


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
      buttonTxt: <StartButtonTxt />,
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
      if (mediaFiles.length === 1) {
        this.setState({
          video: mediaFiles[0],
          submitBtnDisabled: false,
          buttonTxt: <ReStartButtonTxt />,
        })
      }
    }
    captureError (error) {
      //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      alert('Capture Error. Error code: ' + error.code);
    }
  render() {
    if (Device.desktop) {
      return (<Block>Can't preview this feedback type in the browser.</Block>)
    }
    const { video, buttonTxt } = this.state
    return (
      <Block id="webcam-video">

        <p>Send a selfie video to the artist!</p>

        {
          video && video.fullPath &&
            <Block>
              <video
                id="video"
                style={styles.video}
                controls="controls"
                playsInline="playsInline"
                autoPlay="autoPlay"
                muted="muted"
              >
                <source src={video.fullPath} type={video.type} />
              </video>
            </Block>
        }

        <div id="errorMsg"></div>

        <CaptureButton
          buttonText={buttonTxt}
          icon="video"
          onCaptureClick={this.startRecording}
        />

{/*
        <Row>
          <Col width="10"></Col>
          <Col width="80">
*/}
            <Button fill big
              onClick={this.submit}
              disabled={this.state.submitBtnDisabled}
            >
              Submit
            </Button>
{/*
          </Col>
          <Col width="10"></Col>
        </Row>
*/}
        <div>Clicking this button will submit your video to the artist</div>

      </Block>
    ) 
  }
}
