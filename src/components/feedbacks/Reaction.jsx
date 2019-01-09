import React from 'react'
import { Block, Row, Col, Button, Preloader } from 'framework7-react'
import { Device } from 'framework7'
import { getMediaRecorderOptions } from './videohelpers'

const styles = {
  video: {
    maxWidth: '100%',
    border: '1px solid #000000',
    marginLeft: '10px',
    backgroundColor: '#303030',
  }
}

const TIMEOUT = 3000; // 10000;

const hasEchoCancellation = true
const cameraOptions = {
  audio: false, // { echoCancellation: {exact: hasEchoCancellation} },
  video: {
    facingMode: "user", // front camera
    width:  1280,
    height: 720,
  }
}



/* globals MediaRecorder */

export default class ReactionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.recordedBlobs = []
    this.mediaSource = new MediaSource()
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false)
    this.mediaRecorder
    this.sourceBuffer
    this.stream
    // ---
    this.state = {
      submitBtnDisabled: true,
      videoVisible: false,
      artworkID: props.artworkID,
    }
    // ---
    this.recordedRef = React.createRef()
    // ---
    this.submit = this.submit.bind(this)
    this.skip = this.skip.bind(this)
    // ---
    this.activateStream = this.activateStream.bind(this)
      this.handleStreamSuccess = this.handleStreamSuccess.bind(this)
      this.handleStreamError = this.handleStreamError.bind(this)
    this.resetVideo = this.resetVideo.bind(this)
    this.playBack = this.playBack.bind(this)
    this.stop = this.stop.bind(this)
    this.startTimer = this.startTimer.bind(this)
    // ---
    this.startBuffer = this.startBuffer.bind(this)
    this.handleDataAvailable = this.handleDataAvailable.bind(this)
    this.handleSourceOpen = this.handleSourceOpen.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    // (re-)activate the recording when artwork changes
    console.info("componentWillReceiveProps", "new:", nextProps.artworkID, "old:", this.state.artworkID)
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

    // alternative: just store some metadata
    // feedback.payload = JSON.stringify(this.stream)

    const options = getMediaRecorderOptions();
    const blob = new Blob(this.recordedBlobs, options)
    feedback.payload = blob

    const ret = send(feedback)
    if (ret) {
      // unload video and stream
      this.resetVideo()
      this.setState({artworkID: false})
    }
  }
  skip() {
    const { send, artworkID } = this.props
    const feedback = {
      type: 'reaction',
      id: artworkID,
    }
    feedback.payload = "skip"
    const ret = send(feedback)
    if (ret) {
      // unload video and stream
      this.resetVideo()
      this.setState({artworkID: false})
    }
  }
  startTimer() {
    setTimeout(() => {
      // stop recording
      console.log('this.mediaRecorder', this.mediaRecorder)
      this.mediaRecorder.stop()
      // console.log('this.stream', this.stream)
      const tracks = this.stream.getTracks()
      // console.log('tracks', tracks)
      // stop all tracks
      for (let t = 0; t < tracks.length; t++) {
        tracks[t].stop()
      }
      // update UI
      this.setState({
        videoVisible: true,
        submitBtnDisabled: false,
      })
      // play the video
      this.playBack()
    }, TIMEOUT)
  }
  handleSourceOpen(event) {
    console.log('MediaSource opened')
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
    console.log('Source buffer: ', this.sourceBuffer)
  }
  resetVideo() {
    this.stream = null;
    this.recordedBlobs = []
    this.sourceBuffer = null
    // this.mediaRecorder = null
    const recordedNode = this.recordedRef.current
    recordedNode.srcObject = null
    recordedNode.src = null
    recordedNode.removeAttribute("srcObject")
    recordedNode.removeAttribute("src")
    recordedNode.load()
    recordedNode.controls = false
    this.setState({
      videoVisible: false,
    })
  }
  activateStream() {
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    navigator.mediaDevices.getUserMedia(cameraOptions).then(
      this.handleStreamSuccess
    ).catch(
      this.handleStreamError
    )
  }
    handleStreamSuccess(stream) {
      console.log('getUserMedia() got stream:', stream)
      this.stream = stream // make stream available so that it can be stopped later
      this.startBuffer() // start recording the stream and filling the buffer
      this.startTimer() // next things will happen after a timeout
    }
    handleStreamError(error) {
      console.error('navigator.getUserMedia error: ', error)
      console.log(error.code, error.name, error.message)
    }
    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data)
      }
    }
  startBuffer() {
    const recordedNode = this.recordedRef.current
    const options = getMediaRecorderOptions();
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options)
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e)
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
  }
  playBack() {
    const recordedNode = this.recordedRef.current
    const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'})
    console.log('this.stream', this.stream)
    recordedNode.src = null
    recordedNode.srcObject = null

    // recordedNode.src = window.URL.createObjectURL(superBuffer)
    // recordedNode.play()

    // fallback: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject#Supporting_fallback_to_the_src_property
    // try {
    //   recordedNode.srcObject = this.stream
    // } catch (error) {
    //   recordedNode.src = window.URL.createObjectURL(this.stream)
    // }
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
      recordedNode.play()
    }

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

        <Block style={{display: videoVisible ? 'block' : 'none'}}>
          <video
            style={styles.video}
            id="recorded"
            ref={this.recordedRef}
            muted={true}
            loop={true}
            autoplay={true}
          ></video>
        </Block>

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
              <Button fill onClick={this.skip}>Skip</Button>
            </Col>
            <Col width="20"></Col>
          </Row>
          <div>Clicking the submit button will submit your video to the artist</div>
        </Block>

      </Block>
    ) 
  }
}
