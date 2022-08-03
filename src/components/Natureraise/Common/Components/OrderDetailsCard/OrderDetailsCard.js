import React from "react";
import { Link } from "react-router-dom";

import "./OrderDetailsCard.css";
import { Col, Row } from "react-bootstrap";

const OrderDetailsCard = ({ products, ...props }) => {
  let heading =
    products?.length >= 2
      ? `${products[0]?.item_name} & More...`
      : `${products[0]?.item_name}...`;

  return (
    <div className="order_card_wrap">
      <Link to={`/orderDetails/${props.order_id}`}>
        <Row>
          <Col md={6}>
            <div className="order_card_img">
              <img
                // src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/v-guard-solar-water-heater-fpc-systems-nw-500x500-600x600-222x222.png"
                src={products[0]?.image_address}
                className="img-fluid"
                alt={heading}
              />
              <div className="order_card_title">
                <h6 className="order_card_heading">{heading}</h6>
                {/* <h6 className="order_card_sub">color: {products[0].item_color}, </h6> */}
                <h6 className="order_card_sub">{products[0]?.brand_name}</h6>
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
      </Link>
    </div>
  );
};

export default OrderDetailsCard;
