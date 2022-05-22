import React, { Component } from "react";
import "./OrderDetailsCard.css";
import {Col,Row} from 'react-bootstrap';

const OrderDetailsCard = (props) => {
  return (
    <div className="order_card_wrap">
      <Row>
        <Col md={6}>
          <div className="order_card_img">
            <img
              src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/v-guard-solar-water-heater-fpc-systems-nw-500x500-600x600-222x222.png"
              className="img-fluid"
              alt="Best Ecommerce natureraise"
            />
            <div className="order_card_title">
              <h6 className="order_card_heading">
               {props.heading}
              </h6>
              <h6 className="order_card_sub">{props.color}</h6>
              <h6 className="order_card_sub">{props.subtitle}</h6>
            </div>
          </div>
        </Col>
        <Col md={2} className="order_card_amount_wrap">
          <div className="order_card_amount">
            <h6 className="order_card_sub">${props.amount}</h6>
          </div>
        </Col>
        <Col md={4}>
          <div className="order_card_review_wrap">
            <div>
              <h6 className="order_review_title">{props.deliverydate}</h6>
              <h6 className="order_review_sub">{props.deleiverystatus}</h6>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailsCard;
