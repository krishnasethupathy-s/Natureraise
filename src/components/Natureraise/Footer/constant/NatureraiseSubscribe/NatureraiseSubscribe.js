import React from "react";
import "./NatureraiseSubscribe.css";
import { Form } from "react-bootstrap";

const NatureraiseSubscribe = (props) => {
  return (
    <div className="footer_subscribe_wrapper">
      <h3>Subscribe</h3>
      <p>Subscribe to our newsletter! Stay always in touch!</p>
      <div className="form_subscribe">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label></Form.Label>
            <div>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
            <div className="email_subscribe">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </div>
            <Form.Text className="text-muted">
              * Don't worry, we don't spam.
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default NatureraiseSubscribe;
