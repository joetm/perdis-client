import React from 'react'
import { Block, Row, Col, Button } from 'framework7-react'


export default class ConsentComponent extends React.PureComponent {
  submit = () => {
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
          <Col width="25"></Col>
          <Col width="25">
            <Button fill big onClick={this.submit}>
              Cancel
            </Button>
          </Col>
          <Col width="25">
            <Button fill big onClick={this.submit}>
              I Consent
            </Button>
          </Col>
          <Col width="25"></Col>
        </Row>
      </Block>
    )
  }
}
