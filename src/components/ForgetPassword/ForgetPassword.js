import React, { Component } from 'react';

import './ForgetPassword.css';
import Footer from '../Natureraise/Footer/Footer';
import HeaderInnerNavbar from '../Natureraise/HeaderNavbar/HeaderNavbar';
import { Container, Col, Row, Button, Jumbotron, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ForgetPassword extends Component {
    render() {
        return (
            <section>
                <HeaderInnerNavbar />
                <div id="ForgetPassword_Main_Section">
                    <Jumbotron fluid className="text-center">
                        <Container >
                            <h4> Account</h4>
                            <div className="ForgetPassword_Inner_Section" >
                                <ul className="Inner_nav">
                                    <Link to="/">
                                        <li><a><i className="fa fa-sign-in"></i> Home</a></li>
                                    </Link>
                                    <Link to="/SignIn">
                                        <li><a><i class="fa fa-user-circle-o" ></i> SignIn</a></li>

                                    </Link>

                                </ul>
                            </div>
                        </Container>
                    </Jumbotron>
                </div>
                <div className="ForgetPassword_Section">
                    <Container>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}  >
                                <Form>
                                    <h3>Reset your password</h3>
                                    <p>We will send you an email to reset your password.</p>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter FirstName" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="SignIn">
                                        Submit</Button>
                                    <Link to="/SignIn">
                                        <h6 className="Cancel_Text">Cancel </h6>
                                    </Link>
                                </Form>
                            </Col>
                            <Col md={3}></Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </section>
        );
    }
}
