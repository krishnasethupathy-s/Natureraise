import React, { Component } from "react";
import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <div className="product-card-wrap">
      <div className="product-card-percentage">
        <h6 className="product-card-perentage-title">
          {props.percentage}% off
        </h6>
        <span className="prodcut-card-arrow"></span>
      </div>
      <div className="wish_list_icon">
        <i
          class="fa fa-heart"
          aria-hidden="true"
          style={{ color: props.wishcolor }}
        ></i>
      </div>
      <div
        className="hover_first_images"
        onClick={() => {
          props.navigate_function(props.x);
        }}
      >
        <img
          src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/v-guard-solar-water-heater-fpc-systems-nw-500x500-600x600-222x222.png"
          className="img-fluid"
          alt="Best Ecommerce natureraise"
        />
      </div>
      <div
        className="hover_second_image"
        onClick={() => {
          props.navigate_function(props.x);
        }}
      >
        <img
          src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/solar-water-heater-v-hot-commercial-series-222x222.jpg"
          className="img-fluid"
          alt="Best Ecommerce natureraise"
        />
      </div>
      <div
        className="product-card-description"
        onClick={() => {
          props.navigate_function(props.x);
        }}
      >
        <div className="product-card-title">
          <h6>{props.item_name.slice(0, 55) + "..."} </h6>
        </div>

        {props.retail_price === props.selling_price ? (
          <div className="product-card-amount-wrapper">
            <h6 className="product-card-hightlight-red">
              {props.special_price}
            </h6>
            <h6 className="product-card-hightlight-green">
              ₹ {props.retail_price}{" "}
            </h6>
          </div>
        ) : (
          <div className="product-card-amount-wrapper">
            <h6 className="product-card-hightlight-redr">
              {props.special_price}
            </h6>
            <h6 className="product-card-hightlight-green">
              ₹ {props.selling_price}{" "}
            </h6>
          </div>
        )}
      </div>

      <div>
        <p className="product-card-addcart">Add to Cart</p>
      </div>
    </div>
  );
};

export default ProductCard;
