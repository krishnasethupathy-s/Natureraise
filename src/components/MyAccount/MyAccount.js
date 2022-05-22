import React, { Component } from "react";
import "./MyAccount.css";
import Footer from '../Natureraise/Footer/Footer';
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import ManageAddress from "./ManageAddress/ManageAddress";
import GstInformation from "./GstInformation/GstInformation";
import { Container, Col, Row, Jumbotron, } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as AddCustomerAddress from "../Natureraise/store/actions/UserProfile/CustomerAddress";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PageLoading from "../constants/PageLoader/PageLoading";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      profile_information: true,
      manage_infromation: false,
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      client_ip: "",
      isLoadingComplete: true,
      propery_list: [],
      gst_information: false,
      order_information: false,
    };
  }

  Logout_Function = () => {
    localStorage.clear();
    this.props.history.push('/')
  };



  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ first_name: localStorage.getItem("first_name") });
    this.setState({ last_name: localStorage.getItem("last_name") });
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  }


  componentDidUpdate = async () => {
    if (this.props.message === "CUSTOMER_PROFILE_UPDATE") {
      let success = await this.props.dispatch(AddCustomerAddress.empty_message());
      if (success) {
        toast.success("Profile Update");
        this.componentDidMount();
        this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      }
    }
  };

  handleViewBtnClick = () => {
    this.setState((prevState) => ({
      setOpen: !prevState.setOpen,
    }));

    this.setState({ state: "" });
  };

  handleViewBtnClickAccount = () => {
    this.setState({
      profile_information: true,
      manage_infromation: false,
      gst_information: false,
      order_information: false,
    });
  };

  handleViewBtnClickMange = () => {
    this.setState({
      profile_information: false,
      manage_infromation: true,
      gst_information: false,
      order_information: false,
    });
  };

  handleViewBtnClickGst = () => {
    this.setState({
      profile_information: false,
      manage_infromation: false,
      gst_information: true,
      order_information: false,
    });
  };

  handleViewBtnClickOrder = () => {
    this.setState({
      profile_information: false,
      manage_infromation: false,
      gst_information: false,
      order_information: true,
    });
  };

  render() {
    return (
      <React.Fragment>
        <PageLoading isLoadingComplete={this.props.is_loading} />
        <section>
          <HeaderInnerNavbar />
          <div id="SignIn_Main_Section">
            <Jumbotron fluid className="text-center">
              <Container>
                <h4>My Account</h4>
                <div className="SignIn_Section">
                  <ul className="Inner_nav">
                    <li>
                      <a href="#home">
                        <i className="fa fa-sign-in"></i> Home
                    </a>
                    </li>
                    <Link to="/SignIn">
                      <li>
                        <a href="#about">
                          <i className="fa fa-user-circle-o"></i> MyAccount
                      </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </Container>
            </Jumbotron>
          </div>

          <section id="My_Profile_Account_Section">
            <Container>
              <Row>
                <Col md={3}>
                  <div className="mb-2 My_Account_Basic_Details">
                    <div className="My_Account_Profile_Image">
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="Amisuzi RealEstate"
                      />
                    </div>

                    <div>
                      <h6 className="Padding_left">Hello</h6>
                      {localStorage.getItem("Authorization") === null ? (
                        <h6 className="Padding_left"> </h6>
                      ) : (
                        <h6 className="Padding_left">
                          {this.state.first_name}{" "}
                          {this.state.last_name}
                        </h6>
                      )}
                    </div>
                  </div>
                  {/* <div className="mb-1 My_Account_Basic_Details">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  <div className="My_Account_Heading_Section ">
                    <h6 className="My_Account_Heading_Text">Reward Points</h6>
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </div>
                </div> */}
                  <div className="mb-1 My_Account_Basic_Details">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    <div className="My_Account_Heading_Section ">
                      <h6 className="My_Account_Heading_Text">Account</h6>
                    </div>
                  </div>
                  <div className="mb-1 My_Account_Basic_Details" >
                    <div className="My_Account_Heading_Section ">
                      <h6
                        className={this.state.profile_information ? 'MyAccount_SubHeading active_background' : 'MyAccount_SubHeading'}
                        onClick={() => this.handleViewBtnClickAccount()}
                      >
                        Profile Information
                    </h6>
                      <i
                        className="fa fa-caret-right"

                        aria-hidden="true"
                        onClick={() => this.handleViewBtnClickAccount()}
                      ></i>
                    </div>
                  </div>
                  <div className="mb-1 My_Account_Basic_Details">
                    <div className="My_Account_Heading_Section ">
                      <h6
                        className={this.state.manage_infromation ? 'MyAccount_SubHeading active_background' : 'MyAccount_SubHeading'}
                        onClick={() => this.handleViewBtnClickMange()}
                      >
                        Manage Address
                    </h6>
                      <i
                        className="fa fa-caret-right"
                        aria-hidden="true"
                        onClick={() => this.handleViewBtnClickGst()}
                      ></i>
                    </div>
                  </div>

                  <div className="mb-1 My_Account_Basic_Details">
                    <div className="My_Account_Heading_Section ">
                      <h6
                        className={this.state.gst_information ? 'MyAccount_SubHeading active_background' : 'MyAccount_SubHeading'}
                        onClick={() => this.handleViewBtnClickGst()}
                      >
                        Gst Information
                    </h6>
                      <i
                        className="fa fa-caret-right"
                        aria-hidden="true"
                        onClick={() => this.handleViewBtnClickGst()}
                      ></i>
                    </div>
                  </div>

                  <div className="mb-1 My_Account_Basic_Details">
                    <div className="My_Account_Heading_Section ">
                      <h6
                        className={this.state.order_information ? 'MyAccount_SubHeading active_background' : 'MyAccount_SubHeading'}
                        onClick={() => this.handleViewBtnClickOrder()}
                      >
                        Orders
                    </h6>
                      <i
                        className="fa fa-caret-right"
                        aria-hidden="true"
                        onClick={() => this.handleViewBtnClickOrder()}
                      ></i>
                    </div>
                  </div>

                  <div className="My_Account_Basic_Details">
                    <i
                      onClick={() => {
                        this.Logout_Function();
                      }}
                      className="fa fa-sign-out"
                      aria-hidden="true"
                    ></i>
                    <div className="My_Account_Heading_Section ">
                      <h6
                        onClick={() => {
                          this.Logout_Function();
                        }}
                        className="My_Account_Heading_Text"
                      >
                        Log Out
                      </h6>
                    </div>
                  </div>
                </Col>
                {this.state.profile_information === true ? (
                  <Col md={9} className="My_Account_Profile_Details">
                    <PersonalInformation />
                  </Col>
                ) : null}
                {this.state.manage_infromation === true ? (
                  <Col md={9} className="MyAddress_Details_Section">
                    <ManageAddress />
                  </Col>
                ) : null}
                {this.state.gst_information === true ? (
                  <Col md={9} className="MyAddress_Details_Section">
                    <GstInformation />
                  </Col>
                ) : null}
                {this.state.order_information === true ? (
                  <Col md={9} className="MyAddress_Details_Section">
                    <GstInformation />
                  </Col>
                ) : null}
              </Row>
            </Container>
          </section>
          <Footer />
        </section>
      </React.Fragment>
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

export default connect(mapStateToProps, null)(MyAccount);