import React from 'react'
import fetch from 'unfetch'
import {
  Page, Navbar, Preloader, NavTitle, NavRight, NavLeft,
  Link, Icon, Block, BlockTitle,
  List, ListItem, Row, Col, Button,
  ListInput, Input, Label
} from 'framework7-react'
import { Device } from 'framework7'

import Image          from '../feedbacks/Image'
import ImageTimer     from '../feedbacks/ImageTimer'
import Video          from '../feedbacks/Video'
import Reaction       from '../feedbacks/Reaction'
// // import Visual         from '../components/feedbacks/Visual'
import Question       from '../feedbacks/Question'
import Answer         from '../feedbacks/Answer'
import Likert         from '../feedbacks/Likert'
import VoteUpDown     from '../feedbacks/VoteUpDown'
import MultipleChoice from '../feedbacks/MultipleChoice'


const styles = {
  imgstyle: {
    maxWidth: '50px',
    maxHeight: '50px',
    marginRight: '10px',
    border: '1px solid #FFFFFF',
  },
  submitButton: {
    textTransform: 'uppercase',
  },
  navLoader: {
    marginRight: '10px',
  },
  feedback: {
    textAlign: 'center',
    align: 'center',
  },
  navCenterMsg: {
    textAlign: 'center',
    align: 'center',
    margin: 'auto',
  },
}




export default class RatingPage extends React.Component {
  constructor(props) {
    super(props)
    // ---
    this.mySocket = null
    // ---
    this.state = {
      artwork: null,
      feedback: null,
      connectionError: false,
      error: null,
      navCenterMsg: '',
    }
    // ---
    this.refresh = this.refresh.bind(this)
    this.renderFeedback = this.renderFeedback.bind(this)
    this.updateNavCenterMsg = this.updateNavCenterMsg.bind(this)
  }
  componentWillMount () {
    const { SERVER, PORT } = this.$f7.data
    // this.setState({connectionError: true})
    this.mySocket = new WebSocket("ws://" + SERVER + ":" + PORT + "/")
    // console.log('mySocket', this.mySocket);
    this.mySocket.onopen = function (event) {
      console.info('WS: WebSocket connection established')
      // request initial sync
      console.info('WS: syncing initial')
      this.send("sync")
    }
    this.mySocket.onmessage = function (event) {
      // iterated through all the feedback options?
      if (event.data === 'end') {

      } else {
        // show new feedback and artwork
        const obj = JSON.parse(event.data)
        console.log('WS: received: ', obj)
        this.setState({
          artwork: obj.artwork,
          feedback: obj.feedback,
        })
      }
    }.bind(this)
    this.mySocket.onerror = function (event) {
      console.error("WS: WebSocket connection error:", event);
      this.setState({connectionError: true})

      // TODO: try to reconnect

    }.bind(this)
    // TODO
    // this.mySocket.onclose = function (event) {
    //   console.error('WS: WebSocket connection closed')
    //   console.info(event)
      // this.setState({
      //   connectionError: true,
      //   error: event,
      // })
    // }.bind(this)
  }
  componentWillUnmount () {
    if (this.mySocket) {
      this.mySocket.close()
    }
  }
  refresh (feedback) {
    if (this.mySocket) {
      console.log('Sending feedback:', feedback)
      this.mySocket.send(JSON.stringify(feedback))
      return true
    }
    console.error('Can\'t send feedback - no WebSocket connection')
    return false
  }
  renderFeedback () {
    const { feedback, artwork } = this.state
    if (!feedback || !feedback.type || !artwork) {
      return null
    }
    const artworkID = artwork.id
    console.log('render feedback:', feedback.type);
    switch (feedback.type) {
      case 'imagetimer':
        return <ImageTimer artworkID={artworkID} feedback={feedback} send={this.refresh} updateNavCenterMsg={this.updateNavCenterMsg} />
        break
      case 'image':
        return <Image artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'video':
        return <Video artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'reaction':
        return <Reaction artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      // case 'visual':
      //   return <Visual artworkID={artworkID} artwork={artwork} feedback={feedback} send={this.refresh} />
      //   break
      case 'question':
        return <Question artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'answer':
        return <Answer artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'likert':
        return <Likert artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'multiplechoice':
        return <MultipleChoice artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
      case 'vote':
        return <VoteUpDown artworkID={artworkID} feedback={feedback} send={this.refresh} />
        break
    }
    console.error('unknown feedback.type', feedback.type)
    return null
  }
  updateNavCenterMsg(msg) {
    this.setState({navCenterMsg: msg})
  }
  render () {
    const { artwork, feedback, connectionError, navCenterMsg } = this.state
    const { SERVER, PORT } = this.$f7.data
    return (
      <Page>

        <Navbar
          sliding
        >
          <NavLeft>
            <Link popupOpen="#popup"><Icon f7="help_round" /></Link>
          </NavLeft>
          <NavTitle title="Provide your feedback!" />
          {
            navCenterMsg &&
              <div style={styles.navCenterMsg}>{navCenterMsg}</div>
          }
          <NavRight>
            {
              artwork && artwork.src ?
                <img alt="Image" src={artwork.src} style={styles.imgstyle} />
                :
                <Preloader style={styles.navLoader} size={42}></Preloader>
            }
          </NavRight>
        </Navbar>

        {
          artwork ?
            <Block style={{textAlign: 'center'}}>
              <h1>
                    &quot;{artwork.title}&quot; <span style={{fontWeight: 'normal'}}>by</span> {artwork.artist}
              </h1>
            </Block>
            :
            <Block style={{textAlign: 'center'}}>
              <h2>
                    Connecting to WebSocket Server
              </h2>
              <Preloader style={styles.navLoader} size={42}></Preloader>
            </Block>
        }

        <Block style={styles.feedback}>
          { this.renderFeedback() }
        </Block>

        {
          connectionError &&
            <Block style={{textAlign: 'center'}}>
              <BlockTitle>WEBSOCKET CONNECTION ERROR</BlockTitle>
              <p>
                Could not connect to ws://{SERVER}:{PORT}
              </p>
            </Block>
        }

      </Page>
    )
  }
}
