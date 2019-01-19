import React from 'react'
import { Block, List, ListInput, Input, Row, Col, Button } from 'framework7-react'


export default class AnswerComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      submitBtnDisabled: true,
      answer: '',
    }
  }
  submit = () => {
    const { send, artworkID } = this.props // 'send' function from props
    const { answer } = this.state
    const feedback = {
      type: 'answer',
      payload: answer,
      id: artworkID,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetInput()
    }
  }
  resetInput = () => {
    this.setState({
      answer: '',
      submitBtnDisabled: true,
    })
  }
  enableSubmitBtn = (e) => {
    console.log('e.target.value', e.target.value)
    if (!e.target.value) {
      this.setState({
        submitBtnDisabled: true,
        answer: '',
      })
    } else {
      this.setState({
        submitBtnDisabled: false,
        answer: e.target.value,
      })
    }
  }
  render () {
    const { answer, submitBtnDisabled } = this.state
    const { feedback } = this.props
    console.log('feedback.inputtype', feedback.inputtype)
    return (
      <Block>
        <h2>{feedback.instructions}</h2>
        <p>
          {feedback.content}
        </p>
        <List noHairlines>
          <Input
            id="question"
            type={feedback.inputtype}
            clearButton
            placeholder="Enter your answer here"
            onChange={this.enableSubmitBtn}
            onInputClear={this.resetInput}
            value={answer}
          />
        </List>
        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button
              fill big
              disabled={submitBtnDisabled}
              onClick={this.submit}
            >
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
