import React from 'react'
import { Block, Icon, Button, Row, Col } from 'framework7-react'

const styles = {
  voteItem: {
    padding: '30px',
    cursor: 'pointer',
    //margin: 0,
    //padding: 0,
  },
}

const size = '200'


export default class VotingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
    }
  }
  voteDown = () => {
    console.log('clicked down');
    this.setState({
      selected: 'down',
    })
    this.submit()
  }
  voteUp = () => {
    console.log('clicked up');
    this.setState({
      selected: 'up',
    })
    this.submit()
  }
  resetInput = () => {
    this.setState({selected: false})
  }
  submit = () => {
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
        <Block>
            <span onClick={this.voteDown} style={{marginRight: '20px'}}>
              <Icon
                id="down"
                style={styles.voteItem}
                fa="thumbs-down"
                size={size}
                tooltip="Dislike"
                color={selected === 'down' ? "red" : "blue"}
              />
            </span>
            <span onClick={this.voteUp} style={{marginLeft: '20px'}}>
              <Icon
                id="up"
                style={styles.voteItem}
                fa="thumbs-up"
                tooltip="Like"
                size={size}
                color={selected === 'up' ? "red" : "blue"}
              />
            </span>
        </Block>

        <div>Clicking the thumbs will submit your answer to the artist</div>

      </Block>
    )
  }
}