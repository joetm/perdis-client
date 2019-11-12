import React from 'react'
import { Block, BlockTitle, Row, Col, Button, Range } from 'framework7-react'


const styles = {
  leftDescr: {
    textAlign: 'right',
  },
  rightDescr: {
    textAlign: 'left',
  },
}

const LIKERT = {
  min: 1,
  max: 5,
  step: 1,
}
LIKERT.initial = (LIKERT.max - LIKERT.min) / 2 + 1;


export default class LikertComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      sliderValue: LIKERT.initial,
    }
  }
  submit = () => {
    const { send, artworkID } = this.props // 'send' function from props
    const { sliderValue } = this.state
    const feedback = {
      type: 'likert',
      payload: sliderValue,
      id: artworkID,
    }
    const ret = send(feedback)
    if (ret) {
      this.setState({sliderValue: LIKERT.initial})
    }
  }
  handleSliderChange = (value) => {
    console.log("Slider changed to %s", value);
    this.setState({sliderValue: value});
  }
  render () {
    const { feedback } = this.props
    const { selectedOption, sliderValue } = this.state
    return (
      <Block>
        {
          feedback.instructions && <h2>{feedback.instructions}</h2>
        }
        {
          feedback.content && <p>{feedback.content}</p>
        }

        <BlockTitle>Choose your answer</BlockTitle>

        <Block>
          <Row>
          <Col style={styles.leftDescr} width="15">Strongly Disagree ({LIKERT.min})</Col>
          <Col width="70">
            <Range
              label
              draggableBar
              onRangeChanged={this.handleSliderChange}
              min={LIKERT.min}
              max={LIKERT.max}
              step={LIKERT.step}
              value={sliderValue}
            />
          </Col>
          <Col style={styles.rightDescr} width="15">Strongly Agree ({LIKERT.max})</Col>
          </Row>
        </Block>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button fill big onClick={this.submit}>
              Submit
            </Button>
          </Col>
          <Col width="33"></Col>
        </Row>
        <div>Clicking this button will submit your answer to the artist</div>

      </Block>
    )
  }
}
