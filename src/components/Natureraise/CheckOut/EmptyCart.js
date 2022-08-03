import React from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

const EmptyCart = () => {
  return (
    <div className="check_out_no_record_wrapper">
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }} lg={8}>
            <div className="check_out_no_record_cards">
              <img
                src="https://cdn-icons-png.flaticon.com/512/102/102661.png"
                alt="cart"
              />
              <p>Your Cart is Empty</p>
              <span>Add something to make me happy :)</span>
              <Link to="/">
                <div className="check_out_shopping_button">
                  <h6>Continue Shopping</h6>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EmptyCart;
