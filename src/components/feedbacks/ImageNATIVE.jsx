import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'
import { Device } from 'framework7'
import CaptureButton from '../CaptureButton'


const styles = {
  video: {
    width:'480px',
    height:'360px',
    // width:  '100%    !important',
    // height: 'auto   !important',
    border: '1px solid #000000',
    marginRight: '10px',
    backgroundColor: '#303030',
  },
  img: {
    width:'480px',
    height:'320px',
    // width:  '100%    !important',
    // height: 'auto   !important',
    border: '1px solid #000000',
    marginLeft: '10px',
    backgroundColor: '#303030',
  },
  mobileImg: {
    margin: '1em',
    maxWidth: '100px',
    height: 'auto',
    align: 'center',
  },
  center: {
    textAlign: 'center',
  },
}


export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      submitBtnDisabled: true,
      errorMsg: null,
      image: null,
    }
    // ---
    this.videoRef  = React.createRef()
    this.canvasRef = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.onCaptureClick = this.onCaptureClick.bind(this)
    this.resetCapture = this.resetCapture.bind(this)
    // for mobile
    this.getPicture = this.getPicture.bind(this)
      this.nativeCameraSuccess = this.nativeCameraSuccess.bind(this)
      this.nativeCameraError = this.nativeCameraError.bind(this)
    // for web
    this.activateWebStream = this.activateWebStream.bind(this)
      this.handleStreamSuccess = this.handleStreamSuccess.bind(this)
      this.handleStreamError = this.handleStreamError.bind(this)
  }
  submit() {
    console.log("submitting feedback")
    const { send, artworkID } = this.props
    const { image } = this.state
    const feedback = {
      type: 'image',
      id: artworkID,
      // imageURL: image, 
      payload: image,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetCapture()
    }
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
      this.handleStreamSuccess
    ).catch(
      this.handleStreamError
    )
  }
    handleStreamSuccess(stream) {
      window.stream = stream // make stream available to browser console
      const videoNode = this.videoRef.current
      videoNode.srcObject = stream
      // or ?
      // videoNode.src = URL.createObjectURL(stream)
    }
    handleStreamError(error) {
      console.error('navigator.getUserMedia error [%s]: ', error.code, error.name, error.message)
      let name = error.name
      if (error.name == 'NotSupportedError') {
        name = 'Browser Not Supported'
      }
      this.setState({errorMsg: name + ': ' + error.message})
    }
  getPicture() {
    // alert('native capture');
    // console.log(navigator.device.capture);
    // console.log('navigator.camera', navigator.camera);
    const cameraOptions = {
      quality: 95,
      allowEdit: true,
      encodingType: navigator.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: navigator.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true, // stores all images in local photoalbum
      // ANDROID IGNORES THE CAMERA DIRECTION PARAMETER - YIKES.
      cameraDirection: navigator.camera.Direction.FRONT, // navigator.camera.Direction.FRONT, // use front camera
      destinationType: navigator.camera.DestinationType.FILE_URI, // DATA_URL 
    }
    navigator.camera.getPicture(this.nativeCameraSuccess, this.nativeCameraError, cameraOptions)
  }
    nativeCameraSuccess(imageURL) {
      console.log(imageURL)
      // "data:" + "image/jpeg;base64," + imageData
      this.setState({
        submitBtnDisabled: false,
        image: imageURL,
      })
    }
    nativeCameraError(message) {
      console.error('Failed: ' + message)
      this.setState({submitBtnDisabled: true})
    }
  onCaptureClick() {
    // on Desktop, use the WebRTC stream
    if (Device.desktop) {

      // on desktop, use webrtc
      const videoNode = this.videoRef.current
      const canvasNode = this.canvasRef.current
      canvasNode.width = videoNode.videoWidth
      canvasNode.height = videoNode.videoHeight
      canvasNode.getContext('2d').drawImage(videoNode, 0, 0, canvasNode.width, canvasNode.height)

      const theCanvas = this.canvasRef.current
      const selfie = theCanvas.toDataURL("image/jpeg")

      // store the image and
      // enable the submit button
      this.setState({
        image: selfie,
        submitBtnDisabled: false,
      })

    } else {

      // on mobile, use native capture
      this.getPicture()

    }
  }
  resetCapture() {
    if (Device.desktop) {
      const canvasNode = this.canvasRef.current
      const context = canvasNode.getContext('2d')
      context.clearRect(0, 0, canvasNode.width, canvasNode.height)
    }
    this.setState({
      image: null,
      submitBtnDisabled: true,
    })
  }
  componentDidMount() {
    console.log('Device', Device)
    if (Device.desktop) {
      // on Desktop, start streaming video
      this.activateWebStream()
    }
  }
  render() {
    const { submitBtnDisabled, errorMsg, image } = this.state
    return (
      <Block id="webcam-video">

        <p>Send a selfie to the artist!</p>

        {
          Device.desktop &&
          <Block>
              <video  id="video"  ref={this.videoRef}  style={styles.video} autoPlay={'autoplay'} playsInline={true}></video>
              <canvas id="canvas" ref={this.canvasRef} style={styles.img}></canvas>
          </Block>
        }

        {
          !Device.desktop && image &&
          <div style={styles.center}>
            <img src={image} style={styles.mobileImg} alt="" />
          </div>
        }

        <div style={{display: errorMsg ? 'block' : 'none'}} id="errorMsg">{errorMsg}</div>

        <CaptureButton
          buttonText="Take Picture"
          icon="camera_round"
          onCaptureClick={this.onCaptureClick}
        />

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
