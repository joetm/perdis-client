import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'

const styles = {
  video: {
    width:'240px',
    height:'160px',
    // width:  '100%    !important',
    // height: 'auto   !important',
    border: '1px solid #000000',
    marginRight: '10px',
    backgroundColor: '#303030',
  },
  img: {
    width:'240px',
    height:'160px',
    // width:  '100%    !important',
    // height: 'auto   !important',
    border: '1px solid #000000',
    marginLeft: '10px',
    backgroundColor: '#303030',
  },
}


export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.videoRef  = React.createRef()
    this.canvasRef = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleError = this.handleError.bind(this)
    this.activateWebStream = this.activateWebStream.bind(this)
    this.capture = this.capture.bind(this)
    this.resetCapture = this.resetCapture.bind(this)
    // this.drawText = this.drawText.bind(this)
    this.getPicture = this.getPicture.bind(this)
      this.cameraSuccess = this.cameraSuccess.bind(this)
      this.cameraError = this.cameraError.bind(this)
    // ---
    this.state = {
      submitBtnDisabled: true,
      errorMsg: null,
    }
  }
  submit() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'image',
      id: artworkID,
    }
    const theCanvas = this.canvasRef.current
    const selfie = theCanvas.toDataURL("image/jpeg")
    feedback.payload = selfie
    const ret = send(feedback)
    if (ret) {
      this.resetCapture()
    }
  }
  handleSuccess(stream) {
    window.stream = stream // make stream available to browser console
    const videoNode = this.videoRef.current
    videoNode.srcObject = stream
    // or ?
    // videoNode.src = URL.createObjectURL(stream)
  }
  handleError(error) {
    console.error('navigator.getUserMedia error [%s]: ', error.code, error.name, error.message)
    let name = error.name
    if (error.name == 'NotSupportedError') {
      name = 'Browser Not Supported'
    }
    this.setState({errorMsg: name + ': ' + error.message})
  }
  activateWebStream() {
    console.log('activateWebStream')
    const videoNode = this.videoRef.current
    const canvasNode = window.canvas = this.canvasRef.current
    // canvasNode.width = 480;
    // canvasNode.height = 320;
    const constraints = {
      audio: false,
      video: true
    }
    navigator.mediaDevices.getUserMedia(constraints).then(
      this.handleSuccess
    ).catch(
      this.handleError
    )
  }
  getPicture() {
    alert('native capture');
    const cameraOptions = {
      quality: 95,
      allowEdit: true,
      destinationType: navigator.camera.DestinationType.DATA_URL
    }
    navigator.camera.getPicture(this.cameraSuccess, this.cameraError)
  }
    cameraSuccess(imageData) {
      console.log(imageData)
      // "data:" + "image/jpeg;base64," + imageData
    }
    cameraError(message) {
      alert('Failed because: ' + message)
    }
  capture() {
    // on Desktop, use the WebRTC stream
    if (Device.desktop) {
      const videoNode = this.videoRef.current
      const canvasNode = this.canvasRef.current
      canvasNode.width = videoNode.videoWidth
      canvasNode.height = videoNode.videoHeight
      canvasNode.getContext('2d').drawImage(videoNode, 0, 0, canvasNode.width, canvasNode.height)
      // enable the submit button
      this.setState({submitBtnDisabled: false})
    } else {
      // on mobile, use native capture
      this.getPicture()
    }
  }
  // drawText() {
  //     const videoNode = this.videoRef.current
  //     const canvasNode = this.canvasRef.current
  //     const context = canvasNode.getContext('2d')
  //     canvasNode.width = videoNode.width
  //     canvasNode.height = videoNode.height
  //     context.font = "50px Arial";
  //     context.fillStyle = "white";
  //     context.textAlign = "center";
  //     context.fillText("Click the Capture Button", canvasNode.width/2, canvasNode.height/2);
  // }
  resetCapture() {
    if (Device.desktop) {
      const canvasNode = this.canvasRef.current
      const context = canvasNode.getContext('2d')
      context.clearRect(0, 0, canvasNode.width, canvasNode.height)
      // this.drawText()
      this.setState({submitBtnDisabled: true})
    } else {
      alert('TODO: reset')
    }
  }
  componentDidMount() {
    // this.drawText()
    console.log('Device', Device)
    if (Device.desktop) {
      this.activateWebStream()
    } else {
      alert('TODO: acquireImage on mobile')
      // this.getPicture()
    }
  }
  render() {
    const { submitBtnDisabled, errorMsg } = this.state
    return (
      <Block id="webcam-video">

        <p>Send a selfie to the artist!</p>

        <Block>
            <video  id="video"  ref={this.videoRef}  style={styles.video} autoPlay={'autoplay'} playsInline={true}></video>
            <canvas id="canvas" ref={this.canvasRef} style={styles.img}></canvas>
        </Block>

        <div style={{display: errorMsg ? 'block' : 'none'}} id="errorMsg">{errorMsg}</div>

        <Block>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button onClick={this.capture} outline>
                <Icon f7="camera_round" / > Capture
              </Button>
            </Col>
            <Col width="33"></Col>
          </Row>
        </Block>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button
              fill
              disabled={submitBtnDisabled}
              onClick={this.submit}
            >
              Submit
            </Button>
            <div>
              Clicking this button will submit your image to the artist
            </div>
          </Col>
          <Col width="33"></Col>
        </Row>

      </Block>
    ) 
  }
}
