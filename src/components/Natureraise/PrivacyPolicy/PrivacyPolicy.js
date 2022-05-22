import React, { Component } from "react";
import "./PrivacyPolicy.css";
import { Container, Row, Col, } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import Footer from "../Footer/Footer";
import PrivacyComp from './constant/PrivacyPolicy/PrivacyPolicyComp';



export default class PrivacyPolicy extends Component {

componentDidMount() {
  window.scrollTo(0,0);
}

  render() {
    return (
  <div>
      <HeaderNavbar />
    
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

      <Footer />
  </div>
    );
  }
}
