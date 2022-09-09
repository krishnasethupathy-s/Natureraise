import React, { Component } from "react";
import "./OrderStatus.css";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import images from "../../constants/images";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import { connect } from "react-redux";
import CardWrap from "../Common/UI/Card/Card";

import AddressDetails from "./constant/AddressDetails/AddressDetails";
import StatusDetails from "./constant/StatusDetails/StatusDetails";

import {
  getOrderDetail,
  getOrderedProductList,
  getOrderStatusList,
} from "../store/actions/Order/OrderActions";
import ReviewModal from "./review-modal";
import CancelModal from "./cancel-modal";

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
      reviewProductId: "",
      cancelOrderModal: false,
      returnModal: false,
    };
    this.id = this.props.match.params.id;
  }

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

  returnModalHandleOpen = () => this.setState({ returnModal: true });
  returnModalHandleClose = () => this.setState({ returnModal: false });

  cancelModalHandleOpen = () => this.setState({ cancelOrderModal: true });
  cancelModalHandleClose = () => this.setState({ cancelOrderModal: false });

  setReviewProductId = (id) => {
    this.setState({ reviewProductId: id });
    this.reviewModalHandleOpen();
  };

  render() {
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
                          <Row>
                            <Col
                              md={12}
                              xl={12}
                              className="d-flex justify-content-end "
                            >
                              {!!this.props.detail.order_status ===
                                "Delivered" && (
                                <button className="btn btn-danger text-white">
                                  Return Product
                                </button>
                              )}
                              {!!this.props.detail.order_status !==
                                "Delivered" && (
                                <button
                                  className="btn btn-primary text-white"
                                  onClick={this.cancelModalHandleOpen}
                                >
                                  Cancel Order
                                </button>
                              )}
                            </Col>
                          </Row>
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
          <CancelModal
            show={this.state.cancelOrderModal}
            handleClose={this.cancelModalHandleClose}
            id={this.id}
          />
        </section>
      </>
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
