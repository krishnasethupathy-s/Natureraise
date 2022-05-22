import React, { Component } from 'react';
import {Container, Row, Col, Form, Button } from "react-bootstrap";
import './TollFree.css'
export default class TollFree extends Component {
  render() {
    return (
      
        <section>
        <Container>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={4} className="consultancy_toll">
               <div className="consultancy_content">
               <h1>Call Us Toll Free</h1>
                  <p>9606632288</p>
               </div>
                </Col>
                <Col md={8} className="consultancy_form">
                  <Row>
                    <Col md={4}>
                    <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Your Name *" />
                   </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control type="email" placeholder="Your Email *" />
                    </Form.Group>
                      </Col>
                      <Col md={4}>
                      <Button variant="primary get_it_now" type="submit">
                        Get It Now
                       </Button>
                      </Col>
                  </Row>
                

                </Col>
              </Row>

            </Col>
          </Row>
        </Container>
      </section>
     
    );
  }
}
