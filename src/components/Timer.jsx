import React from 'react'
import { Block } from 'framework7-react'


const COUNTDOWNSTART = 3
const TIMEOUT = 1000
const INITIAL = 'Ready?'


const styles = {
  timerBox: {
    position: 'absolute',
    top: 200,
    left: '45%',
    zIndex: 999,
    display: 'flex',
    margin: 'auto',
    width: '200px',
    height: '200px',
    opacity: 0.8,
    border: '1px solid #303030',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    fontSize: '40px',
    // transform: 'translateZ(0)',
  },
  innerDiv: {
    margin: 'auto',
    textAlign: 'center',
  },
}


export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.intervalTimer = null
    this.state = {
      txt: INITIAL,
    }
  }
  reset() {
    this.setState({txt: INITIAL})
  }
  RunActionAndReset = () => {
    const { action } = this.props
    clearInterval(this.intervalTimer)
    this.setState({
      txt: '',
    })
    // run the action provided by parent element
    action()
  }
  componentDidMount() {
    let t = COUNTDOWNSTART;

    const self = this

    this.intervalTimer = setInterval(() => {
      if (t == 0) {
        self.RunActionAndReset()
      } else {
        // updateNavCenterMsg(t)
        self.setState({txt: t})
      }
      t = t - 1;
    }, TIMEOUT)

  }
  render () {
    const { txt } = this.state
    const { isRunning } = this.props
    if (!isRunning) {
      return null
    }
    return (
      <Block>
        <div style={styles.timerBox}>
          <p style={styles.innerDiv}>{txt}</p>
        </div>
      </Block>
    )
  }
}
