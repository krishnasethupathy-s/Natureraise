import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <div className={"product-card-wrap " + props.className}>
      <div className="product-card-percentage">
        <h6 className="product-card-perentage-title">
          {props?.percentage}% off
        </h6>
        <span className="prodcut-card-arrow"></span>
      </div>
      <div className="wish_list_icon">
        <i
          className="fa fa-heart"
          aria-hidden="true"
          style={{ color: props?.wishcolor }}
        ></i>
      </div>
      <Link to={`/ProductDescription/${props?.id}`}>
        <div className=" img-hover-zoom">
          <img
            src={props?.image}
            className="img-thumbnail border-0"
            alt="Best Ecommerce natureraise"
          />
        </div>
        {/* <div
          className="hover_second_image"
          // onClick={() => {
          //   props.navigate_function(props.x);
          // }}
          // style={{ cursor: "pointer" }}
        >
          <img
            src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/solar-water-heater-v-hot-commercial-series-222x222.jpg"
            className="img-fluid"
            alt="Best Ecommerce natureraise"
          />
        </div> */}
        <div
          className="product-card-description"
          // onClick={() => {
          //   props.navigate_function(props.x);
          // }}
        >
          <div className="product-card-title">
            <h6>{props.item_name?.slice(0, 55) + "..."} </h6>
          </div>

          {props.retail_price === props.selling_price ? (
            <div className="product-card-amount-wrapper">
              <h6 className="product-card-hightlight-red">
                {props?.special_price === "0.00"
                  ? props?.selling_price
                  : props?.special_price}
              </h6>
              <h6 className="product-card-hightlight-green">
                ₹ {props?.retail_price}{" "}
              </h6>
            </div>
          ) : (
            <div className="product-card-amount-wrapper">
              <h6 className="product-card-hightlight-redr">
                {props?.special_price}
              </h6>
              <h6 className="product-card-hightlight-green">
                ₹ {props?.selling_price}{" "}
              </h6>
            </div>
          )}
        </div>
      </Link>

      <div>
        <p className=" product-card-addcart" onClick={props?.addToCart}>
          Add to Cart
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
