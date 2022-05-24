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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "../../constants/images";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as ProductActions from "../store/actions/Product/ProductActions";

class HeaderNavbar extends Component {
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
    localStorage.clear();
    this.props.history.push("/SignUp");
  };

  product_navigate = (id) => {
    localStorage.setItem("categories_id", id);
    this.props.history.push(`/Products/${id}`);
  };

  handle_to_cart_navigation = () => {
    this.props.history.push("/Checkout");
  };

  render() {
    return (
      <>
        <section className="search_inner_navbar">
          <Container>
            <Row>
              <Col md={2} className="d-none d-sm-block">
                <Navbar.Brand as={Link} to="/">
                  <img src={images.nature_logo} alt="Logo" />
                </Navbar.Brand>
              </Col>
              <Col md={6}>
                <div>
                  <Form.Group controlId="formBasicSearch">
                    <Form.Label></Form.Label>
                    <Form.Control type="text" placeholder="Search" />
                    <div className="search_inner_nav_icon">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                  </Form.Group>
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
                          <span>{this.props.cart_product_list.length}</span>
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
                        <Col md={6} xs={6}>
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
                          <div>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU"
                              className="Navbar_ProfileImage"
                              alt="profile_logo"
                            />
                          </div>
                        </Col>
                        <Col md={6} xs={6}>
                          <div>
                            <span>Welcome Ajith !</span>
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
                            onClick={() => {
                              this.product_navigate(x.id);
                            }}
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
  };
};

export default withRouter(connect(mapStateToProps, null)(HeaderNavbar));
