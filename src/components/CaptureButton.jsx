import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'


const CaptureButton = (props) => (
        <Block>
          <Row>
            <Col width="20"></Col>
            <Col width="60">
              <Button onClick={props.onCaptureClick} outline>
                <Icon f7={props.icon} / > {props.buttonText}
              </Button>
            </Col>
            <Col width="20"></Col>
          </Row>
        </Block>
    )

export default CaptureButton;
