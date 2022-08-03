import React, { Component } from "react";
import "./OrderStatus.css";
import { Container, Row, Col } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import { connect } from "react-redux";
import PageLoading from "../../constants/PageLoader/PageLoading";
import CardWrap from "../Common/UI/Card/Card";

import AddressDetails from "./constant/AddressDetails/AddressDetails";
import StatusDetails from "./constant/StatusDetails/StatusDetails";

import {
  getOrderDetail,
  getOrderedProductList,
  getOrderStatusList,
} from "../store/actions/Order/OrderActions";
import ReviewModal from "./review-modal";

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
      reviewProductId: "",
    };
  }

  id = this.props.match.params.id;

  componentDidMount() {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
    window.scrollTo(0, 0);
    this.props.dispatch(getOrderDetail(this.id));
    this.props.dispatch(getOrderedProductList(this.id));
    this.props.dispatch(getOrderStatusList(this.id));
  }

  reviewModalHandleOpen = () => this.setState({ reviewModal: true });
  reviewModalHandleClose = () => this.setState({ reviewModal: false });

  setReviewProductId = (id) => {
    this.setState({ reviewProductId: id });
    this.reviewModalHandleOpen();
  };

  render() {
    return (
      <section className="product_list_container" id="product_list_container">
        <PageLoading isLoadingComplete={this.props.is_loading} />

        <HeaderNavbar />
        <SectionHeader
          about_banner="about_banner"
          section_title="Order Detail"
          section_subtitle="Orders"
        />
        <div className="product_list_wrap section_padding_top_bottom">
          <Container>
            <Row>
              <Col md={12} xl={12}>
                <div className="common_divison_padding">
                  <Row>
                    <Col md={12} xl={12}>
                      <CardWrap className="order_status_container">
                        {this.props?.detail?.detail && (
                          <AddressDetails detail={this.props.detail.detail} />
                        )}
                      </CardWrap>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md={12}>
                      <CardWrap className="order_status_container">
                        {this.props?.detail?.items?.map((item) => (
                          <StatusDetails
                            key={item.id}
                            item={item}
                            status={this.props.detail?.status}
                            openReviewModal={this.setReviewProductId}
                          />
                        ))}
                      </CardWrap>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ReviewModal
          show={this.state.reviewModal}
          handleClose={this.reviewModalHandleClose}
          id={this.state.reviewProductId}
        />
        <Footer />
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    detail: state.OrderReducer.orderDetail,
    is_loading: state.ProductActions.is_loading,
  };
};

export default connect(mapStateToProps, null)(OrderStatus);
