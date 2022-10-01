import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

import "./SignUp.css";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLoading from "../constants/PageLoader/PageLoading";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as UserActions from "../Natureraise/store/actions/User/UserActions";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid E-mail"),
  password: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long"),
  first_name: Yup.string().required("Required").min(2, "Atleast 2 characters"),
  last_name: Yup.string().required("Required"),
  mobile_number1: Yup.number().required("Required"),
});
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      mobile_number1: "",
      email_id: "",
      password: "",
      client_ip: "",
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(UserActions.empty_message());
    localStorage.clear();
    this.getIP().then((data) => {
      this.setState({ client_ip: data["ip"] });
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    });
  }

  async getIP() {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    const response = await fetch("https://api64.ipify.org/?format=json");
    const data = await response.json();
    return data;
  }
  componentDidUpdate = () => {
    if (this.props.message === "SUCCESS") {
      this.props.dispatch(UserActions.empty_message());
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      this.navigate_function();
    } else if (this.props.message === "0") {
      toast.error("User Already Existing ");
      this.props.dispatch(UserActions.empty_message());
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    } else if (this.props.message === "error") {
      toast.error(this.props.error_msg);
      this.props.dispatch(UserActions.empty_message());
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    } else if (this.props.message === "catch error") {
      toast.error("Somthing went wrong, Please try again");
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    } else {
    }
  };

  handleRegisterSubmit = async (values) => {
    const { first_name, last_name, mobile_number1, email, password } = values;
    const { client_ip } = this.state;
    await this.props.dispatch(
      UserActions.register(
        first_name,
        last_name,
        mobile_number1,
        email,
        password,
        client_ip
      )
    );
  };

  navigate_function = () => {
    this.props.history.push("/SignIn");
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Signup | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="User Registration page" />
        </Helmet>

        <section>
          <div id="SignUp_Main_Section">
            <Jumbotron fluid className="text-center">
              <Container>
                <div className="SignUp_Section">
                  <ul className="Inner_nav">
                    <li>
                      <Link to="/">
                        <i className="fa fa-sign-in"></i> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/SignIn">
                        <i className="fa fa-user-circle-o"></i> SignIn
                      </Link>
                    </li>
                  </ul>
                </div>
              </Container>
            </Jumbotron>
          </div>
          <div className="SignUp_Form_Section">
            <Container>
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                  <span className="center_double_line">SIGN Up </span>
                  <div className="form_card_details">
                    <h1>Sign Up</h1>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                        first_name: "",
                        last_name: "",
                        mobile_number1: "",
                      }}
                      validationSchema={SignupSchema}
                      onSubmit={(values) => this.handleRegisterSubmit(values)}
                    >
                      {({
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <Form name="form" noValidate onSubmit={handleSubmit}>
                          <Form.Group controlId="FirstName">
                            <Form.Control
                              type="text"
                              placeholder="Your FirstName *"
                              name="first_name"
                              onChange={handleChange}
                              isInvalid={Boolean(
                                errors.first_name && touched.first_name
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.first_name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="LastName">
                            <Form.Control
                              type="text"
                              placeholder="Your LastName *"
                              name="last_name"
                              onChange={handleChange}
                              isInvalid={Boolean(
                                errors.last_name && touched.last_name
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.last_name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="Mobile">
                            <Form.Control
                              maxLength="10"
                              type="text"
                              placeholder="Your Mobile *"
                              name="mobile_number1"
                              onChange={handleChange}
                              isInvalid={Boolean(
                                errors.mobile_number1 && touched.mobile_number1
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.mobile_number1}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="Email">
                            <Form.Control
                              type="text"
                              placeholder="Your Email *"
                              name="email"
                              onChange={handleChange}
                              isInvalid={Boolean(errors.email && touched.email)}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="password">
                            <Form.Control
                              type="password"
                              placeholder="Your password *"
                              name="password"
                              onChange={handleChange}
                              isInvalid={Boolean(
                                errors.password && touched.password
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Button
                            variant="primary"
                            type="submit"
                            className="SignIn"
                          >
                            Register
                          </Button>
                        </Form>
                      )}
                    </Formik>
                    <Link to="/SignIn">
                      <h6 className="Sign_up_Text">SignIn Here</h6>
                    </Link>

                    {this.props.message}

                    {this.props.error_msg}
                  </div>
                </Col>
                <Col md={3}></Col>
              </Row>
            </Container>
          </div>
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.UserActions.message,
    error_msg: state.UserActions.error_msg,
  };
};
// export default Addproducts;
export default connect(mapStateToProps, null)(SignUp);
