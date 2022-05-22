import React, { Component } from "react";
import "./OrderStatus.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import {SORT_LIST,} from "../../constants/AccountData";
import { connect } from "react-redux";
import * as ProductActions from "../store/actions/Product/ProductActions";
import PageLoading from "../../constants/PageLoader/PageLoading";
import CardWrap from '../Common/UI/Card/Card';
import FilterDropdown from '../Common/UI/FilterDropdown/FilterDropdown';



import AddressDetails from './constant/AddressDetails/AddressDetails';
import StatusDetails from './constant/StatusDetails/StatusDetails';




class OrderStatus extends Component {
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
    this.setState({ sort_by_value: event_value });
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
    const { sort_by_value } = this.state;
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
              <Col md={12} xl={12}>
              <FilterDropdown
              sortvalue={sort_by_value}
              filterOnchange={(event)=>{this.property_data_fun(event)}}
              list_data={SORT_LIST}
              />
                <div className="common_divison_padding">
                <Row>
                  <Col md={12} xl={12}>
                    <CardWrap className="order_status_container">
                     <AddressDetails />
                    </CardWrap>
                  </Col>
                   </Row>
                    <Row className="mt-2">
                    <Col md={12}>
                     <CardWrap className="order_status_container">
                      <StatusDetails />
                    </CardWrap>
                    </Col>
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

export default connect(mapStateToProps, null)(OrderStatus);
