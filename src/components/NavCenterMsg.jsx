import React from 'react'

const styles = {
  navCenterMsg: {
    textAlign: 'center',
    align: 'center',
    margin: 'auto',
    paddingLeft: '50px',
    fontWeight: 'bold',
  },
}

const NavCenterMsg = (props) => (
  <div style={styles.navCenterMsg}>{props.msg}</div>
)

export default NavCenterMsg;
