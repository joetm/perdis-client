import React from 'react'
import { Block, Icon, Button, Row, Col } from 'framework7-react'

const styles = {
  voteItem: {
    padding: '30px',
    cursor: 'pointer',
  },
}

const size = '100%'


export default class VotingComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      selected: false,
      // showSubmitButton: false
    }
    // ---
    this.voteDown = this.voteDown.bind(this)
    this.voteUp = this.voteUp.bind(this)
    this.resetInput = this.resetInput.bind(this)
    this.submit = this.submit.bind(this)
  }
  voteDown () {
    console.log('clicked down');
    this.setState({
      selected: 'down',
      // showSubmitButton: true
    })
    this.submit()
  }
  voteUp () {
    console.log('clicked up');
    this.setState({
      selected: 'up',
      // showSubmitButton: true
    })
    this.submit()
  }
  resetInput () {
    this.setState({selected: false})
  }
  submit () {
    const { send, artworkID } = this.props // 'send' function from props
    const feedback = {
      type: 'vote',
      payload: this.state.selected,
      id: artworkID,
    }
    const ret = send(feedback)
    if (ret) {
      this.resetInput()
    }
  }
  render () {
    const { feedback } = this.props
    const { selected } = this.state
    return (
      <Block id="vote">
        <h2>{feedback.instructions}</h2>
        <Row>
          <Col width="49" style="border:1px solid red">
            <span onClick={this.voteDown}>
              <Icon
                id="down"
                style={styles.voteItem}
                fa="thumbs-down"
                tooltip="Dislike"
                size={size}
                color={selected === 'down' ? "red" : "blue"}
              />
            </span>
          </Col>
          <Col width="49" style="border:1px solid red">
            <span onClick={this.voteUp}>
            <Icon
              id="up"
              style={styles.voteItem}
              fa="thumbs-up"
              size={size}
              tooltip="Like"
              color={selected === 'up' ? "red" : "blue"}
            />
            </span>
          </Col>
        </Row>

        <div>Clicking the thumbs will submit your answer to the artist</div>

      </Block>
    )
  }
}