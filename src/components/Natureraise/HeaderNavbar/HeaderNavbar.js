import React, { Component } from "react";
import "./HeaderNavbar.css";
import {
  Nav,
  NavDropdown,
  Form,
  Navbar,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import qs from "query-string";
import Avatar from "react-avatar";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";

import images from "../../constants/images";
import * as ProductActions from "../store/actions/Product/ProductActions";
import { logout_user } from "../store/actions/User/UserActions";

import "react-toastify/dist/ReactToastify.css";

class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic: localStorage.getItem("image_address"),
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      search: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(ProductActions.getCategory());
    $(document).ready(
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
          $(".Header_Inner_Background").addClass("darkHeader");
        } else {
          $(".Header_Inner_Background").removeClass("darkHeader");
        }
      })
    );
  }

  Logout_Function = () => {
    if (this.props.provider === "google") {
      console.log("google logout");
      googleLogout();
    }
    if (this.props.provider === "facebook") {
      FacebookLoginClient.logout();
    }

    this.props.dispatch(ProductActions.resetCart());
    this.props.dispatch(logout_user());
    localStorage.clear();
    this.props.history.push("/");
  };

  product_navigate = (id) => {
    localStorage.setItem("categories_id", id);
    this.props.history.push(`/Products/${id}`);
  };

  handle_to_cart_navigation = () => {
    this.props.history.push("/Checkout");
  };

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const query = qs.stringify({
      search: this.state.search,
      discount: [],
      rating: [],
      sort: 1,
      range: [100, 1000000],
    });
    this.props.history.push({
      pathname: `/products`,
      search: "?" + query,
    });
  };

  render() {
    return (
      <>
        <section className="search_inner_navbar ">
          <Container>
            <Row>
              <Col md={2} className="d-none d-sm-block">
                <Navbar.Brand as={Link} to="/">
                  <img src={images.nature_logo} alt="Logo" />
                </Navbar.Brand>
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <div>
                  <Form onSubmit={this.handleSearch}>
                    <Form.Group controlId="formBasicSearch">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                      />
                      <div className="input-group-append">
                        <button
                          className="search_inner_nav_icon "
                          type="submit"
                        >
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
              <Col md={4}>
                <div className="search_shopping_mobile">
                  <Row>
                    <Col md={2} xs={3}>
                      <div
                        className="search_shopping_wrap"
                        onClick={this.handle_to_cart_navigation}
                      >
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                        <div className="search_cart_badge">
                          <span>{this.props.cart_items.length}</span>
                        </div>
                      </div>
                    </Col>

                    {localStorage.getItem("Authorization") === null ? (
                      <>
                        <Col md={2} xs={3}>
                          <div className="search_shopping_wrap">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </div>
                          <div></div>
                        </Col>
                        <Col md={8} lg={6} xs={6}>
                          <div>
                            <div>
                              <span>Welcome !</span>
                              <div className="header_register_link">
                                <Link to="/SignIn">
                                  <span>Sign In</span>{" "}
                                </Link>{" "}
                                |{" "}
                                <Link to="/SignUp">
                                  <span>Register</span>{" "}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col md={2} xs={3}>
                          {/* <div>
                            <img
                              src={
                                this.props.user.image_address ||
                                this.state.profile_pic
                              }
                              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU"
                              className="Navbar_ProfileImage"
                              alt="profile_logo"
                            />
                          </div> */}
                          <Avatar
                            name={`${this.props.user.first_name} ${this.props.user.last_name}`}
                            size="40"
                            round={true}
                          />
                        </Col>
                        <Col md={8} lg={6} xs={6}>
                          <div>
                            <span>
                              Welcome{" "}
                              {this.props.user.first_name ||
                                this.state.first_name}{" "}
                              !
                            </span>
                            <div className="header_register_link">
                              <Link to="/MyAccount">
                                <span>My Account</span>{" "}
                              </Link>{" "}
                              |{" "}
                              <span onClick={this.Logout_Function}>Logout</span>{" "}
                            </div>
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="Header_Inner_Background">
          <Navbar className="p-0 container" bg="light" expand="lg">
            <div className="d-block d-sm-none">
              <Navbar.Brand as={Link} to="/">
                <img src={images.nature_logo} alt="Logo" />
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {this.props.product_categories_list.map((item, index) => {
                  return (
                    <NavDropdown
                      key={item.id}
                      title={item.item_category_name}
                      id={item.id}
                      renderMenuOnMount={true}
                      // onClick={() => {
                      //   this.product_navigate(item.id);
                      // }}
                    >
                      {item.itemSubCategory.map((x, index) => {
                        return (
                          <NavDropdown.Item
                            as={Link}
                            // onClick={() => {
                            //   this.product_navigate(x.id);
                            // }}
                            to={`/Products/${x.id}?range=100&range=1000000&search=&sort=1`}
                            key={x.id}
                          >
                            {x.item_sub_category_name}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <ToastContainer position="top-right" />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product_categories_list: state.ProductActions.product_categories_list,
    cart_product_list: state.ProductActions.cart_product_list || [],
    cart_items: state.ProductActions.cart.items || [],
    user: state.UserActions.user,
    provider: state.UserActions.provider,
  };
};

export default connect(mapStateToProps, null)(withRouter(HeaderNavbar));
