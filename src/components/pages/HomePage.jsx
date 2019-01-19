import React from 'react'
import fetch from 'unfetch'
import {
  Page, Navbar, Preloader, NavTitle, NavRight, NavLeft,
  Link, Icon, Block, BlockTitle,
  List, ListItem, Row, Col, Button,
  ListInput, Input, Label
} from 'framework7-react'
// import { Device } from 'framework7'

import FeedbackFactory from '../FeedbackFactory'

const RECONNECT_TIMEOUT = 1000;

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
      infoOnlyFeedback: false,
      aspectRatio: 1,
    }
    // ---
    this.refresh = this.refresh.bind(this)
    this.connectWebSocket = this.connectWebSocket.bind(this)
    this.updateNavCenterMsg = this.updateNavCenterMsg.bind(this)
    this.getImageAspectRatio = this.getImageAspectRatio.bind(this)
  }
  connectWebSocket() {
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
      // show new feedback and artwork
      const obj = JSON.parse(event.data)
      console.log('WS: received: ', obj)
      this.setState({
        artwork: obj.artwork,
        feedback: obj.feedback,
        infoOnlyFeedback: obj.feedback.type === "dummy" ? true : false,
      })
    }.bind(this)
    this.mySocket.onerror = function (event) {
      console.error("WS: WebSocket connection error:", event);
      this.setState({connectionError: true})

      // try to reconnect after RECONNECT_TIMEOUT ms
      setTimeout(() => {
        this.connectWebSocket()
      }, RECONNECT_TIMEOUT)

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
  componentWillMount () {
    this.connectWebSocket()
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
  updateNavCenterMsg(msg) {
    this.setState({navCenterMsg: msg})
  }
  getImageAspectRatio({target: img}) {
    this.setState({
      aspectRatio: img.offsetWidth / img.offsetHeight,
    })
  }
  render () {
    const { artwork, feedback, aspectRatio, connectionError, navCenterMsg, infoOnlyFeedback } = this.state
    const { SERVER, PORT } = this.$f7.data
    return (
      <Page style={{backgroundColor: !infoOnlyFeedback ? 'inherit' : '#ffeb3b' }}>

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
          {
            !infoOnlyFeedback &&
              <NavRight>
                {
                  artwork && artwork.src ?
                    <img alt="Image" onLoad={this.getImageAspectRatio} src={artwork.src} style={styles.imgstyle} />
                    :
                    <Preloader style={styles.navLoader} size={42}></Preloader>
                }
              </NavRight>
          }
        </Navbar>

        {
          !infoOnlyFeedback &&
            <div>
            {
              artwork && !infoOnlyFeedback ?
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
            </div>
        }

        <Block style={styles.feedback}>
          <FeedbackFactory
            feedback={feedback}
            artwork={artwork}
            send={this.refresh}
            updateNavCenterMsg={this.updateNavCenterMsg}
            aspectRatio={aspectRatio}
          />
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
