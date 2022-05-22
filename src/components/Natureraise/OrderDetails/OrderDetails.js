import React, { Component } from "react";
import "./OrderDetails.css";
import { Container, Row, Col, Card, Form, Accordion } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import StarRatingComponent from "react-star-rating-component";
import {
  SLIDER_IMAGE,
  PRODUTS_DATA,
  PRODUCT_DISCOUNT,
  CUSTOMER_RATING,
  SORT_LIST,
} from "../../constants/AccountData";
import { connect } from "react-redux";
import * as ProductActions from "../store/actions/Product/ProductActions";
import OrderDetailsCard from "../Common/Components/OrderDetailsCard/OrderDetailsCard";
import PageLoading from "../../constants/PageLoader/PageLoading";
import FilterDropdown from '../Common/UI/FilterDropdown/FilterDropdown';


class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_slider: images.product_image,
      rating: 1,
      categories_value: "",
      sort_by_value: "",
      wishcolor: "green",
      rating_status: true,
      page_number: "",
      data_limit: "",
      item_name: "",
      categories_id: localStorage.getItem("categories_id"),
      isLoading: true,

    };
  }

  componentDidMount() {

    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
    window.scrollTo(0,0);
    const { page_number, data_limit, item_name } = this.state;
    var productdata_id = localStorage.getItem("categories_id");
    this.props.dispatch(
      ProductActions.getItemListBySubCategory(
        productdata_id,
        page_number,
        data_limit,
        item_name
      )
    );
    // this.props.dispatch(
    //   ProductActions.getProductImages(
    //     productdata_id,
    //   )
    // );
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevState.categories_id !== localStorage.getItem("categories_id")) {
      this.setState({ categories_id: localStorage.getItem("categories_id") });
      return true;
    } else {
      return false;
    }

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page_number, data_limit, item_name, categories_id } = this.state;

    if (snapshot) {
      this.props.dispatch(
        ProductActions.getItemListBySubCategory(
          localStorage.getItem("categories_id"),
          page_number,
          data_limit,
          item_name
        )
      );
    }
  }

  onRating_function = () => {
    this.setState((prevState) => ({ rating_status: !prevState.rating_status }));
  };

  property_data_fun = (event) => {
    const event_value = event.target.value.toString();
    this.setState({ categories_value: event_value });
  };
  wishlistfun = () => {
    this.setState({ wishcolor: "red" });
  };
  navigate_function = (item) => {
    localStorage.setItem("product_id", item.id);
    this.props.history.push("/ProductDescription");
  };


  add_to_card =(id)=>
  {
    if(this.props.product_quantity===0)
    {
      this.addtocart_function(id);
    }
   this.props.history.push('/CheckOut');
  }


  addtocart_function = (id) => {

    let cart_id = id;
    this.props.dispatch(ProductActions.addtocart(cart_id));
  };

  render() {
    const { rating, sort_by_value, rating_status } = this.state;
    return (
      <section className="product_list_container" id="product_list_container">
        <PageLoading isLoadingComplete={this.props.is_loading} />

        <HeaderNavbar />
        <SectionHeader
          about_banner="about_banner"
          section_title="Shop"
          section_subtitle="Products"
        />
        <div className="product_list_wrap section_padding_top_bottom">
          <Container>
            <Row>
              <Col md={3} xl={3}>
                <div className="product_list_card sticky-top">
                  <div className="product_search_wrap">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        className="product_search_input"
                        type="text"
                        placeholder="Search Here..."
                      />
                    </Form.Group>
                    <div className="search_icon_wrap">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className=" common_divison_padding">
                    <div className="product_title_parent">
                      <h3 className="product_titles">Price Range </h3>
                    </div>
                    <Form>
                      <Form.Group controlId="formBasicRange">
                        <Form.Control type="range" />
                      </Form.Group>
                    </Form>
                    <div>
                      <h6 className="product_price_values">
                        Price: ₹ 50 — ₹ 120
                      </h6>
                    </div>
                  </div>
                  <div className="product_categories common_divison_padding">
                    <div className="product_title_parent">
                      <h3 className="product_titles">Filters </h3>
                    </div>
                    <div className="product_unorder_list ">
                      {SLIDER_IMAGE.map((data, index) => {
                        return (
                          <Form.Group id="formGridCheckbox">
                            <Form.Check
                              type="checkbox"
                              label={data.name}
                              value={data.name}
                              id={data.name}
                            />
                          </Form.Group>
                        );
                      })}
                    </div>
                  </div>
                  <div className="product_collapse">
                    <Accordion>
                      <Card>
                        <Accordion.Toggle
                          onClick={this.onRating_function}
                          as={Card.Header}
                          eventKey="0"
                        >
                          CUSTOMER RATINGS
                          <i
                            onClick={this.onRating_function}
                            style={{
                              color: rating_status === true ? "red" : "#ef6831",
                            }}
                            className={
                              rating_status === true
                                ? "fa fa-caret-down"
                                : "fa fa-caret-up"
                            }
                            aria-hidden="true"
                          ></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            {CUSTOMER_RATING.map((data, index) => {
                              return (
                                <Form.Group id="formGridCheckbox">
                                  <Form.Check
                                    type="checkbox"
                                    label={data.name}
                                    value={data.name}
                                    id={data.name}
                                  />
                                </Form.Group>
                              );
                            })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          DISCOUNT
                          <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {PRODUCT_DISCOUNT.map((data, index) => {
                              return (
                                <Form.Group id="formGridCheckbox">
                                  <Form.Check
                                    type="checkbox"
                                    label={data.name}
                                    value={data.name}
                                    id={data.name}
                                  />
                                </Form.Group>
                              );
                            })}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <div className="common_divison_padding">
                    <div className="product_title_parent">
                      <h3 className="product_titles">Bestsellers </h3>
                    </div>
                    {(SLIDER_IMAGE || []).map((x, index) => {
                      return (
                        <Row>
                          <Col md={4} xs={4}>
                            <div className="related_products_card">
                              <img
                                src={images.product_image1}
                                className="img-fluid"
                                alt="Best Ecommerce natureraise"
                              />
                            </div>
                          </Col>
                          <Col md={8} xs={8}>
                            <div className="product_list_info_wrapper">
                              <div className="product_list_info">
                                <h6 className="product_list_title">
                                  Solar Panel 380w
                                </h6>
                                <h6 className="product_list_amount">
                                  ₹ 230.00
                                </h6>
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={5}
                                  value={rating}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      );
                    })}
                  </div>
                </div>
              </Col>
              <Col md={9} xl={9}>
              <FilterDropdown
              sortvalue={sort_by_value}
              filterOnchange={(event)=>{this.property_data_fun(event)}}
              list_data={SORT_LIST}
              />
               
                <div className="common_divison_padding">
                  <Row>
                    {(this.props.product_list_data || []).map((x, index) => {
                      return (
                      <Col md={12} xl={12} className="mb-2">
                        <OrderDetailsCard 
                        heading="200 LPD NATURERAISE ECO ETC NON PRESSURISED.."
                        color="Color, Silver"
                        subtitle="Seller, E-Troinic"
                        amount="520"
                        deliverydate="Delivered on Sun, May 23"
                        deleiverystatus="your item has been Delivered"
                        />
                      </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
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
    product_list_data: state.ProductActions.product_list || [],
    product_quantity: state.ProductActions.product_quantity,
    is_loading: state.ProductActions.is_loading,
  };
};

export default connect(mapStateToProps, null)(OrderDetails);
