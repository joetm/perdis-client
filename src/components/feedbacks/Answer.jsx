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
    // ---
    this.resetInput = this.resetInput.bind(this)
    this.submit = this.submit.bind(this)
    this.enableSubmitBtn = this.enableSubmitBtn.bind(this)
  }
  submit() {
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
  resetInput () {
    this.setState({
      answer: '',
      submitBtnDisabled: true,
    })
  }
  enableSubmitBtn(e) {
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
    return (
      <Block>
        <h2>Answer this question from the artist:</h2>
        <p>
          What is 2 + 2? [TODO: PUT A WITTY QUESTION HERE]
        </p>
          <List noHairlines>
            <Input
              id="question"
              type="textarea"
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
                  fill
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
