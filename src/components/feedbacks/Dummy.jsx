import React from 'react'
import { Block, Row, Col, Button } from 'framework7-react'


export default class DummyComponent extends React.PureComponent {
  submit = () => {
    const { send } = this.props // 'send' function from props
    const feedback = {
      type: 'dummy',
      payload: {},
    }
    send(feedback)
  }
  componentDidMount() {
    // fetch('https://ubistudies.com/perdis/test/RemoteComponent.jsx')
  }
  render () {
    const { feedback } = this.props
    return (
      <Block>
        <h2>{feedback.instructions}</h2>
        <p>{feedback.content}</p>
        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button
              fill big
              onClick={this.submit}
            >
              Start Over
            </Button>
          </Col>
          <Col width="33"></Col>
        </Row>
      </Block>
    )
  }
}
