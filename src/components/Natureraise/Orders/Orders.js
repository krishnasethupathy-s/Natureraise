import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import OrderDetailsCard from "../Common/Components/OrderDetailsCard/OrderDetailsCard";

import images from "../../constants/images";

import { getOrderListPageWise } from "../store/actions/Order/OrderActions";

import PageLoading from "../../constants/PageLoader/PageLoading";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data_limit: "4",
    };
  }

  async componentDidMount() {
    this.props.dispatch({ type: "RESET_ORDER_LIST" });
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    this.props.dispatch(getOrderListPageWise("1", this.state.data_limit));
  }

  componentDidUpdate() {}

  fetchData = () => {
    this.props.dispatch(
      getOrderListPageWise(this.state.page + 1 + "", this.state.data_limit)
    );
    this.setState((prev) => ({ page: prev.page + 1 }));
  };

  render() {
    // const delivery
    return (
      <div className="personal-information-wrapper">
        <PageLoading isLoadingComplete={this.props.is_loading} />
        <Container>
          <Row style={{ minHeight: "30vh" }}>
            <Col md={12} className="Personal_Information_Heading">
              <h6>Your Orders</h6>
              {!!!this.props.orders.length && !this.props.is_loading && (
                <h6 className="text-center">No Orders , Order Something</h6>
              )}
            </Col>
            <Col md={12}>
              {!!this.props.orders.length && (
                <InfiniteScroll
                  dataLength={this.props?.orders?.length} //This is important field to render the next data
                  next={this.fetchData}
                  hasMore={this.props.hasMore}
                  style={{ overflow: "hidden" }}
                  scrollThreshold={0.5}
                  loader={
                    <p style={{ textAlign: "center" }}>
                      <b>Loading...</b>
                    </p>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {!!this.props.orders.length &&
                    this.props.orders.map((item) => (
                      <OrderDetailsCard
                        key={item.id}
                        order_id={item.id}
                        products={item.product_list}
                        heading="200 LPD NATURERAISE ECO ETC NON PRESSURISED.."
                        color="Color, Silver"
                        subtitle="Seller, E-Troinic"
                        amount={item.order_amount}
                        deliverydate={item.orderStatus.at(-1).delivery_time}
                        deleiverystatus={item.order_status}
                      />
                    ))}
                </InfiniteScroll>
              )}
            </Col>
          </Row>

          <Row>
            <img
              src={images.Account_Bottom}
              alt="RealEsate"
              className="img-fluid w-100"
            />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.AddCustomerAddress.message,
    error_msg: state.AddCustomerAddress.error_msg,
    is_loading: state.ProductActions.is_loading,
    orders: state.OrderReducer.orders || [],
    hasMore: state.OrderReducer.hasMore,
  };
};

export default connect(mapStateToProps, null)(Orders);
