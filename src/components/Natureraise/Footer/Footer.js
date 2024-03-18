import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Footer.css";
import NatureraiseAbout from "./constant/NatureraiseAbout/NatureraiseAbout";
import NatureraiseContact from "./constant/NatureraiseContact/NatureraiseContact";
import NatureraiseNavigation from "./constant/NatureraiseNavigation/NatureraiseNavigation";
import NatureraiseSubscribe from "./constant/NatureraiseSubscribe/NatureraiseSubscribe";

import NatureraiseSocial from "./constant/NatureraiseSocial/NatureraiseSocial";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer_wrapper">
        <div>
          <Container>
            <Row>
              <Col md={3}>
                <NatureraiseAbout />
              </Col>
              <Col md={3}>
                <NatureraiseContact />
              </Col>
              <Col md={3}>
                <NatureraiseNavigation />
              </Col>
              <Col md={3}>
                <NatureraiseSubscribe />
              </Col>
            </Row>
            <Row className="footer_copy_border">
              <div className="footer_copy_writes">
                <p>
                  Copyright © 2022 Naturesave by Natureraise. All Rights
                  Reserved
                </p>
              </div>
            </Row>
          </Container>
        </div>
        <div>
          <NatureraiseSocial />
        </div>
      </div>
    );
  }
}
