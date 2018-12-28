import React from 'react'
import { Block, BlockTitle, List, ListItem, Row, Col, Button } from 'framework7-react'


export default class LikertComponent extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        selectedOption: null,
      }
      this.resetInput = this.resetInput.bind(this)
      this.submit = this.submit.bind(this)
      this.enableSubmitBtn = this.enableSubmitBtn.bind(this)
  }
  submit () {
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
  enableSubmitBtn(e) {
    this.setState({selectedOption: e.target.value})
  }
  resetInput () {
    this.setState({selectedOption: null})
  }
  render () {
    const { feedback } = this.props
    const { selectedOption } = this.state
    return (
      <Block>
        <h2>Answer this question from the artist:</h2>
        <p>{feedback.content}</p>

        <BlockTitle>Choose one answer</BlockTitle>
        <List>
          <ListItem checked={selectedOption == 'Books'}  onChange={this.enableSubmitBtn} radio required value="Books"  title="Books"  name="choice"></ListItem>
          <ListItem checked={selectedOption == 'Movies'} onChange={this.enableSubmitBtn} radio required value="Movies" title="Movies" name="choice"></ListItem>
          <ListItem checked={selectedOption == 'Food'}   onChange={this.enableSubmitBtn} radio required value="Food"   title="Food"   name="choice"></ListItem>
          <ListItem checked={selectedOption == 'Drinks'} onChange={this.enableSubmitBtn} radio required value="Drinks" title="Drinks" name="choice"></ListItem>
        </List>

            <Row>
              <Col width="33"></Col>
              <Col width="33">
                <Button fill
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
