import React, { Component } from "react";

import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet-async";
import { Formik } from "formik";
import * as Yup from "yup";

import PageLoading from "../constants/PageLoader/PageLoading";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import * as UserActions from "../Natureraise/store/actions/User/UserActions";
import {
  empty_message,
  getCartList,
} from "../Natureraise/store/actions/Product/ProductActions";
import "./SignIn.css";

const SingInSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid E-mail"),
  password: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long"),
});
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_ip: "",
      redirect: false,
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    this.props.dispatch(empty_message());
    this.props.dispatch(UserActions.empty_message());
    window.scrollTo(0, 0);
    // localStorage.clear();
    this.getIP().then((data) => {
      this.setState({ client_ip: data["ip"] });
    });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
    const { state } = this.props.location;
    console.log(state);
  }

  async getIP() {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    const response = await fetch("https://api64.ipify.org/?format=json");
    const data = await response.json();
    return data;
  }
  componentDidUpdate = () => {
    if (this.props.message === "CART_SUCCESS") {
      this.props.dispatch(UserActions.empty_message());
      // this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      this.navigate_function();
    } else if (this.props.error_msg === "Invalid Crediental") {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      toast.error(this.props.error_msg);
      this.props.dispatch(UserActions.empty_message());
    } else if (this.props.message === "0") {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      toast.error(this.props.error_msg);
      this.props.dispatch(UserActions.empty_message());
    }

    if (this.props.error_msg === "error") {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      this.props.dispatch(UserActions.empty_message());
      toast.error("Somthing went wrong , please try again");
    }
  };

  getLocalCart = () =>
    this.props.cart_items.map((item) => ({
      item_id: item.id,
      quantity: item.cart_list,
      pincode: item.pincode ?? "",
      product_price_id: item.product_price_id ?? "",
    }));

  handleSubmit = async (values) => {
    const { email, password } = values;
    const { client_ip } = this.state;

    const localCart = this.getLocalCart();
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    await this.props.dispatch(
      UserActions.SignInAction(email, password, client_ip, localCart)
    );
  };

  navigate_function = () => {
    const { state } = this.props.location;
    console.log(state);
    this.props.history.push("/");
    // return <Redirect exact to="/" />;
  };

  responseSuccessGoogle = (res) => {
    console.log(jwtDecode(res.credential));
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    const {
      given_name: first_name,
      family_name: last_name,
      email,
      sub: id,
      picture: image_address,
    } = jwtDecode(res.credential);
    const { client_ip } = this.state;
    const localCart = this.getLocalCart();

    this.props.dispatch(
      UserActions.LoginWithSocialID(
        "google",
        id,
        first_name,
        last_name,
        email,
        image_address,
        client_ip,
        localCart
      )
    );
  };

  responseErrorGoogle = (response) => {
    console.log(response);
  };

  responseSuccessFacebook = (res) => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    const { first_name, last_name, email, id, picture } = res;
    const image_address = picture.data.url;
    const { client_ip } = this.state;

    const localCart = this.getLocalCart();

    this.props.dispatch(
      UserActions.LoginWithSocialID(
        "facebook",
        id,
        first_name,
        last_name,
        email,
        image_address,
        client_ip,
        localCart
      )
    );
  };

  render() {
    // if (this.state.redirect) {
    //     return <Redirect to="/" />
    // }

    return (
      <>
        <Helmet>
          <title>Login | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="Natureraise Login Page" />
        </Helmet>
        <section>
          <div id="SignIn_Main_Section">
            <Jumbotron fluid className="text-center">
              <Container>
                <div className="SingIn_title_wrapper">
                  <div className="SignIn_Section">
                    <ul className="Inner_nav">
                      <li>
                        <Link to="/">
                          <i className="fa fa-sign-in"></i> Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/SignUp">
                          <i className="fa fa-user-circle-o"></i> SignUp
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Container>
            </Jumbotron>
          </div>
          <div className="SignIn_Form_Section">
            <Container>
              <Row>
                <Col md={3}></Col>

                <Col md={6}>
                  <span className="center_double_line">LOGIN </span>
                  <div className="form_card_details">
                    <h1> Login Here</h1>

                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={SingInSchema}
                      onSubmit={(values) => this.handleSubmit(values)}
                    >
                      {({
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <Form name="form" noValidate onSubmit={handleSubmit}>
                          <Form.Group controlId="formBasicEmail">
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
                          <Form.Group controlId="formBasicPassword">
                            <Form.Control
                              type="password"
                              placeholder="Your Password *"
                              name="password"
                              onChange={handleChange}
                              isInvalid={Boolean(
                                touched.password && errors.password
                              )}
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="text-left"
                            >
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Row className="justify-content-end mr-2">
                            <Link to="/ForgotPassword" className="text-dark">
                              Forgot Password?
                            </Link>
                          </Row>

                          <Button
                            variant="primary"
                            type="submit"
                            className="SignIn mt-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Login"}
                          </Button>
                        </Form>
                      )}
                    </Formik>

                    <div className="ortext ">
                      <h6>Or</h6>
                    </div>
                    <div>
                      <Row className="d-flex justify-content-center align-items-center">
                        <GoogleLogin
                          onSuccess={this.responseSuccessGoogle}
                          onError={() => {
                            console.log(
                              "Somthing went wrong, Please try again"
                            );
                          }}
                          useOneTap
                        />
                      </Row>
                      <Row className="d-flex justify-content-center align-items-center mt-2">
                        <FacebookLogin
                          appId="585181773318830"
                          fields="email, picture, first_name,last_name, id"
                          onSuccess={(response) => {
                            console.log("Login Success!", response);
                          }}
                          onFail={(error) => {
                            console.log("Login Failed!", error);
                          }}
                          onProfileSuccess={this.responseSuccessFacebook}
                          style={{
                            backgroundColor: "#4267b2",
                            color: "#fff",
                            fontSize: "14px",
                            padding: "10px 18px",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        />
                      </Row>
                    </div>

                    {/* <div className="sign_in_socialicons">
                      <ul>
                        <li>
                          <GoogleLogin
                            clientId="93793167500-omr4gb2sjr17c2gdcvejklp2dsd9m950.apps.googleusercontent.com"
                            render={(renderProps) => (
                              <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                              >
                                {" "}
                                <i
                                  className="fa fa-google"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                        </li> 
                    
                       <li>
                          <button
                          // onClick={renderProps.onClick}
                          // disabled={renderProps.disabled}
                          >
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </button>
                        </li> 
                        <li>
                           <button
                          // onClick={renderProps.onClick}
                          // disabled={renderProps.disabled}
                          >
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>
                          </button> 
                          
                        </li>
                      </ul>
                    </div> */}
                    <div className="Create_Account_Text">
                      <Link to="/SignUp">
                        <h6>Create account</h6>
                      </Link>
                      <Link to="/">
                        <h6>Return to Home</h6>
                      </Link>
                    </div>
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
    cart_items: state.ProductActions.cart.items,
    is_loading: state.ProductActions.is_loading,
  };
};
// export default Addproducts;
export default connect(mapStateToProps, null)(SignIn);
