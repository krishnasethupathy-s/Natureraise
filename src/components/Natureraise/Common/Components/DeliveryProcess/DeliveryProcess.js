import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./DeliveryProcess.css";

const DeliveryProcess = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12} xs={12}>
            <div className="delivery-process-wrapper">
              {props.deliveryprocess.map((deliverydata, delivery_id) => {
                return (
                  <Col
                    md={2}
                    lg={2}
                    xl={2}
                    xs={6}
                    key={delivery_id}
                    className="delivery-process"
                  >
                    <img
                      src={deliverydata.process_images}
                      className="img-fluid"
                      alt="natureraise"
                    />
                    <p>{deliverydata.title}</p>
                  </Col>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DeliveryProcess;
