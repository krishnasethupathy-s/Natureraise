import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import "./About.css";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";

export default class About extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>About | Natureraise</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="About Natureraise" />
        </Helmet>
        <div>
          <HeaderNavbar />

          <div className="about_banner">
            <div className="about_overlay"></div>
            <div className="about_title">
              <h3>About Us</h3>
              <div className="about_subtitles">
                {" "}
                <small>Home</small>{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
                <small>About us</small>
              </div>
            </div>
          </div>

          <section className="section_padding_top_bottom" id="">
            <Container>
              <Row>
                <Col md={6} lg={7}>
                  <div className="about_wrapper">
                    <div className="about_image1">
                      <img
                        src={images.about_image1}
                        alt="what we offe"
                        className="img-fluid"
                      />
                    </div>
                    <div className="about_image2">
                      <img
                        src={images.about_image2}
                        alt="what we offe"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={5} className="padding_top_bottom">
                  <div>
                    <div className="subtitle">
                      <span>About Us</span>
                      <h3>The Best Solution of Wind & Solar Energy</h3>
                      <p>
                        For future, energy solar industry would definitely be
                        the top demand option due to its superior in terms of
                        availability, cost effectiveness, accessibility,
                        capacity, and efficiency compared to other renewable
                        energy sources. By overhauling the importance and
                        requirements of solar to create a solar tech company,
                        Natureraise was formed in 2019. Natureraise is one of
                        the foremost solar energy companies in India having
                        established its roots offline in the industry in the
                        year 2010.
                      </p>
                    </div>
                    <span className="double_line_common">About </span>

                    <div className="about_counsultancy">
                      <div className="about_counsultancy_button">
                        <p>Free Counsultancy</p>
                      </div>

                      <div className="about_counsult_icons">
                        <i
                          className="fa fa-volume-control-phone"
                          aria-hidden="true"
                        ></i>{" "}
                        <p>+91 9606632288</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section
            className="project_information section_padding_top_bottom"
            id="project_information"
          >
            <Container>
              <Row>
                <Col md={3}>
                  <div className="project_information_alignment">
                    <img
                      src={images.goal}
                      alt="what we offe"
                      className="img-fluid"
                    />

                    <h3>30+</h3>
                    <p>Years of Experience</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="project_information_alignment">
                    <img
                      src={images.happy}
                      alt="what we offe"
                      className="img-fluid"
                    />

                    <h3>589</h3>
                    <p>Happy Clients</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="project_information_alignment">
                    <img
                      src={images.rank}
                      alt="what we offe"
                      className="img-fluid"
                    />

                    <h3>256</h3>
                    <p>Project Done</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="project_information_alignment">
                    <img
                      src={images.deal}
                      alt="what we offe"
                      className="img-fluid"
                    />

                    <h3>47+</h3>
                    <p>Business Partners</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section
            className="steps_work section_padding_top_bottom"
            id="steps_work"
          >
            <Container>
              <Row>
                <Col md={12}>
                  <div className="steps_work_content">
                    <p>how we work</p>
                    <h4>Our Work Process</h4>
                    <p>
                      All functions including supply chain, value chain, project
                      scheduling, manufacturing, services and spares,
                      technology, R&D, etc. are integrated to give a complete
                      solutions package.
                    </p>
                  </div>

                  <span className="center_double_line">Steps </span>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 10, offset: 1 }}>
                  <Row className="mt-5">
                    <Col md={4}>
                      <div className="steps_card">
                        <p>STEP</p>
                        <span className="number_double_line">01</span>

                        <div className="steps_card_title">
                          <h4>Project Planing</h4>
                          <h6>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising.
                          </h6>
                        </div>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div className="steps_card steps_card_second">
                        <p>STEP</p>
                        <span className="number_double_line">02</span>

                        <div className="steps_card_title">
                          <h4>Research & Analysis</h4>
                          <h6>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising.
                          </h6>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="steps_card steps_card_third">
                        <p>STEP</p>
                        <span className="number_double_line">03</span>

                        <div className="steps_card_title">
                          <h4>Make it Happen</h4>
                          <h6>
                            NatureRaise is among the world's leading renewable
                            energy solutions provider that is revolutionising.
                          </h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>

          <Footer />
        </div>
      </>
    );
  }
}
