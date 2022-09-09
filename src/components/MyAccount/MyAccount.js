import React, { Component } from "react";

import { Link, NavLink, Route, Switch, Redirect } from "react-router-dom";
import Avatar from "react-avatar";

import "./MyAccount.css";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import ChangePassword from "./ChangePassword/ChangePassword";
import ManageAddress from "./ManageAddress/ManageAddress";
import GstInformation from "./GstInformation/GstInformation";
import { Container, Col, Row, Jumbotron } from "react-bootstrap";
import * as AddCustomerAddress from "../Natureraise/store/actions/UserProfile/CustomerAddress";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import OrderDetailsCard from "../Natureraise/Common/Components/OrderDetailsCard/OrderDetailsCard";
import Orders from "../Natureraise/Orders/Orders";

import {
  getOrderList,
  getOrderCurrentList,
} from "../Natureraise/store/actions/Order/OrderActions";

import { resetCart } from "../Natureraise/store/actions/Product/ProductActions";
import { logout_user } from "../Natureraise/store/actions/User/UserActions";

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      profile_pic: localStorage.getItem("image_address"),
      client_ip: "",
      isLoadingComplete: true,
      propery_list: [],
    };
  }

  Logout_Function = () => {
    localStorage.clear();
    this.props.dispatch(resetCart());
    this.props.dispatch(logout_user());
    this.props.history.push("/");
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ first_name: localStorage.getItem("first_name") });
    this.setState({ last_name: localStorage.getItem("last_name") });
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);

    // this.props.dispatch(getOrderList());
    // this.props.dispatch(getOrderCurrentList());
  }

  componentDidUpdate = async () => {
    if (this.props.message === "CUSTOMER_PROFILE_UPDATE") {
      let success = await this.props.dispatch(
        AddCustomerAddress.empty_message()
      );
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

  render() {
    const { path } = this.props.match;
    return (
      <React.Fragment>
        <section>
          <div id="SignIn_Main_Section">
            <Jumbotron fluid className="text-center">
              <Container>
                <h4>My Account</h4>
                <div className="SignIn_Section">
                  <ul className="Inner_nav">
                    <li>
                      <Link to="/">
                        <i className="fa fa-sign-in"></i> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/MyAccount/profile">
                        <i className="fa fa-user-circle-o"></i> MyAccount
                      </Link>
                    </li>
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
                      {/* <img
                        // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt={
                          this.props.user.first_name +
                          " " +
                          this.props.user.last_name
                        }
                        src={
                          this.props.user.image_address ||
                          this.state.profile_pic
                        }
                      />
                    */}
                      <Avatar
                        name={`${this.props.user.first_name} ${this.props.user.last_name}`}
                        size="80"
                        round={true}
                      />
                    </div>
                    <div>
                      <h6 className="Padding_left">Hello</h6>
                      {localStorage.getItem("Authorization") === null ? (
                        <h6 className="Padding_left"> </h6>
                      ) : (
                        <h6 className="Padding_left">
                          {this.state.first_name} {this.state.last_name}
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
                  <NavLink
                    style={{
                      color: " #666",
                    }}
                    activeClassName="active_background"
                    to={`/MyAccount/profile`}
                  >
                    <div className="mb-1 My_Account_Basic_Details">
                      <div className="My_Account_Heading_Section ">
                        <h6 className={"MyAccount_SubHeading"}>
                          Profile Information
                        </h6>
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    style={{
                      color: " #666",
                    }}
                    activeClassName="active_background"
                    to={`/MyAccount/changepassword`}
                  >
                    <div className="mb-1 My_Account_Basic_Details">
                      <div className="My_Account_Heading_Section ">
                        <h6 className={"MyAccount_SubHeading"}>
                          Change Password
                        </h6>
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    style={{
                      color: " #666",
                    }}
                    to={`/MyAccount/address`}
                    activeClassName="active_background"
                  >
                    <div className="mb-1 My_Account_Basic_Details">
                      <div className="My_Account_Heading_Section ">
                        <h6 className={"MyAccount_SubHeading"}>
                          Manage Address
                        </h6>
                        <i
                          className="fa fa-caret-right"
                          aria-hidden="true"
                          // onClick={() => this.handleViewBtnClickGst()}
                        ></i>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    style={{
                      color: " #666",
                    }}
                    to={`/MyAccount/gst`}
                    activeClassName="active_background"
                  >
                    <div className="mb-1 My_Account_Basic_Details">
                      <div className="My_Account_Heading_Section ">
                        <h6 className={"MyAccount_SubHeading"}>
                          Gst Information
                        </h6>
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    style={{
                      color: " #666",
                    }}
                    to={`${path}/orders`}
                    activeClassName="active_background"
                  >
                    <div className="mb-1 My_Account_Basic_Details">
                      <div className="My_Account_Heading_Section ">
                        <h6 className={"MyAccount_SubHeading"}>Orders</h6>
                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                      </div>
                    </div>
                  </NavLink>

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
                <Switch>
                  <Redirect from="/MyAccount" to="/MyAccount/profile" exact />
                  <Route path={`${path}/profile`}>
                    <Col md={9} className="My_Account_Profile_Details">
                      <PersonalInformation />
                    </Col>
                  </Route>
                  <Route path={`${path}/changepassword`}>
                    <Col md={9} className="My_Account_Profile_Details">
                      <ChangePassword />
                    </Col>
                  </Route>
                  <Route path={`${path}/address`}>
                    <Col md={9} className="MyAddress_Details_Section">
                      <ManageAddress />
                    </Col>
                  </Route>
                  <Route path={`${path}/gst`}>
                    <Col md={9} className="MyAddress_Details_Section">
                      <GstInformation />
                    </Col>
                  </Route>
                  <Route path={`${path}/orders`}>
                    <Col md={9} className="MyAddress_Details_Section">
                      {/* {this.props.orders.map((item) => (
                        <OrderDetailsCard
                          key={item.id}
                          order_id={item.id}
                          heading="200 LPD NATURERAISE ECO ETC NON PRESSURISED.."
                          color="Color, Silver"
                          subtitle="Seller, E-Troinic"
                          amount="520"
                          deliverydate="Delivered on Sun, May 23"
                          deleiverystatus="your item has been Delivered"
                        />
                      ))} */}
                      <Orders />
                    </Col>
                  </Route>
                </Switch>
                {/* 
                {this.state.profile_information === true ? (
                  <Col md={9} className="My_Account_Profile_Details">
                    <PersonalInformation />
                  </Col>
                ) : null} */}
                {/* {this.state.manage_infromation === true ? (
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
                    {this.props.orders.map((item) => (
                      <OrderDetailsCard
                        key={item.id}
                        order_id={item.id}
                        heading="200 LPD NATURERAISE ECO ETC NON PRESSURISED.."
                        color="Color, Silver"
                        subtitle="Seller, E-Troinic"
                        amount="520"
                        deliverydate="Delivered on Sun, May 23"
                        deleiverystatus="your item has been Delivered"
                      />
                    ))}
                  </Col>
                ) : null} */}
              </Row>
            </Container>
          </section>
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
    orders: state.OrderReducer.orders || [],
    user: state.UserActions.user,
  };
};

export default connect(mapStateToProps, null)(MyAccount);
