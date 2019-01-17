import React from 'react'
import { Block } from 'framework7-react'


const COUNTDOWNSTART = 3;
const TIMEOUT = 1000;
const INITIAL = 'Ready?';


const styles = {
  timerBox: {
    // position: 'fixed',
    // top: 10,
    // right: '50%',
    // zIndex: 999,
    display: 'flex',
    margin: 'auto',
    width: '200px',
    height: '200px',
    border: '1px solid #303030',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    // transform: 'translateZ(0)',
  },
  innerDiv: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.5em',
  },
}


export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   txt: INITIAL,
    // }
    // ---
    this.intervalTimer = null
    // ---
    this.RunActionAndReset = this.RunActionAndReset.bind(this)
  }
  reset() {
    this.setState({txt: INITIAL})
  }
  RunActionAndReset() {
    const { action, updateNavCenterMsg } = this.props
    clearInterval(this.intervalTimer)
    updateNavCenterMsg('')
    // this.setState({
    //   txt: INITIAL,
    // })
    // run the action provided by parent element
    action()
  }
  componentDidMount() {
    let t = COUNTDOWNSTART;
    const { updateNavCenterMsg } = this.props

    updateNavCenterMsg(INITIAL)

    const self = this

    this.intervalTimer = setInterval(() => {
      if (t == 0) {
        self.RunActionAndReset()
      } else {
        updateNavCenterMsg(t)
        // self.setState({
        //   txt: t,
        // })
      }
      t = t - 1;
    }, TIMEOUT)

  }
  render () {
    return null;
    // const { txt } = this.state
    // const { isRunning } = this.props
    // return (
    //   <Block>
    //     <div style={styles.timerBox}>
    //       <p style={styles.innerDiv}>{txt}</p>
    //     </div>
    //   </Block>
    // )
  }
}
