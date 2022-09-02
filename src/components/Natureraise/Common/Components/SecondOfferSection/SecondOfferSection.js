import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./SecondOfferSection.css";

const SecondOfferSection = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12} xs={12}>
            <Row>
              {props.offersdata.map((style) => {
                return (
                  <Col md={4} lg={4} xl={4} key={style.id}>
                    <Link to={style.description}>
                      <div className="offer-banner-wrap">
                        <picture>
                          <img
                            src={style.image_address}
                            alt="natureraise"
                            className="img-fluid "
                          />
                        </picture>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SecondOfferSection;
