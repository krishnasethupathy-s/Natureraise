import React, { Component } from "react";

import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import jwtDecode from "jwt-decode";

import PageLoading from "../constants/PageLoader/PageLoading";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import * as UserActions from "../Natureraise/store/actions/User/UserActions";
import { getCartList } from "../Natureraise/store/actions/Product/ProductActions";
import "./SignIn.css";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      password: "",
      client_ip: "",
      redirect: false,
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    // localStorage.clear();
    this.getIP().then((data) => {
      this.setState({ client_ip: data["ip"] });
    });
    setTimeout(() => {
      this.setState({ isLoadingComplete: false });
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
    const { state } = this.props.location;
    console.log(state);
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
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
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
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, client_ip } = this.state;

    const localCart = this.props.cart_items.map((item) => ({
      item_id: item.id,
      quantity: item.cart_list,
      pincode: item.pincode,
    }));
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    await this.props.dispatch(
      UserActions.SignInAction(username, password, client_ip, localCart)
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
    const localCart = this.props.cart_items.map((item) => ({
      item_id: item.id,
      quantity: item.cart_list,
      pincode: item.pincode,
    }));

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

    const localCart = this.props.cart_items.map((item) => ({
      item_id: item.id,
      quantity: item.cart_list,
      pincode: item.pincode,
    }));

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
      <section>
        <PageLoading
          isLoadingComplete={
            this.state.isLoadingComplete || this.props.is_loading
          }
        />
        <HeaderInnerNavbar />

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

                  <Form name="form" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Your Email *"
                        name="username"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Your Password *"
                        name="password"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="SignIn">
                      Login
                    </Button>

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
    cart_items: state.ProductActions.cart.items,
    is_loading: state.ProductActions.is_loading,
  };
};
// export default Addproducts;
export default connect(mapStateToProps, null)(SignIn);
