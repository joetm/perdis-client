import React from 'react'
import { Page, View, BlockTitle, Popup, Navbar, NavRight, Link, Block, Icon } from 'framework7-react'
import CryptoJS from "crypto-js"

export default class InfoDialog extends React.Component {
  constructor (props) {
    super(props)
    // ---
    this.state = {
      contactaddress: 'U2FsdGVkX1/JrJqNqbD5sIVnYfrksOefEbBPzqBmEv1lnCIGyRMM0EOgq+mSGJCC'
    }
  }
  componentDidMount() {
    const bytes  = CryptoJS.AES.decrypt(this.state.contactaddress, '8723ikhgjsKJDH*&#IU#JR#(UFDJSDG337hgea')
    const contactaddress = bytes.toString(CryptoJS.enc.Utf8)
    this.setState({contactaddress})
  }
  render () {
    const { contactaddress } = this.state
    return (
      <Popup id="popup" tabletFullscreen={false}>
        <View>
          <Page>
            <Navbar title="About">
              <NavRight>
                <Link popupClose><Icon f7="close"></Icon></Link>
              </NavRight>
            </Navbar>
            <Block>          
              <BlockTitle>View artworks and provide feedback!</BlockTitle>
              <Block>
                  An art installation by researchers from the
                  Center for Ubiquitous Computing,
                  University of Oulu
              </Block>
              <BlockTitle>How it works</BlockTitle>
              <Block>
                  We invited artists to showcase their artworks in this installation.
                  One artwork is showing on the main screen in front of you.
                  Each artwork is accompanied with a way for you to provide feedback,
                  as chosen by the respective artist.<br />
                  All submitted feedback is sent to the respective artists.
              </Block>
              <BlockTitle>Privacy Policy</BlockTitle>
              <Block>
                  Your data will be shared with the artist who uploaded the artwork to this installation.
                  Besides the researchers and the artist, nobody else will have access to your submitted data.
                  <br />
                  For further question, contact {contactaddress}.
              </Block>
            </Block>
          </Page>
        </View>
      </Popup>
    )
  }
}
