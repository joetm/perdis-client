import React from 'react'
import { Block, Row, Col, Button, Icon } from 'framework7-react'

/*
          <Row>
            <Col width="10"></Col>
            <Col width="80">

            </Col>
            <Col width="10"></Col>
          </Row>
*/

const CaptureButton = (props) => (
        <Block>
              <Button onClick={props.onCaptureClick} outline>
                <Icon f7={props.icon} / > {props.buttonText}
              </Button>
        </Block>
    )

export default CaptureButton;
