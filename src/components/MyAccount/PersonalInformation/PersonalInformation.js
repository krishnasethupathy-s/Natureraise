import React, { Component } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import "./PersonalInformation.css";
import * as CustomerAddress from "../../Natureraise/store/actions/User/UserActions";
import * as AddCustomerAddress from "../../Natureraise/store/actions/UserProfile/CustomerAddress";

import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import images from "../../constants/images";
import PageLoading from "../../constants/PageLoader/PageLoading";

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      mobile_number1: localStorage.getItem("mobile_number1"),
      email_id: localStorage.getItem("email_id"),
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ first_name: localStorage.getItem("first_name") });
    this.setState({ last_name: localStorage.getItem("last_name") });
    this.setState({ mobile_number1: localStorage.getItem("mobile_number1") });
    this.setState({ email_id: localStorage.getItem("email_id") });

    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate = async () => {
    if (this.props.message === "CUSTOMER_PROFILE_UPDATE") {
      let success = await this.props.dispatch(
        AddCustomerAddress.empty_message()
      );
      if (success) {
        toast.success("Profile Update");
        this.componentDidMount();
      }
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, mobile_number1, email_id } = this.state;
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    let customerUpdate = await this.props.dispatch(
      CustomerAddress.CustomerUpdation(
        first_name,
        last_name,
        mobile_number1,
        email_id
      )
    );
    if (customerUpdate) {
      this.setState({ isLoadingComplete: false });
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Profile | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="User's can their profile" />
        </Helmet>
        <div className="personal-information-wrapper">
          <Container>
            <Row>
              <Col md={12} className="Personal_Information_Heading">
                <h6>Personal Information</h6>
                <Form name="form" onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>First</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.first_name}
                          placeholder="Enter First Name"
                          name="first_name"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          value={this.state.last_name}
                          placeholder="Enter Last Name"
                          name="last_name"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Label>Email</Form.Label>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          value={this.state.email_id}
                          placeholder="Enter email"
                          name="email_id"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Mobile</Form.Label>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          maxLength="10"
                          value={this.state.mobile_number1}
                          placeholder="Enter Mobile Number"
                          name="mobile_number1"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} className="Mobile_Button_container">
                      <div className="Submit_Button_Section">
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="MyAccount_Update_Button"
                        >
                          Update
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <img
                      src={images.Account_Bottom}
                      alt="RealEsate"
                      className="img-fluid w-100"
                    />
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.AddCustomerAddress.message,
    error_msg: state.AddCustomerAddress.error_msg,
    is_loading: state.ProductActions.is_loading,
  };
};

export default connect(mapStateToProps, null)(PersonalInformation);
