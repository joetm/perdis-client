import React from 'react'
import { Block, Row, Col, Button } from 'framework7-react'


export default class ConsentComponent extends React.PureComponent {
  submit = () => {
    const { send } = this.props // 'send' function from props
    const feedback = {
      type: 'stage2',
      payload: {},
    }
    send(feedback)
  }
  cancel = () => {
    const { send } = this.props // 'send' function from props
    const feedback = {
      type: 'next',
      payload: {},
    }
    send(feedback)
  }
  render () {
    const { feedback } = this.props
    return (
      <Block>
        <h2>{feedback.instructions}</h2>
        <p>{feedback.content}</p>
        <Row>
          <Col width="20"></Col>
          <Col width="30">
            <Button outline big onClick={this.cancel}>
              Cancel
            </Button>
          </Col>
          <Col width="30">
            <Button fill big onClick={this.submit}>
              I Consent
            </Button>
          </Col>
          <Col width="20"></Col>
        </Row>
      </Block>
    )
  }
}
