import React from 'react'
import { Block, Row, Col, Button, Icon, BlockTitle } from 'framework7-react'

const styles = {
  canvas: {
    border: '1px solid #000000',
    margin: 0,
    padding:0,
  },
}

// see http://perfectionkills.com/exploring-canvas-drawing-techniques/
function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

export default class VisualComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.canvasRef = React.createRef()
    // ---
    this.state = {
      touchStack: [],
    }
    // ---
    this.isDrawing = false
    this.lastPoint = null
    this.ctx = null
    // ---
    this.submit = this.submit.bind(this)
    this.resetCanvas = this.resetCanvas.bind(this)
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
      this.resetCanvas()
    }
  }
  resetCanvas() {
    // TODO



  }
  componentDidMount() {
    const { artwork } = this.props

    const el = this.canvasRef.current
    this.ctx = el.getContext('2d')
    this.ctx.lineJoin = this.ctx.lineCap = 'round'

    const imageObj = new Image()
    imageObj.onload = function() {
      this.ctx.drawImage(imageObj, 0, 0)
    }.bind(this)
    imageObj.src = artwork.src

    el.onmousedown = function(e) {
      this.isDrawing = true
      this.lastPoint = { x: e.clientX, y: e.clientY }
    }.bind(this)

    el.onmousemove = function(e) {
      if (!this.isDrawing) { return }
      
      const currentPoint = { x: e.clientX, y: e.clientY }
      const dist = distanceBetween(this.lastPoint, currentPoint)
      const angle = angleBetween(this.lastPoint, currentPoint)
      
      for (let i = 0; i < dist; i += 5) {

        const x = this.lastPoint.x + (Math.sin(angle) * i)
        const y = this.lastPoint.y + (Math.cos(angle) * i)

        const radgrad = this.ctx.createRadialGradient(x, y, 10, x, y, 20)
        radgrad.addColorStop(0, '#FFFF00')
        radgrad.addColorStop(0.5, 'rgba(255,255,0,0.5)')
        radgrad.addColorStop(1, 'rgba(255,255,0,0)')
        
        this.ctx.fillStyle = radgrad
        this.ctx.fillRect(x - 20, y - 20, 40, 40)
      }
      this.lastPoint = currentPoint
    }.bind(this)

    el.onmouseup = function() {
      this.isDrawing = false
    }.bind(this)

  }
  componentWillUnmount() {
      this.isDrawing = false
      this.lastPoint = null
      this.ctx = null
  }
  render() {
    const { touchStack, imgSrc } = this.state
    const { artwork, feedback } = this.props
    return (
      <Block id="touch">

        <BlockTitle>{feedback.instructions}</BlockTitle>

        <Block>
            {/*
            <img src={artwork.src} id="canvas" ref={this.canvasRef} style={styles.canvas} />
            */}
            <canvas
              id="c"
              width="1200"
              height="1200"
              ref={this.canvasRef}
            ></canvas>
        </Block>

        <Block style={{display: touchStack.length ? 'block' : 'none'}}>
          <Button id="undoMsg" outline big>Undo</Button>
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
            <div>
              Clicking this button will submit your feedback to the artist
            </div>
          </Col>
          <Col width="33"></Col>
        </Row>

      </Block>
    ) 
  }
}
