(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,n){},124:function(e,t,n){},55:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),a=n(17);t.default=function(e){return r.default.createElement(a.Block,null,r.default.createElement(a.Button,{onClick:e.onCaptureClick,outline:!0},r.default.createElement(a.Icon,{f7:e.icon})," ",e.buttonText))}},66:function(e,t,n){e.exports=n(67)},67:function(e,t,n){"use strict";var r=s(n(2)),a=s(n(70)),o=s(n(128)),l=s(n(17));n(78);var i=s(n(79));n(118),n(120),n(122),n(124),n(126);var u=n(127);function s(e){return e&&e.__esModule?e:{default:e}}o.default.use(l.default);var c=function(){var e=document.getElementById("app");a.default.render(r.default.createElement(u.AppContainer,null,r.default.createElement(i.default,null)),e)};window.cordova?document.addEventListener("deviceready",function(){var e=cordova.plugins.permissions,t=[e.CAMERA,e.RECORD_AUDIO];e.checkPermission(t,function(n){n.hasPermission?(console.log("Permission already granted. Starting react."),c()):e.requestPermissions(t,function(e){console.log("Permission granted. Starting react."),c()},function(){console.warn("Camera and/or Audio permission is not turned on")})},function(){console.warn("Camera and/or Audio permission is not turned on")})},!1):c()},79:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={id:"com.perdis.prototype",name:"PerDis Prototype",theme:"auto",routes:o.default,data:function(){return{SERVER:"ubistudies.com",PORT:"8000",CONTACT_EMAIL:"U2FsdGVkX19mfX61lfutSWMU/RswHMXhcF/8yUMUeXxLJYLjByso6IvDmy2NjlSg",SECRETKEY:"8723ikhgjsKJDH*&#IU#JR#(UFDJSDG337hgea"}}};return r.default.createElement(a.App,{params:t},r.default.createElement(a.Statusbar,null),r.default.createElement(a.View,{id:"main-view",url:"/",main:!0,className:"ios-edges"}),r.default.createElement(l.default,{id:"popup"}))};var r=i(n(2)),a=n(17),o=i(n(80)),l=i(n(93));function i(e){return e&&e.__esModule?e:{default:e}}},80:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(81)),a=l(n(91)),o=l(n(92));function l(e){return e&&e.__esModule?e:{default:e}}t.default=[{path:"/",component:r.default},{path:"/about/",component:a.default},{path:"(.*)",component:o.default}]},81:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=p(n(2)),o=(p(n(82)),n(17)),l=(n(28),p(n(83))),i=p(n(84)),u=p(n(85)),s=p(n(86)),c=p(n(87)),d=p(n(88)),f=p(n(89)),m=p(n(90));function p(e){return e&&e.__esModule?e:{default:e}}var b={imgstyle:{maxWidth:"50px",maxHeight:"50px",marginRight:"10px",border:"1px solid #FFFFFF"},submitButton:{textTransform:"uppercase"},navLoader:{marginRight:"10px"},feedback:{textAlign:"center",align:"center"}},h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.mySocket=null,n.state={artwork:null,feedback:null,connectionError:!1,error:null},n.refresh=n.refresh.bind(n),n.renderFeedback=n.renderFeedback.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"componentWillMount",value:function(){var e=this.$f7.data,t=e.SERVER,n=e.PORT;this.mySocket=new WebSocket("ws://"+t+":"+n+"/"),this.mySocket.onopen=function(e){console.info("WS: WebSocket connection established"),console.info("WS: syncing initial"),this.send("sync")},this.mySocket.onmessage=function(e){if("end"===e.data);else{var t=JSON.parse(e.data);console.log("WS: received: ",t),this.setState({artwork:t.artwork,feedback:t.feedback})}}.bind(this),this.mySocket.onerror=function(e){console.error("WS: WebSocket connection error:",e),this.setState({connectionError:!0})}.bind(this)}},{key:"componentWillUnmount",value:function(){this.mySocket&&this.mySocket.close()}},{key:"refresh",value:function(e){return this.mySocket?(console.log("Sending feedback:",e),this.mySocket.send(JSON.stringify(e)),!0):(console.error("Can't send feedback - no WebSocket connection"),!1)}},{key:"renderFeedback",value:function(){var e=this.state,t=e.feedback,n=e.artwork;if(!t||!t.type||!n)return null;var r=n.id;switch(console.log("render feedback:",t.type),t.type){case"image":return a.default.createElement(l.default,{artworkID:r,feedback:t,send:this.refresh});case"video":return a.default.createElement(i.default,{artworkID:r,feedback:t,send:this.refresh});case"reaction":return a.default.createElement(u.default,{artworkID:r,feedback:t,send:this.refresh});case"question":return a.default.createElement(s.default,{artworkID:r,feedback:t,send:this.refresh});case"answer":return a.default.createElement(c.default,{artworkID:r,feedback:t,send:this.refresh});case"likert":return a.default.createElement(d.default,{artworkID:r,feedback:t,send:this.refresh});case"multiplechoice":return a.default.createElement(m.default,{artworkID:r,feedback:t,send:this.refresh});case"vote":return a.default.createElement(f.default,{artworkID:r,feedback:t,send:this.refresh})}return console.error("unknown feedback.type",t.type),null}},{key:"render",value:function(){var e=this.state,t=e.artwork,n=(e.feedback,e.connectionError),r=this.$f7.data,l=r.SERVER,i=r.PORT;return a.default.createElement(o.Page,null,a.default.createElement(o.Navbar,null,a.default.createElement(o.NavLeft,null,a.default.createElement(o.Link,{popupOpen:"#popup"},a.default.createElement(o.Icon,{f7:"help_round"}))),a.default.createElement(o.NavTitle,null,"Provide your feedback!"),a.default.createElement(o.NavRight,null,t&&t.src?a.default.createElement("img",{alt:"Image",src:t.src,style:b.imgstyle}):a.default.createElement(o.Preloader,{style:b.navLoader,size:42}))),t?a.default.createElement(o.Block,{style:{textAlign:"center"}},a.default.createElement("h1",null,'"',t.title,'" ',a.default.createElement("span",{style:{fontWeight:"normal"}},"by")," ",t.artist)):a.default.createElement(o.Block,{style:{textAlign:"center"}},a.default.createElement("h2",null,"Connecting to WebSocket Server"),a.default.createElement(o.Preloader,{style:b.navLoader,size:42})),a.default.createElement(o.Block,{style:b.feedback},this.renderFeedback()),n&&a.default.createElement(o.Block,{style:{textAlign:"center"}},a.default.createElement(o.BlockTitle,null,"WEBSOCKET CONNECTION ERROR"),a.default.createElement("p",null,"Could not connect to ws://",l,":",i)))}}]),t}();t.default=h},83:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=u(n(2)),o=n(17),l=n(28),i=u(n(55));function u(e){return e&&e.__esModule?e:{default:e}}var s={video:{width:"240px",height:"160px",border:"1px solid #000000",marginRight:"10px",backgroundColor:"#303030"},img:{width:"240px",height:"160px",border:"1px solid #000000",marginLeft:"10px",backgroundColor:"#303030"},mobileImg:{margin:"1em",maxWidth:"100px",height:"auto",align:"center"},center:{textAlign:"center"}},c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={submitBtnDisabled:!0,errorMsg:null,image:null},n.videoRef=a.default.createRef(),n.canvasRef=a.default.createRef(),n.submit=n.submit.bind(n),n.onCaptureClick=n.onCaptureClick.bind(n),n.resetCapture=n.resetCapture.bind(n),n.getPicture=n.getPicture.bind(n),n.nativeCameraSuccess=n.nativeCameraSuccess.bind(n),n.nativeCameraError=n.nativeCameraError.bind(n),n.activateWebStream=n.activateWebStream.bind(n),n.handleStreamSuccess=n.handleStreamSuccess.bind(n),n.handleStreamError=n.handleStreamError.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){console.log("submitting feedback");var e=this.props;(0,e.send)({type:"image",id:e.artworkID,payload:this.state.image})&&this.resetCapture()}},{key:"activateWebStream",value:function(){console.log("activateWebStream");this.videoRef.current,window.canvas=this.canvasRef.current;navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then(this.handleStreamSuccess).catch(this.handleStreamError)}},{key:"handleStreamSuccess",value:function(e){window.stream=e,this.videoRef.current.srcObject=e}},{key:"handleStreamError",value:function(e){console.error("navigator.getUserMedia error [%s]: ",e.code,e.name,e.message);var t=e.name;"NotSupportedError"==e.name&&(t="Browser Not Supported"),this.setState({errorMsg:t+": "+e.message})}},{key:"getPicture",value:function(){navigator.camera.Direction.FRONT,navigator.camera.DestinationType.FILE_URI;navigator.camera.getPicture(this.nativeCameraSuccess,this.nativeCameraError)}},{key:"nativeCameraSuccess",value:function(e){console.log(e),this.setState({submitBtnDisabled:!1,image:e})}},{key:"nativeCameraError",value:function(e){console.error("Failed: "+e),this.setState({submitBtnDisabled:!0})}},{key:"onCaptureClick",value:function(){if(l.Device.desktop){var e=this.videoRef.current,t=this.canvasRef.current;t.width=e.videoWidth,t.height=e.videoHeight,t.getContext("2d").drawImage(e,0,0,t.width,t.height);var n=this.canvasRef.current.toDataURL("image/jpeg");this.setState({image:n,submitBtnDisabled:!1})}else this.getPicture()}},{key:"resetCapture",value:function(){if(l.Device.desktop){var e=this.canvasRef.current;e.getContext("2d").clearRect(0,0,e.width,e.height)}this.setState({image:null,submitBtnDisabled:!0})}},{key:"componentDidMount",value:function(){console.log("Device",l.Device),l.Device.desktop&&this.activateWebStream()}},{key:"render",value:function(){var e=this.state,t=e.submitBtnDisabled,n=e.errorMsg,r=e.image;return a.default.createElement(o.Block,{id:"webcam-video"},a.default.createElement("p",null,"Send a selfie to the artist!"),l.Device.desktop&&a.default.createElement(o.Block,null,a.default.createElement("video",{id:"video",ref:this.videoRef,style:s.video,autoPlay:"autoplay",playsInline:!0}),a.default.createElement("canvas",{id:"canvas",ref:this.canvasRef,style:s.img})),!l.Device.desktop&&r&&a.default.createElement("div",{style:s.center},a.default.createElement("img",{src:r,style:s.mobileImg,alt:""})),a.default.createElement("div",{style:{display:n?"block":"none"},id:"errorMsg"},n),a.default.createElement(i.default,{buttonText:"Take Picture",icon:"camera_round",onCaptureClick:this.onCaptureClick}),a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"20"}),a.default.createElement(o.Col,{width:"60"},a.default.createElement(o.Button,{fill:!0,disabled:t,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"20"})),a.default.createElement("div",null,"Clicking this button will submit your image to the artist"))}}]),t}();t.default=c},84:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=u(n(2)),o=n(17),l=n(28),i=u(n(55));function u(e){return e&&e.__esModule?e:{default:e}}var s={video:{width:"240px",height:"180px",border:"1px solid #000000",backgroundColor:"#303030"}},c=function(){return a.default.createElement("span",null,a.default.createElement(o.Icon,{fa:"video"})," Record video")},d=function(){return a.default.createElement("span",null,a.default.createElement(o.Icon,{fa:"video"})," Record different video")},f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={buttonTxt:a.default.createElement(c,null),submitBtnDisabled:!0,video:null},n.submit=n.submit.bind(n),n.resetVideo=n.resetVideo.bind(n),n.startRecording=n.startRecording.bind(n),n.captureSuccess=n.captureSuccess.bind(n),n.captureError=n.captureError.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){var e=this.props;(0,e.send)({type:"video",id:e.artworkID,payload:this.state.video})&&this.resetVideo()}},{key:"resetVideo",value:function(){this.setState({video:null,submitBtnDisabled:!0,buttonTxt:a.default.createElement(c,null)})}},{key:"startRecording",value:function(){navigator.device.capture.captureVideo(this.captureSuccess,this.captureError,{limit:1,duration:60,quality:1})}},{key:"captureSuccess",value:function(e){console.log(e),1===e.length&&this.setState({video:e[0],submitBtnDisabled:!1,buttonTxt:a.default.createElement(d,null)})}},{key:"captureError",value:function(e){alert("Capture Error. Error code: "+e.code)}},{key:"render",value:function(){if(l.Device.desktop)return a.default.createElement(o.Block,null,"Can't preview this feedback type in the browser.");var e=this.state,t=e.video,n=e.buttonTxt;return a.default.createElement(o.Block,{id:"webcam-video"},a.default.createElement("p",null,"Send a selfie video to the artist!"),t&&t.fullPath&&a.default.createElement(o.Block,null,a.default.createElement("video",{id:"video",style:s.video,controls:"controls",playsInline:"playsInline",autoPlay:"autoPlay",muted:"muted"},a.default.createElement("source",{src:t.fullPath,type:t.type}))),a.default.createElement("div",{id:"errorMsg"}),a.default.createElement(i.default,{buttonText:n,icon:"video",onCaptureClick:this.startRecording}),a.default.createElement(o.Button,{fill:!0,onClick:this.submit,disabled:this.state.submitBtnDisabled},"Submit"),a.default.createElement("div",null,"Clicking this button will submit your video to the artist"))}}]),t}();t.default=f},85:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);n(28);var l={video:{width:"480px",height:"360px",border:"1px solid #000000",marginLeft:"10px",backgroundColor:"#303030"}},i={audio:{echoCancellation:{exact:!0}},video:{facingMode:"user",width:1280,height:720}},u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.stream,n.state={submitBtnDisabled:!0,videoVisible:!1,artworkID:!1},n.recordedRef=a.default.createRef(),n.submit=n.submit.bind(n),n.skip=n.skip.bind(n),n.activateStream=n.activateStream.bind(n),n.handleStreamSuccess=n.handleStreamSuccess.bind(n),n.handleStreamError=n.handleStreamError.bind(n),n.resetVideo=n.resetVideo.bind(n),n.play=n.play.bind(n),n.stop=n.stop.bind(n),n.startTimer=n.startTimer.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"componentWillReceiveProps",value:function(e){console.info("componentWillReceiveProps"),this.state.artworkID&&e.artworkID===this.state.artworkID||(this.setState({artworkID:e.artworkID}),this.activateStream())}},{key:"submit",value:function(){var e=this.props,t=e.send,n={type:"reaction",id:e.artworkID};n.payload=this.stream,t(n),this.resetVideo()}},{key:"skip",value:function(){var e=this.props,t=e.send,n={type:"reaction",id:e.artworkID,payload:"skip"};t(n),this.resetVideo()}},{key:"startTimer",value:function(){var e=this;setTimeout(function(){console.log("this.stream",e.stream);var t=e.stream.getTracks();console.log("tracks",t),t[0].stop(),t[1].stop(),e.setState({videoVisible:!0,submitBtnDisabled:!1}),e.play()},3e3)}},{key:"resetVideo",value:function(){this.stream=null;var e=this.recordedRef.current;e.srcObject=null,e.src=null,this.setState({videoVisible:!1})}},{key:"activateStream",value:function(){navigator.mediaDevices.getUserMedia(i).then(this.handleStreamSuccess).catch(this.handleStreamError)}},{key:"handleStreamSuccess",value:function(e){console.log("getUserMedia() got stream:",e),this.stream=e,this.startTimer()}},{key:"handleStreamError",value:function(e){console.error("navigator.getUserMedia error: ",e),console.log(e.code,e.name,e.message)}},{key:"play",value:function(){var e=this.recordedRef.current;console.log("this.stream",this.stream),e.src=window.URL.createObjectURL(this.stream),e.onloadedmetadata=function(t){e.play()}}},{key:"stop",value:function(){}},{key:"componentDidMount",value:function(){this.activateStream()}},{key:"render",value:function(){var e=this.state.videoVisible;return a.default.createElement(o.Block,{id:"webcam-video"},e&&a.default.createElement(o.Block,null,a.default.createElement("video",{style:l.video,id:"recorded",ref:this.recordedRef,muted:!0,loop:!0})),a.default.createElement("div",{id:"errorMsg"}),a.default.createElement(o.Block,{style:{margin:"10em 0",display:e?"none":"block"}},a.default.createElement("h1",null,"Look at the artwork!"),a.default.createElement(o.Preloader,{color:"black",size:"50"})),a.default.createElement(o.Block,{style:{display:e?"block":"none"}},a.default.createElement("h1",null,"We recorded your reaction to this artwork."),a.default.createElement("h2",null,"Submit the reaction to the artist?")),a.default.createElement(o.Block,{style:{display:e?"block":"none"}},a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"20"}),a.default.createElement(o.Col,{width:"30"},a.default.createElement(o.Button,{fill:!0,onClick:this.submit,disabled:this.state.submitBtnDisabled},"Submit")),a.default.createElement(o.Col,{width:"30"},a.default.createElement(o.Button,{fill:!0,onClick:this.skip},"Skip")),a.default.createElement(o.Col,{width:"20"})),a.default.createElement("div",null,"Clicking the submit button will submit your video to the artist")))}}]),t}();t.default=u},86:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={submitBtnDisabled:!0,question:""},n.resetInput=n.resetInput.bind(n),n.submit=n.submit.bind(n),n.enableSubmitBtn=n.enableSubmitBtn.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){var e=this.props,t=e.send,n=e.artworkID;t({type:"question",payload:this.state.question,id:n})&&this.resetInput()}},{key:"resetInput",value:function(){this.setState({question:"",submitBtnDisabled:!0})}},{key:"enableSubmitBtn",value:function(e){var t=e.target.value;t?this.setState({submitBtnDisabled:!1,question:t}):this.setState({submitBtnDisabled:!0,question:""})}},{key:"render",value:function(){var e=this.state,t=e.question,n=e.submitBtnDisabled;return a.default.createElement(o.Block,null,a.default.createElement("h2",null,"Ask the artist a question"),a.default.createElement(o.List,{noHairlines:!0},a.default.createElement(o.Input,{id:"question",type:"text",onChange:this.enableSubmitBtn,onInputClear:this.resetInput,placeholder:"Enter your question here",clearButton:!0,value:t})),a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"33"}),a.default.createElement(o.Col,{width:"33"},a.default.createElement(o.Button,{fill:!0,disabled:n,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"33"})),a.default.createElement("div",null,"Clicking this button will submit your answer to the artist"))}}]),t}();t.default=l},87:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={submitBtnDisabled:!0,answer:""},n.resetInput=n.resetInput.bind(n),n.submit=n.submit.bind(n),n.enableSubmitBtn=n.enableSubmitBtn.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){var e=this.props,t=e.send,n=e.artworkID;t({type:"answer",payload:this.state.answer,id:n})&&this.resetInput()}},{key:"resetInput",value:function(){this.setState({answer:"",submitBtnDisabled:!0})}},{key:"enableSubmitBtn",value:function(e){e.target.value?this.setState({submitBtnDisabled:!1,answer:e.target.value}):this.setState({submitBtnDisabled:!0,answer:""})}},{key:"render",value:function(){var e=this.state,t=e.answer,n=e.submitBtnDisabled,r=this.props.feedback;return a.default.createElement(o.Block,null,a.default.createElement("h2",null,r.instructions),a.default.createElement("p",null,r.content),a.default.createElement(o.List,{noHairlines:!0},a.default.createElement(o.Input,{id:"question",type:"textarea",clearButton:!0,placeholder:"Enter your answer here",onChange:this.enableSubmitBtn,onInputClear:this.resetInput,value:t})),a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"33"}),a.default.createElement(o.Col,{width:"33"},a.default.createElement(o.Button,{fill:!0,disabled:n,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"33"})),a.default.createElement("div",null,"Clicking this button will submit your answer to the artist"))}}]),t}();t.default=l},88:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);var l={leftDescr:{textAlign:"right"},rightDescr:{textAlign:"left"}},i={min:1,max:5,step:1};i.initial=(i.max-i.min)/2+1;var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={selectedOption:null,sliderValue:i.initial},n.submit=n.submit.bind(n),n.handleSliderChange=n.handleSliderChange.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){var e=this.props,t=e.send,n=e.artworkID;t({type:"likert",payload:this.state.sliderValue,id:n})&&this.setState({sliderValue:i.initial})}},{key:"handleSliderChange",value:function(e){console.log("Slider changed to %s",e),this.setState({sliderValue:e})}},{key:"render",value:function(){var e=this.props.feedback,t=this.state,n=(t.selectedOption,t.sliderValue);return a.default.createElement(o.Block,null,a.default.createElement("h2",null,"Answer this question from the artist:"),a.default.createElement("p",null,e.content),a.default.createElement(o.BlockTitle,null,"Choose your answer"),a.default.createElement(o.Block,null,a.default.createElement(o.Row,null,a.default.createElement(o.Col,{style:l.leftDescr,width:"15"},"Strongly Disagree (",i.min,")"),a.default.createElement(o.Col,{width:"70"},a.default.createElement(o.Range,{label:!0,draggableBar:!0,onRangeChanged:this.handleSliderChange,min:i.min,max:i.max,step:i.step,value:n})),a.default.createElement(o.Col,{style:l.rightDescr,width:"15"},"Strongly Agree (",i.max,")"))),a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"33"}),a.default.createElement(o.Col,{width:"33"},a.default.createElement(o.Button,{fill:!0,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"33"})),a.default.createElement("div",null,"Clicking this button will submit your answer to the artist"))}}]),t}();t.default=u},89:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);var l={voteItem:{padding:"30px",cursor:"pointer"}},i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={selected:!1,showSubmitButton:!1},n.voteDown=n.voteDown.bind(n),n.voteUp=n.voteUp.bind(n),n.resetInput=n.resetInput.bind(n),n.submit=n.submit.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"voteDown",value:function(){console.log("clicked down"),this.setState({selected:"down",showSubmitButton:!0})}},{key:"voteUp",value:function(){console.log("clicked up"),this.setState({selected:"up",showSubmitButton:!0})}},{key:"resetInput",value:function(){this.setState({selected:!1})}},{key:"submit",value:function(){var e=this.props,t=e.send,n=e.artworkID;t({type:"vote",payload:this.state.selected,id:n})&&this.resetInput()}},{key:"render",value:function(){var e=this.props.feedback,t=this.state,n=t.selected,r=t.showSubmitButton;return a.default.createElement(o.Block,{id:"vote"},a.default.createElement("h2",null,e.instructions),a.default.createElement(o.Block,null,a.default.createElement("span",{onClick:this.voteDown},a.default.createElement(o.Icon,{id:"down",style:l.voteItem,fa:"thumbs-down",tooltip:"Dislike",size:250,color:"down"===n?"red":"blue"})),a.default.createElement("span",{onClick:this.voteUp},a.default.createElement(o.Icon,{id:"up",style:l.voteItem,fa:"thumbs-up",size:250,tooltip:"Like",color:"up"===n?"red":"blue"}))),a.default.createElement(o.Block,{style:{display:r?"block":"none"}},a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"33"}),a.default.createElement(o.Col,{width:"33"},a.default.createElement(o.Button,{fill:!0,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"33"})),a.default.createElement("div",null,"Clicking this button will submit your answer to the artist")))}}]),t}();t.default=i},90:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),o=n(17);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={selectedOption:null},n.resetInput=n.resetInput.bind(n),n.submit=n.submit.bind(n),n.enableSubmitBtn=n.enableSubmitBtn.bind(n),n.setValue=n.setValue.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"submit",value:function(){var e=this.props,t=e.send,n=e.artworkID;t({type:"likert",payload:this.state.selectedOption,id:n})&&this.resetInput()}},{key:"enableSubmitBtn",value:function(e){this.setState({selectedOption:e.target.value})}},{key:"setValue",value:function(e){}},{key:"resetInput",value:function(){this.setState({selectedOption:null})}},{key:"render",value:function(){var e=this.props.feedback,t=this.state.selectedOption;return a.default.createElement(o.Block,null,a.default.createElement("h2",null,"Answer this question from the artist:"),a.default.createElement("p",null,e.content),a.default.createElement(o.BlockTitle,null,"Choose one answer"),a.default.createElement(o.List,null,a.default.createElement(o.ListItem,{onChange:this.enableSubmitBtn,radio:!0,required:!0,value:"Books",title:"Books",name:"choice"}),a.default.createElement(o.ListItem,{onChange:this.enableSubmitBtn,radio:!0,required:!0,value:"Movies",title:"Movies",name:"choice"}),a.default.createElement(o.ListItem,{onChange:this.enableSubmitBtn,radio:!0,required:!0,value:"Food",title:"Food",name:"choice"}),a.default.createElement(o.ListItem,{onChange:this.enableSubmitBtn,radio:!0,required:!0,value:"Drinks",title:"Drinks",name:"choice"})),a.default.createElement(o.Row,null,a.default.createElement(o.Col,{width:"33"}),a.default.createElement(o.Col,{width:"33"},a.default.createElement(o.Button,{fill:!0,disabled:!t,onClick:this.submit},"Submit")),a.default.createElement(o.Col,{width:"33"})),a.default.createElement("div",null,"Clicking this button will submit your answer to the artist"))}}]),t}();t.default=l},91:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),a=n(17);t.default=function(){return r.default.createElement(a.Page,null,r.default.createElement(a.Navbar,{title:"About",backLink:"Back"}),r.default.createElement(a.BlockTitle,null,"About My App"),r.default.createElement(a.Block,{strong:!0},r.default.createElement("p",null,"Here is About page!"),r.default.createElement("p",null,"You can go ",r.default.createElement(a.Link,{back:!0},"back"),"."),r.default.createElement("p",null,"Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac habitasse platea dictumst."),r.default.createElement("p",null,"Fusce eros lectus, accumsan eget mi vel, iaculis tincidunt felis. Nulla tincidunt pharetra sagittis. Fusce in felis eros. Nulla sit amet aliquam lorem, et gravida ipsum. Mauris consectetur nisl non sollicitudin tristique. Praesent vitae metus ac quam rhoncus mattis vel et nisi. Aenean aliquet, felis quis dignissim iaculis, lectus quam tincidunt ligula, et venenatis turpis risus sed lorem. Morbi eu metus elit. Ut vel diam dolor.")))}},92:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),a=n(17);t.default=function(){return r.default.createElement(a.Page,null,r.default.createElement(a.Navbar,{title:"Not found",backLink:"Back"}),r.default.createElement(a.Block,{strong:!0},r.default.createElement("p",null,"Sorry"),r.default.createElement("p",null,"Requested content not found.")))}},93:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=l(n(2)),o=n(17);l(n(94));function l(e){return e&&e.__esModule?e:{default:e}}var i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={contactaddress:"TODO"},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state.contactaddress;return a.default.createElement(o.Popup,{id:"popup",tabletFullscreen:!1},a.default.createElement(o.View,null,a.default.createElement(o.Page,null,a.default.createElement(o.Navbar,{title:"About"},a.default.createElement(o.NavRight,null,a.default.createElement(o.Link,{popupClose:!0},a.default.createElement(o.Icon,{f7:"close"})))),a.default.createElement(o.Block,null,a.default.createElement(o.BlockTitle,null,"View artworks and provide feedback!"),a.default.createElement(o.Block,null,"An art installation by researchers from the",a.default.createElement("br",null),"Center for Ubiquitous Computing",a.default.createElement("br",null),"University of Oulu"),a.default.createElement(o.BlockTitle,null,"How it works"),a.default.createElement(o.Block,null,"We invited artists to showcase their artworks in this installation. One artwork is showing on the main screen in front of you. Each artwork is accompanied with a way for you to provide feedback, as chosen by the respective artist.",a.default.createElement("br",null),"All submitted feedback is sent to the respective artists."),a.default.createElement(o.BlockTitle,null,"Privacy Policy"),a.default.createElement(o.Block,null,"Your data will be shared with the artist who uploaded the artwork to this installation.",a.default.createElement("br",null),"For further question, contact ",e,".")))))}}]),t}();t.default=i}},[[66,2,1]]]);