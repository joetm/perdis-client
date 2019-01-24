import React from 'react'
import { Block, List, ListInput, Input, Row, Col, Button } from 'framework7-react'


export default class QuestionComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      submitBtnDisabled: true,
      question: '',
    }
  }
  submit = () => {
    const { send, artworkID } = this.props // 'send' function from props
    const { question } = this.state
    const feedback = {
      type: 'question',
      payload: question,
      id: artworkID,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetInput()
    }
  }
  resetInput = () => {
    this.setState({
      question: '',
      submitBtnDisabled: true,
    })
  }
  enableSubmitBtn = (e) => {
    const question = e.target.value
    if (!question) {
      this.setState({
        submitBtnDisabled: true,
        question: '',
      })
    } else {
      this.setState({
        submitBtnDisabled: false,
        question: question,
      })
    }
  }
  render () {
    const { question, submitBtnDisabled } = this.state
    const { feedback } = this.props
    return (
      <Block>
          <h2>{feedback.instructions}</h2>
          <List noHairlines>
          <Input
            id="question"
            type="text"
            onChange={this.enableSubmitBtn}
            onInputClear={this.resetInput}
            placeholder="Enter your question here"
            clearButton
            value={question}
          />
{/*
  BROKEN FRAMEWORK7 COMPONENT
            <ListInput
              id="question"
              type="text"
              onChange={this.enableSubmitBtn}
              onInputClear={this.resetInput}
              placeholder="Enter your question here"
              clearButton
              value={question}
            />
*/}
          </List>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button fill big
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
