import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  List,
  ListItem,
  Label,
  Input,
  ListButton
} from 'framework7-react';
import routes from '../routes';

import InfoPopup from './InfoPopup'


export default function (props) {

  // Framework7 parameters here
  const f7params = {
    id: 'com.perdis.prototype', // App bundle ID
    name: 'PerDis Prototype', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes,
      data: function () {
        return {
          SERVER: "ubistudies.com", // 127.0.0.1
          PORT: "8000",
          CONTACT_EMAIL: "U2FsdGVkX19mfX61lfutSWMU/RswHMXhcF/8yUMUeXxLJYLjByso6IvDmy2NjlSg",
          SECRETKEY: "8723ikhgjsKJDH*&#IU#JR#(UFDJSDG337hgea",
        }
      }
  };

  return (
    <App params={f7params}>
      {/* Statusbar */}
      <Statusbar />

      {/* Main View */}
      <View id="main-view" url="/" main className="ios-edges"/>

      {/* Popup */}
      <InfoPopup id="popup" />

    </App>
  );
};
