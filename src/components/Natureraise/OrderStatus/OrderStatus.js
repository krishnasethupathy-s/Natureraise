import React, { Component } from "react";
import "./OrderStatus.css";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Stepper from "react-stepper-horizontal";
import moment from "moment";

import images from "../../constants/images";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import { connect } from "react-redux";
import CardWrap from "../Common/UI/Card/Card";
import Config from "../../../Config";

import AddressDetails from "./constant/AddressDetails/AddressDetails";
import StatusDetails from "./constant/StatusDetails/StatusDetails";

import {
  getOrderDetail,
  getOrderedProductList,
  getOrderStatusList,
  getOrderReturnReason,
} from "../store/actions/Order/OrderActions";
import ReviewModal from "./review-modal";
import CancelModal from "./cancel-modal";
import ReturnModal from "./return-modal";

import { Link } from "react-router-dom";

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
      reviewProductId: "",
      returnProductId: "",
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
    this.props.dispatch(getOrderReturnReason());
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
  setReturnProductId = (id) => {
    this.setState({ returnProductId: id });
    this.returnModalHandleOpen();
  };

  render() {
    const status = this.props.detail?.status;

    return (
      <>
        <Helmet>
          <title>Order Detail | NatureSave</title>
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
                            <Col md={9}>
                              <div>
                                <div>
                                  {this.props.detail?.detail?.order_status !==
                                    "Payment Failed" && (
                                    <Stepper
                                      titleFontSize={10}
                                      circleFontSize={14}
                                      steps={[
                                        {
                                          title:
                                            status?.status === "Cancelled"
                                              ? "Cancelled"
                                              : "Ordered",
                                        },
                                        { title: "Placed" },
                                        { title: "Packed" },
                                        { title: "Shipped" },
                                        { title: "Delivered" },
                                      ]}
                                      activeStep={status?.stepper}
                                    />
                                  )}
                                </div>
                                <div className="order_status_text">
                                  <p>{status?.status_details}</p>
                                </div>
                                {this.props.detail?.detail?.order_status ===
                                  "Payment Failed" && (
                                  <div>
                                    <p>
                                      * If any money deducted , wait 3-4 days
                                      before reach out to your bank / contact us
                                      for more information.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col
                              md={3}
                              xl={3}
                              className="d-flex justify-content-center "
                            >
                              {this.props.detail?.detail?.order_status !==
                                "Delivered" &&
                                this.props.detail?.detail?.order_status !==
                                  "Payment Failed" &&
                                +status?.stepper < 3 &&
                                this.props.detail?.detail?.order_status !==
                                  "Cancelled" && (
                                  <button
                                    className="btn btn-primary text-white "
                                    style={{ height: "60px" }}
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
                              openReturnModal={this.setReturnProductId}
                              orderDate={this.props.detail?.detail?.order_date}
                              returnValidity={item.return_validity}
                            />
                          ))}
                          <div className="order_return_wrap">
                            <h6 className="order_return_policy">
                              Return policy valid till 30{" "}
                              <Link
                                to="/PrivacyPolicy"
                                className="order_retrun_sub"
                              >
                                Know More
                              </Link>
                            </h6>
                          </div>
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
          <ReturnModal
            show={this.state.returnModal}
            handleClose={this.returnModalHandleClose}
            id={this.state.returnProductId}
            order_id={this.id}
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
