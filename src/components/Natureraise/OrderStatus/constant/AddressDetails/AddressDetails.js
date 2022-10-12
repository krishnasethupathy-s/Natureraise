import React from "react";
import "./AddressDetails.css";
import { Row, Col } from "react-bootstrap";

const AddressDetails = ({ detail }) => {
  return (
    <Row>
      <Col md={4}>
        <div className="order_address_wrap">
          <h6 className="order_title">Delivery Address</h6>
          <h6 className="order_name">{detail.delivery_contact_name}</h6>
          <h6 className="order_address">
            {`${detail.delivery_address_line1}, ${detail.delivery_address_line2} `}
          </h6>
          <h6 className="order_address">
            {`${detail.delivery_city}, ${detail.delivery_state} `}
          </h6>
          <h6 className="order_address">Pin: {detail.delivery_pincode}</h6>
          <h6 className="order_address">
            Land Mark: {detail.delivery_landmark}
          </h6>
          <h6 className="order_address">
            Mobile Number: {detail.delivery_mobile_number}
          </h6>

          {/* <h6 className="order_address"> This is also tracked by 7092933603</h6> */}
        </div>
      </Col>
      <Col md={3}>
        <div className="order_address_wrap">
          <h6 className="order_title">Order Details</h6>

          <h6 className="order_address">Order ID: {detail.order_id}</h6>
          <h6 className="order_address">Date: {detail.entry_date}</h6>
          <h6 className="order_address">
            Payment Type:{" "}
            {detail.payment_type === "0" ? "Online" : "Pay on Delivery"}
          </h6>
          <h6 className="order_address">
            Payment Status: {detail.payment_status}
          </h6>

          {/* <div className="order_image_wrap">
            <img
              className="order_image_size"
              alt="power icon"
              src="https://image.shutterstock.com/image-vector/electric-power-vector-icon-260nw-1140395627.jpg"
            />
            <div className="order_subtitle_wrap">
              <h6 className="order_subtitle">10 SuperCoins</h6>
              <h6 className="order_descritpion">
                will be Share return period is over
              </h6>
            </div>
          </div> */}
        </div>
      </Col>
      <Col md={2}>
        <div className="order_address_wrap">
          <h6 className="order_title">Amount</h6>
          {/* <div className="order_image_wrap">
            <img
              className="order_image_size"
              alt="Power Icon"
              src="https://image.shutterstock.com/image-vector/electric-power-vector-icon-260nw-1140395627.jpg"
            />
            <div className="order_subtitle_wrap">
              <h6 className="order_subtitle">Invoice Download</h6>
            </div>
          </div> */}
          {
            !!+detail.coupon_amount && 
          <h6 className="order_address">
            Coupon Amount: ₹ {detail.coupon_amount}
          </h6>
          }
          <h6 className="order_address">
            Delivery Charge: ₹ {detail.delivery_charges}
          </h6>
          <h6 className="order_title">Total Amount: ₹ {detail.order_amount}</h6>
        </div>
      </Col>

      <Col md={3} xs={12} className="order_download_wrap">
        {!!detail.invoice_file_path && (
          <a
            href={detail.invoice_file_path}
            className="order_download_button"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <i className="fa fa-download pr-2" aria-hidden="true"></i>
            Download invoice
          </a>
        )}
      </Col>
    </Row>
  );
};

export default AddressDetails;
