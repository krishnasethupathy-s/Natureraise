import React from "react";
import "./AddressDetails.css";
import {Row,Col} from 'react-bootstrap';

const AddressDetails = (props) => {
  return (
    <Row>
      <Col md={4}>
        <div className="order_address_wrap">
          <h6 className="order_title">Deleivery Address</h6>
          <h6 className="order_name">Karthik</h6>
          <h6 className="order_address">
            {" "}
            No: 111, kk, Nagar, Mangadu,Chennai
          </h6>
          <h6 className="order_address">Mobile Number: +91 7092933603</h6>

          <h6 className="order_address"> This is also tracked by 7092933603</h6>
        </div>
      </Col>
      <Col md={3}>
        <div className="order_address_wrap">
          <h6 className="order_title">Your Rewards</h6>
          <div className="order_image_wrap">
            <img
              className="order_image_size"
              src="https://image.shutterstock.com/image-vector/electric-power-vector-icon-260nw-1140395627.jpg"
            />
            <div className="order_subtitle_wrap">
              <h6 className="order_subtitle">10 SuperCoins</h6>
              <h6 className="order_descritpion">
                will be Share return period is over
              </h6>
            </div>
          </div>
        </div>
      </Col>
      <Col md={3}>
        <div className="order_address_wrap">
          <h6 className="order_title">More Action</h6>
          <div className="order_image_wrap">
            <img
              className="order_image_size"
              src="https://image.shutterstock.com/image-vector/electric-power-vector-icon-260nw-1140395627.jpg"
            />
            <div className="order_subtitle_wrap">
              <h6 className="order_subtitle">Invoice Download</h6>
            </div>
          </div>
        </div>
      </Col>
      <Col md={2} className="order_download_wrap">
        <div className="order_download_button">
          <p>Download</p>
        </div>
      </Col>
    </Row>
  );
};

export default AddressDetails;
