import React from 'react'
import { Block, BlockTitle, List, ListItem, Row, Col, Button } from 'framework7-react'


export default class LikertComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
    }
  }
  submit = () => {
    const { send, artworkID } = this.props // 'send' function from props
    const { selectedOption } = this.state
    const feedback = {
      type: 'likert',
      payload: selectedOption,
      id: artworkID,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetInput()
    }
  }
  enableSubmitBtn = (e) => {
    this.setState({selectedOption: e.target.value})
  }
  resetInput = () => {
    this.setState({selectedOption: null})
  }
  render () {
    const { feedback } = this.props
    const { selectedOption } = this.state
    return (
      <Block>

        <h2>{feedback.instructions}</h2>
        {
          feedback.content && <p>{feedback.content}</p>
        }

        <BlockTitle>Choose one answer</BlockTitle>
        <List>
          {
            feedback.options.map((item, index) => (
              <ListItem key={`${index}${item.value}`} onChange={this.enableSubmitBtn} radio required value={item.value} title={item.title} name="choice"></ListItem>)
            )
          }
        </List>

        <Row>
          <Col width="33"></Col>
          <Col width="33">
            <Button fill big
              disabled={selectedOption ? false : true}
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
