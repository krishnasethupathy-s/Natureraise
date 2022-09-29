import React, { Component } from "react";
import { Helmet } from "react-helmet-async";

import "./Faq.css";
import { Accordion, Col, Row, Card, Form, Button } from "react-bootstrap";
import Tollfree from "../constants/TollFree/TollFree";
import { Faq_data } from "../constants/AccountData";
import images from "../constants/images";

export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      faq_array: Faq_data,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleViewBtnClick = (id) => {
    let { faq_array } = this.state;
    for (var i = 0; i < faq_array.length; i++) {
      if (faq_array[i].id === id) {
        faq_array[i].status = "1";
      } else {
        faq_array[i].status = "0";
      }
    }
    this.setState({ faq_array: faq_array });
  };
  render() {
    return (
      <>
        <Helmet>
          <title>FAQ | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="Natureraise FAQ Page" />
        </Helmet>

        <section className="faq_section" id="faq_section">
          <div className="faq_banner">
            <div className="faq_overlay"></div>
            <div className="faq_title">
              <h3>Faq</h3>
            </div>
          </div>

          <div className="frequent_section section_padding_top_bottom ">
            <div className="auto-container">
              <Row>
                <Col md={12}>
                  <div>
                    <div className="steps_work_content">
                      <p>some questions</p>
                      <h4>Frequently Asked Questions</h4>
                      <p>
                        All functions including supply chain, value chain,
                        project scheduling, manufacturing, services and spares,
                        technology, R&D, etc. are integrated to give a complete
                        solutions package.
                      </p>
                    </div>

                    <span className="center_double_line">FAQ</span>
                  </div>
                  <div>
                    <Accordion defaultActiveKey="1">
                      {Faq_data.map((data, index) => {
                        return (
                          <div key={index} className="faq_collapse_card">
                            <Card>
                              <Accordion.Toggle
                                onClick={() => this.handleViewBtnClick(data.id)}
                                as={Card.Header}
                                className={
                                  data.status === "0"
                                    ? "faq_background_color "
                                    : "faq_background_color_active"
                                }
                                eventKey={data.event_id}
                              >
                                <div
                                  className={
                                    data.status === "0"
                                      ? "faq_collapse faq_color "
                                      : "faq_collapse faq_active"
                                  }
                                >
                                  {data.name}
                                  <i
                                    onClick={() =>
                                      this.handleViewBtnClick(data.id)
                                    }
                                    className={
                                      data.status === "0"
                                        ? "fa fa-plus-circle faq_color"
                                        : "fa fa-minus-circle faq_active "
                                    }
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={data.event_id}>
                                <Card.Body>{data.description}</Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </div>
                        );
                      })}
                    </Accordion>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <Tollfree />

          <section className="faq_form_section">
            <div className="auto-container">
              <Row>
                <Col md={6}>
                  <div className="faq_form_padding">
                    <h3 class="">
                      Ask about <span class="accent-color">Natureraise</span>
                    </h3>
                    <p>
                      Temporibus autem quibusdam et aut officiis debitis is aut
                      rerum necessitatibuse in saepes eveniet ut etes seo lage
                      voluptates repudiandae sint et molestiae non mes for
                      Creating futures through building pres Creating
                      preservation etes from quibusdam barcelona.
                    </p>

                    <div className="faq_form_top">
                      <Form className="">
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                              <Form.Control
                                type="text"
                                placeholder="Your Name *"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                              <Form.Control
                                type="Email"
                                placeholder="Your Mail *"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control
                                as="textarea"
                                placeholder="Comments *"
                                rows={3}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button variant="success call_button_size">
                          Submit Now
                        </Button>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <section
            className="faq_support_section section_padding_top_bottom"
            id="faq_support_section"
          >
            <div className="auto-container">
              <Row>
                <Col md={12}>
                  <div className="steps_work_content">
                    <p>quick support</p>
                    <h4>We Can Help You</h4>
                    <p>
                      All functions including supply chain, value chain, project
                      scheduling, manufacturing, services and spares,
                      technology, R&D, etc. are integrated to give a complete
                      solutions package.
                    </p>
                  </div>

                  <span className="center_double_line">SUPPORT</span>
                </Col>
              </Row>

              <Row>
                <Col md={1}></Col>

                <Col md={10}>
                  <Row>
                    <Col md={4}>
                      <div className="faq_support_card">
                        <div className="faq_support_icons">
                          <div className="faq_support_wrapper">
                            <img
                              src={images.delivery}
                              alt="Natureraise"
                              className="contact_phone"
                            />
                          </div>
                        </div>
                        <div className="faq_support_title">
                          <h3>Online Support</h3>

                          <p>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising
                          </p>
                        </div>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="faq_support_card">
                        <div className="faq_support_icons">
                          <div className="faq_support_wrapper">
                            <img
                              src={images.delivery}
                              alt="Natureraise"
                              className="contact_phone"
                            />
                          </div>
                        </div>
                        <div className="faq_support_title">
                          <h3>Community</h3>

                          <p>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="faq_support_card">
                        <div className="faq_support_icons">
                          <div className="faq_support_wrapper">
                            <img
                              src={images.delivery}
                              alt="Natureraise"
                              className="contact_phone"
                            />
                          </div>
                        </div>
                        <div className="faq_support_title">
                          <h3>News & Updates</h3>
                          <p>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={1}></Col>
              </Row>
            </div>
          </section>
        </section>
      </>
    );
  }
}
