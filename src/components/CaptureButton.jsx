import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'

const CaptureButton = (props) => (
        <Block>
              <Button onClick={props.onCaptureClick} outline big>
                <Icon f7={props.icon} / > {props.buttonText}
              </Button>
        </Block>
    )

export default CaptureButton;
