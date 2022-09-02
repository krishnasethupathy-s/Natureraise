import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";

import PageLoading from "../../constants/PageLoader/PageLoading";

const PaymentFailure = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <HeaderNavbar />
      <PageLoading isLoadingComplete={isLoading} />
      <div className="check_out_no_record_wrapper">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }} lg={8}>
              {state.state && (
                <div className="check_out_no_record_cards">
                  {/* <img
                  src="https://image.flaticon.com/icons/png/512/102/102661.png"
                  alt="cart"
                /> */}
                  <p>Order failure</p>
                  <span>{state.state.description}</span>
                  <br />
                  <span>
                    If any money deducted , wait 3-4 days before reach out to
                    your bank / contact us for information.
                  </span>
                  <Link to="/CheckOut">
                    <div className="check_out_shopping_button">
                      <h6>Try Again</h6>
                    </div>
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PaymentFailure;
