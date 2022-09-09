import React, { Component } from "react";
import { Helmet } from "react-helmet-async";
import "./PrivacyPolicy.css";
import { Container, Row, Col } from "react-bootstrap";

import PrivacyComp from "./constant/PrivacyPolicy/PrivacyPolicyComp";

export default class PrivacyPolicy extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Privacy Policy | Natureraise</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta
            property="og:description"
            content="Natureraise Terms & Privay Policy Page"
          />
        </Helmet>

        <div>
          <section>
            <Container>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <div className="privacy_wrap">
                    <PrivacyComp />
                    <PrivacyComp />
                    <PrivacyComp />
                    <PrivacyComp />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </>
    );
  }
}
