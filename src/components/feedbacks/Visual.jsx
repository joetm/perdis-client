import React from 'react'
import { Block, Row, Col, Fab, Button, Icon, BlockTitle } from 'framework7-react'

// ------------------------
// Based on:
// https://zipso.net/a-simple-touchscreen-sketchpad-using-javascript-and-html5/
// ------------------------

const styles = {
  canvas: {
    border: '1px solid #000000',
    margin: 0,
    padding:0,
  },
  sketchpadapp: {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },
  sketchpad: {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',

    border:'2px solid #888',
    borderRadius:'4px',
    position:'relative', /* Necessary for correct mouse co-ords in Firefox */
  },
}

const canvasBaseLength = 500;


export default class VisualComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.canvasRef = React.createRef()
    // ---
    this.state = {
      touchStack: [],
      artworkSrc: null,
    }
    // ---
    this.ctx = null
    this.canvas = null
    // Variables to keep track of the mouse position and left-button status 
    this.mouseX
    this.mouseY
    this.mouseDown = 0
    // Variables to keep track of the touch position
    this.touchX
    this.touchY
    // ---
    this.submit = this.submit.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.sketchpad_mouseDown = this.sketchpad_mouseDown.bind(this)
    this.sketchpad_mouseUp = this.sketchpad_mouseUp.bind(this)
    this.sketchpad_mouseMove = this.sketchpad_mouseMove.bind(this)
    this.drawDot = this.drawDot.bind(this)
    this.getMousePos = this.getMousePos.bind(this)
    this.sketchpad_touchStart = this.sketchpad_touchStart.bind(this)
    this.sketchpad_touchMove = this.sketchpad_touchMove.bind(this)
    this.getTouchPos = this.getTouchPos.bind(this)
    this.init = this.init.bind(this)
    this.loadImage = this.loadImage.bind(this)
  }
  submit() {
    const { send, artworkID } = this.props
    const { touchStack } = this.state
    const feedback = {
      type: 'image',
      id: artworkID,
      payload: touchStack,
    }
    const ret = send(feedback)
    if (ret) {
      this.clearCanvas()
    }
  }
  // Clear the canvas context using the canvas width and height
  clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // clear the touch stack
      this.setState({touchStack: [], artworkSrc: null})
      // load the image into the canvas
      this.loadImage()
  }
  // Draws a dot at a specific position on the supplied canvas name
  // Parameters are: A canvas context, the x position, the y position, the size of the dot
  drawDot(x,y) {
      const size = 12
      // yellow
      const a = 255
      // Select a fill style
      this.ctx.fillStyle = "rgba(255,255,0,"+(a/255)+")"
      // Draw a filled circle
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, Math.PI*2, true)
      this.ctx.closePath()
      this.ctx.fill()
  } 
  // Keep track of the mouse button being pressed and draw a dot at current location
  // This is also triggered for single touches
  sketchpad_mouseDown() {
    const { touchStack } = this.state
    this.mouseDown = 1
    this.drawDot(this.mouseX,this.mouseY)
    touchStack.push([this.mouseX,this.mouseY])
    this.setState({touchStack})
  }
  // Keep track of the mouse button being released
  sketchpad_mouseUp() {
      this.mouseDown = 0
  }
  // Keep track of the mouse position and draw a dot if mouse button is currently pressed
  sketchpad_mouseMove(e) {
    const { touchStack } = this.state
    // Update the mouse co-ordinates when moved
    this.getMousePos(e);
    // Draw a dot if the mouse button is currently being pressed
    if (this.mouseDown == 1) {
        this.drawDot(this.mouseX,this.mouseY)
        touchStack.push([this.mouseX,this.mouseY])
        this.setState({touchStack})
    }
  }
  // Get the current mouse position relative to the top-left of the canvas
  getMousePos(e) {
    if (!e) {
        let e = event
    }
    if (e.offsetX) {
        this.mouseX = e.offsetX
        this.mouseY = e.offsetY
    }
    else if (e.layerX) {
        this.mouseX = e.layerX
        this.mouseY = e.layerY
    }
  }
  // Draw something when a touch start is detected
  sketchpad_touchStart(e) {
    const { touchStack } = this.state
    // Update the touch co-ordinates
    this.getTouchPos(e)
    this.drawDot(this.touchX, this.touchY)
    // store touch
    touchStack.push([this.touchX, this.touchY])
    this.setState({touchStack})
    // Prevents an additional mousedown event being triggered
    e.preventDefault()
  }
  // Draw something and prevent the default scrolling when touch movement is detected
  sketchpad_touchMove(e) { 
    const { touchStack } = this.state
    // Update the touch co-ordinates
    this.getTouchPos(e)
    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawDot(this.touchX, this.touchY)
    // store touch
    touchStack.push([this.touchX, this.touchY])
    this.setState({touchStack})
    // Prevent a scrolling action as a result of this touchmove triggering.
    e.preventDefault()
  }
  // Get the touch position relative to the top-left of the canvas
  // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
  // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
  // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
  getTouchPos(e) {
      if(e.touches) {
          if (e.touches.length == 1) { // Only deal with one finger
              var touch = e.touches[0] // Get the information for finger #1
              const offsets = this.canvasRef.current.getBoundingClientRect()
              // this.touchX = touch.pageX - touch.target.offsetLeft
              // this.touchY = touch.pageY - touch.target.offsetTop
              this.touchX = touch.pageX - offsets.left
              this.touchY = touch.pageY - offsets.top
          }
      }
  }
  loadImage() {
    console.log('loadImage')
    const { artwork, aspectRatio } = this.props
    const imageObj = new Image()
    imageObj.onload = function() {
      console.info('imageObj.onload')
      this.ctx.drawImage(imageObj, 0, 0, this.canvas.width, this.canvas.height)
    }.bind(this)
    imageObj.src = artwork.src
  }
  // componentWillReceiveProps(nextProps) {
  //   console.info("componentWillReceiveProps", "new:", nextProps.artwork.src, "old:", this.state.artworkSrc)
  //   if (nextProps.artwork.src !== this.state.artworkSrc) {
  //     this.setState({artworkSrc: nextProps.artwork.src})
  //     this.loadImage()
  //   }
  // }
  // Set-up the canvas and add our event handlers after the page has loaded
  init() {
      // Get the specific canvas element from the HTML document
      this.canvas = this.canvasRef.current
      // If the browser supports the canvas tag, get the 2d drawing context for this canvas
      if (this.canvas.getContext) {
          this.ctx = this.canvas.getContext('2d')
      }
      // Check that we have a valid context to draw on/with before adding event handlers
      if (this.ctx) {
        this.clearCanvas()
        // React to mouse events on the canvas, and mouseup on the entire document
        this.canvas.addEventListener('mousedown', this.sketchpad_mouseDown, false)
        this.canvas.addEventListener('mousemove', this.sketchpad_mouseMove, false)
        window.addEventListener('mouseup', this.sketchpad_mouseUp, false)
        // React to touch events on the canvas
        this.canvas.addEventListener('touchstart', this.sketchpad_touchStart, false)
        this.canvas.addEventListener('touchmove', this.sketchpad_touchMove, false)
      }
  }
  componentDidMount() {
    this.init()
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.touchStack.length) {
      this.loadImage()
    }
  }
  componentWillUnmount() {
      // reset canvas
      this.ctx = null
      this.canvas = null
      this.mouseX = null
      this.mouseY = null
      this.mouseDown = 0
      this.touchX = null
      this.touchY = null
  }
  render() {
    console.log('renderVISUAL')

    const { touchStack = [], imgSrc } = this.state
    const { artwork, feedback, aspectRatio } = this.props
    const canvasHeight = canvasBaseLength / aspectRatio

    return (
      <Block id="touch">

        <BlockTitle>{feedback.instructions}</BlockTitle>

        <Block style={styles.sketchpadapp}>
          <canvas
            width={canvasBaseLength}
            height={canvasHeight}
            style={styles.sketchpad}
            ref={this.canvasRef}
          ></canvas>
        </Block>

        <Block>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button
                outline big
                onClick={this.clearCanvas}
                disabled={touchStack.length === 0}
              >
              <Icon md="f7:undo" style={{paddingRight: '0.5em'}} /> Undo</Button>
            </Col>
            <Col width="33"></Col>
          </Row>
        </Block>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button
              fill big
              disabled={touchStack.length === 0}
              onClick={this.submit}
            >
              Submit
            </Button>
          </Col>
          <Col width="33"></Col>
        </Row>
        <div>Clicking this button will submit your feedback to the artist</div>

      </Block>
    ) 
  }
}
