import React, { Component } from "react";
import "./Contact.css";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";

import Footer from "../Footer/Footer";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import images from "../../constants/images";

export default class Contact extends Component {
  render() {
    return (
      <div>
        <HeaderNavbar />
        <div className="contact_banner">
          <div className="contact_overlay"></div>
          <div className="contact_title">
            <h3>Contact </h3>
            <div className="about_subtitles">
              {" "}
              <small>Home</small>{" "}
              <i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
              <small>Contact us</small>
            </div>
          </div>
        </div>

        <section
          className="contact_enquiry_form section_padding_top_bottom"
          id="contact_enquiry_form"
        >
          <Container>
            <Row>
              <Col md={3}>
                <div className="subtitle">
                  <span>get in touch</span>
                  <h3>Contacts</h3>
                </div>

                <div className="contact_enquiry_address">
                  <div className="contact_enquiry_wraper">
                    <h6>
                      {" "}
                      <img
                        src={images.pin}
                        alt="Natureraise"
                        className="contact_phone"
                      />
                      Natureraise Technologies Pvt Ltd, No:19,4th Cross,Opp
                      BIEC, Madarvara, Tumkur Road, Bangalore,karnataka-562162
                    </h6>
                  </div>
                  <div className="contact_enquiry_wraper">
                    <h6>
                      {" "}
                      <img
                        src={images.atrate}
                        alt="Natureraise"
                        className="contact_phone"
                      />
                      support@natureraise.in
                    </h6>
                  </div>
                  <div className="contact_enquiry_wraper">
                    <h6>
                      {" "}
                      <img
                        src={images.phone}
                        alt="Natureraise"
                        className="contact_phone"
                      />
                      +91 9606632288
                    </h6>
                  </div>
                </div>
                <div className="contact_wrapper_social">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/natureraisetechnologies/"
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/NatureriseT"
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/natureraise54/"
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCD2l9MJdYLndkIqJG5VHByw?disable_polymer=true"
                        target={"_blank"}
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <span className="contact_double">Contact</span>
              </Col>
              <Col md={9}>
                <div className="contact_enquiry_card">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control type="name" placeholder="Your Name *" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="email"
                            placeholder="Your Email *"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Your Mobile *"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Your Enquiry for *"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Your Comment *"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Button variant="primary " type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="common_margin_top_bottom">
          <Container>
            <Row>
              <Col md={12}>
                <iframe
                  src="https://www.google.com/maps/d/u/3/embed?mid=1oBaSd2d_A96qappGIcoLnofMEhMYnd2J"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  aria-hidden="false"
                  tabIndex="0"
                  title="location of Natureraise"
                ></iframe>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </div>
    );
  }
}
