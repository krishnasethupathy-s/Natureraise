import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./SecondOfferSection.css";

const SecondOfferSection = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12} xs={12}>
            <Row>
              {props.offersdata.map((deliverydata, delivery_id) => {
                return (
                  <Col md={4} lg={4} xl={4} key={delivery_id}>
                    <div>
                      <img
                        src="https://rukminim1.flixcart.com/flap/480/480/image/7f5aa61dc593dbd7.jpg?q=50"
                        alt="natureraise"
                        className="img-fluid w-100"
                      />
                    </div>
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
