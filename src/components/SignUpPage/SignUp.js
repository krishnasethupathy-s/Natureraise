import React, { Component } from "react";

import "./SignUp.css";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageLoading from "../constants/PageLoader/PageLoading";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as UserActions from "../Natureraise/store/actions/User/UserActions";

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
    localStorage.clear();
    this.getIP().then((data) => {
      this.setState({ client_ip: data["ip"] });
    });
    setTimeout(() => {
      this.setState({ isLoadingComplete: false });
    }, 1000);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async getIP() {
    const response = await fetch("https://api64.ipify.org/?format=json");
    const data = await response.json();
    return data;
  }
  componentDidUpdate = () => {
    if (this.props.message === "SUCCESS") {
      this.props.dispatch(UserActions.empty_message());
      this.navigate_function();
    } else if (this.props.message === "0") {
      toast.error("Already Existing Data, ");
      this.props.dispatch(UserActions.empty_message());
    } else if (this.props.message === "error") {
      toast.error(this.props.error_msg);
      this.props.dispatch(UserActions.empty_message());
    } else if (this.props.message === "catch error") {
      //toast.error(this.props.error_msg);
    } else {
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      mobile_number1,
      email_id,
      password,
      client_ip,
    } = this.state;
    await this.props.dispatch(
      UserActions.register(
        first_name,
        last_name,
        mobile_number1,
        email_id,
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
      <section>
        <PageLoading isLoadingComplete={this.state.isLoadingComplete} />

        <HeaderInnerNavbar />

        <div id="SignUp_Main_Section">
          <Jumbotron fluid className="text-center">
            <Container>
              <div className="SignUp_Section">
                <ul className="Inner_nav">
                  <Link to="/">
                    <li>
                      <a>
                        <i className="fa fa-sign-in"></i> Home
                      </a>
                    </li>
                  </Link>
                  <Link to="/SignIn">
                    <li>
                      <a>
                        <i class="fa fa-user-circle-o"></i> SignIn
                      </a>
                    </li>
                  </Link>
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

                  <Form name="form" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="FirstName">
                      <Form.Control
                        type="text"
                        placeholder="Your FirstName *"
                        name="first_name"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="LastName">
                      <Form.Control
                        type="text"
                        placeholder="Your LastName *"
                        name="last_name"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="Mobile">
                      <Form.Control
                        maxLength="10"
                        type="text"
                        placeholder="Your Mobile *"
                        name="mobile_number1"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="Email">
                      <Form.Control
                        type="text"
                        placeholder="Your Email *"
                        name="email_id"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Control
                        type="password"
                        placeholder="Your password *"
                        name="password"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="SignIn">
                      Register
                    </Button>
                    <Link to="/SignIn">
                      <h6 className="Sign_up_Text">SignIn Here</h6>
                    </Link>

                    {this.props.message}

                    {this.props.error_msg}
                  </Form>
                </div>
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
const mapStateToProps = (state) => {
  return {
    message: state.UserActions.message,
    error_msg: state.UserActions.error_msg,
  };
};
// export default Addproducts;
export default connect(mapStateToProps, null)(SignUp);
