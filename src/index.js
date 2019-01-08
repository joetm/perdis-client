// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';

// Import Framework7-React plugin
import Framework7React from 'framework7-react';

//webrtc shim
import "webrtc-adapter/out/adapter.js";

// Import main App component
import App from './components/App.jsx';

// Framework7 styles
import 'framework7/css/framework7.min.css';

// Icons
import './css/icons.css';

// FontAwesome
import '../node_modules/@fortawesome/fontawesome-pro/css/all.min.css'

// Custom app styles
import './css/app.css';

import 'react-hot-loader/patch';
import {AppContainer} from 'react-hot-loader';

// Init Framework7-React plugin
Framework7.use(Framework7React);


function permRequest (target) {
  return new Promise(function(resolve, reject) {
    cordova.plugins.permissions.hasPermission(target, function (status) {
      if (!status.hasPermission) {
        // need to request camera permission
        cordova.plugins.permissions.requestPermission(target,
          function (status) {
            if (!status.hasPermission) {
              console.error('permission denied', status)
              reject(status)
            }
            resolve(status)
          },
          function (error) {
            console.error('permission error', error)
            reject(error)
          },
        )
      }
    })
  })
}


// Mount React App
const startApp = () => {
  const rootElement = document.getElementById('app');
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootElement
  );
} //

function cordovaReady () {
  // force permission requests on startup
  const permissions = cordova.plugins.permissions
  const promise1 = permRequest(permissions.CAMERA)
  const promise2 = permRequest(permissions.RECORD_AUDIO)
  Promise.all([promise1, promise2]).then(function(values) {
    startApp()
  })
}

if (!window.cordova) {
  // browser
  startApp();
} else {
  // cordova
  document.addEventListener('deviceready', cordovaReady, false);
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootElement
    );
  });
}

