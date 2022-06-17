import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";

import OrderDetailsCard from "../Common/Components/OrderDetailsCard/OrderDetailsCard";

import images from "../../constants/images";

import {
  getOrderList,
  getOrderCurrentList,
} from "../store/actions/Order/OrderActions";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.props.dispatch(getOrderCurrentList());
  }

  render() {
    return (
      <div className="personal-information-wrapper">
        <Container>
          <Row>
            <Col md={12} className="Personal_Information_Heading">
              <h6>Your Orders</h6>
            </Col>
            <Col md={12}>
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
  };
};

export default connect(mapStateToProps, null)(Orders);
