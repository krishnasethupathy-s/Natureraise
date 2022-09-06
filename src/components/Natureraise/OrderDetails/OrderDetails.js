import React, { Component } from "react";
import "./OrderDetails.css";
import { Container, Row, Col, Card, Form, Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

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
import FilterDropdown from "../Common/UI/FilterDropdown/FilterDropdown";

import {
  getOrderDetail,
  getOrderedProductList,
} from "../store/actions/Order/OrderActions";

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

  id = this.props.match.params.id;

  componentDidMount() {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
    window.scrollTo(0, 0);
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
    this.props.dispatch(getOrderDetail(this.id));
    this.props.dispatch(getOrderedProductList(this.id));

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

  add_to_card = (id) => {
    if (this.props.product_quantity === 0) {
      this.addtocart_function(id);
    }
    this.props.history.push("/CheckOut");
  };

  addtocart_function = (id) => {
    let cart_id = id;
    this.props.dispatch(ProductActions.addtocart(cart_id));
  };

  render() {
    const { rating, sort_by_value, rating_status } = this.state;
    return (
      <>
        <Helmet>
          <title>Order Detail | Natureraise</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta
            property="og:description"
            content="Natureraise Order Detail Page"
          />
        </Helmet>

        <section className="product_list_container" id="product_list_container">
          <PageLoading isLoadingComplete={this.props.is_loading} />

          <div className="product_list_wrap section_padding_top_bottom">
            <Container>
              <Row>
                <Col md={9} xl={9}>
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    is_loading: state.ProductActions.is_loading,
  };
};

export default connect(mapStateToProps, null)(OrderDetails);
