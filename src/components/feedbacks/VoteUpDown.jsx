import React from 'react'
import { Block, Icon, Button, Row, Col } from 'framework7-react'

const styles = {
  voteItem: {
    padding: '30px',
    cursor: 'pointer',
  },
}

const size = 250


export default class VotingComponent extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.state = {
      selected: false,
      showSubmitButton: false
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
      showSubmitButton: true
    })
  }
  voteUp () {
    console.log('clicked up');
    this.setState({
      selected: 'up',
      showSubmitButton: true
    })
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
    const { selected, showSubmitButton } = this.state
    return (
      <Block id="vote">
        <h2>{feedback.instructions}</h2>
        <Block>
          <span
            onClick={this.voteDown}
          >
            <Icon
              id="down"
              style={styles.voteItem}
              fa="thumbs-down"
              tooltip="Dislike"
              size={size}
              color={selected === 'down' ? "red" : "blue"}
            />
          </span>
          <span
            onClick={this.voteUp}
          >
          <Icon
            id="up"
            style={styles.voteItem}
            fa="thumbs-up"
            size={size}
            tooltip="Like"
            color={selected === 'up' ? "red" : "blue"}
          />
          </span>
        </Block>

        <Block style={{display: showSubmitButton ? 'block' : 'none'}}>
          <Row>
            <Col width="33"></Col>
            <Col width="33">
              <Button fill
                onClick={this.submit}
              >Submit</Button>
            </Col>
            <Col width="33"></Col>
          </Row>
          <div>Clicking this button will submit your answer to the artist</div>
        </Block>

      </Block>
    )
  }
}