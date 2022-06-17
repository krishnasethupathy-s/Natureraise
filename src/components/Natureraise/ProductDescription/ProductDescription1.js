import React, { Component } from "react";
import "./ProductDescription.css";
import { Container, Row, Col, Tab, Tabs, Form, Button } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import Footer from "../Footer/Footer";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import StarRatingComponent from "react-star-rating-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import * as ProductActions from "../store/actions/Product/ProductActions";
import parse from "html-react-parser";
import ProductCard from "../Common/Components/ProductCard/ProductCard";

import PageLoading from "../../constants/PageLoader/PageLoading";

const COLOR_DATA = [
  {
    id: 1,
    color: "red",
  },
  {
    id: 2,
    color: "orange",
  },
  {
    id: 3,
    color: "black",
  },
  {
    id: 4,
    color: "green",
  },
];

class ProductDescription1 extends Component {
  constructor(props) {
    super(props);
    this.onStarClick = this.onStarClick.bind(this);
    this.state = {
      product_slider: "",
      rating: 1,
      product_data: localStorage.getItem("product_fulldata"),
      pincode_label: "Check",
      pincode: "",
      unique_id: "",
    };
    this.Authorization = localStorage.getItem("Authorization");
    this.unique_id = "";
    this.uniqueColors = [];
    this.size_colors = [];
    this.uniqueSizes = [];
    this.size = "";
    this.color = "";
  }

  productId = this.props.match.params.id;

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    this.props.dispatch(
      ProductActions.getItemListByMasterId(this.productId, "")
    );
    console.log(this.props.product_master_list);
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.success_message === "PRODUCT_MASTER_LIST_SUCCESS") {
      this.props.product_master_list.map((prod) => {
        if (this.uniqueColors.indexOf(prod.item_color) === -1) {
          this.uniqueColors.push(prod.item_color);
        }
      });

      this.props.product_master_list.map((prod) => {
        if (this.uniqueSizes.indexOf(prod.item_size) === -1) {
          this.uniqueSizes.push(prod.item_size);
        }
      });
      this.uniqueSizes = this.uniqueSizes.sort(function (a, b) {
        return a - b;
      });
      this.size = this.uniqueSizes[0];

      this.props.product_master_list.map((prod) => {
        if (prod.item_size === this.size) {
          this.size_colors.push(prod.item_color);
          // this.color = prod.item_color;
          // return true
        }
      });
      this.color = this.size_colors.length > 0 ? this.size_colors[0] : "";

      this.props.product_master_list.some((prod) => {
        if (prod.item_size === this.size && prod.item_color === this.color) {
          // localStorage.setItem("product_id", prod.id);
          this.unique_id = prod.id;
          // this.setState({ unique_id: prod.id });
          return true;
        }
      });

      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      this.props.dispatch(ProductActions.empty_message());
      this.props.dispatch(
        ProductActions.getProductDetails(this.productId, this.unique_id)
      );
      this.props.dispatch(
        ProductActions.getProductImages(this.productId, this.unique_id)
      );
      this.props.dispatch(
        ProductActions.getProductDescriptionList(this.productId, this.unique_id)
      );
      // this.props.dispatch(ProductActions.getProductquantity(this.productId));
      this.props.dispatch(
        ProductActions.getProductquantity(this.productId, this.unique_id)
      );
      console.log(this.props.product_quantity);
    }

    if (this.props.cart_message === "CART_ITEM_UPDATED") {
      this.props.dispatch(ProductActions.getCartList());
      this.props.dispatch(ProductActions.empty_message());
    }
    if (this.props.success_message === "CART_SUCCESS") {
      this.props.dispatch(
        ProductActions.getProductquantity(this.productId, this.unique_id)
      );
      this.props.dispatch(ProductActions.empty_message());
    }
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  product_slider = (x) => {
    this.setState({ product_slider: x });
  };
  addtocart_function = () => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    // let cart_id = localStorage.getItem("product_id");
    let cart_id = this.productId;
    // this.props.dispatch(
    //   ProductActions.addtocart(cart_id, this.color, this.size)
    // );
    if (this.Authorization !== null) {
      this.props.dispatch(ProductActions.addtocartdb(this.unique_id, "plus"));
      this.props.dispatch(ProductActions.getCartList());
    } else {
      this.props.dispatch(ProductActions.addToCartLocal(this.unique_id));
    }

    this.props.dispatch(
      ProductActions.getProductquantity(this.productId, this.unique_id)
    );
  };
  addtocart_increment = () => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    // let increment_id = this.productId;
    if (this.Authorization) {
      this.props.dispatch(
        ProductActions.addtocartdb(this.unique_id, "plus", "CART_ITEM_UPDATED")
      );
    } else {
      this.props.dispatch(
        ProductActions.addToCartIncrementLocal(this.unique_id)
      );
    }
    this.props.dispatch(
      ProductActions.getProductquantity(this.productId, this.unique_id)
    );
  };

  addtocart_decrement = () => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    // let decrement_id = this.productId;
    if (this.Authorization) {
      this.props.dispatch(
        ProductActions.addtocartdb(this.unique_id, "minus", "CART_ITEM_UPDATED")
      );
    } else {
      this.props.dispatch(
        ProductActions.addToCartDecrementLocal(this.unique_id)
      );
    }
    this.props.dispatch(
      ProductActions.getProductquantity(this.productId, this.unique_id)
    );
  };
  handle_buy_navigate = () => {
    if (this.props.product_quantity === 0) {
      this.addtocart_function();
    }
    this.props.history.push("/CheckOut");
  };

  productChange = (size, color) => {
    if (size === "" && color === "") return;
    if (color) this.color = color;
    if (size) this.size = size;

    this.size_colors = [];

    this.props.product_master_list.map((prod) => {
      if (prod.item_size === this.size) {
        this.size_colors.push(prod.item_color);
        // this.color = prod.item_color;
        // return true
      }
    });
    if (this.size_colors.indexOf(this.color) === -1) {
      this.color = this.size_colors.length > 0 ? this.size_colors[0] : "";
    }

    this.props.product_master_list.some((prod) => {
      if (prod.item_size === this.size && prod.item_color === this.color) {
        // localStorage.setItem("product_id", prod.id);
        this.unique_id = prod.id;
        // this.setState({ unique_id: prod.id });
        return true;
      }
    });
    // localStorage.setItem("product_id", '');
    console.log("this.unique_id");
    console.log(this.unique_id);
    this.props.dispatch(
      ProductActions.getProductDetails(this.productId, this.unique_id)
    );
    this.props.dispatch(
      ProductActions.getProductImages(this.productId, this.unique_id)
    );
    this.props.dispatch(
      ProductActions.getProductDescriptionList(this.productId, this.unique_id)
    );
    this.props.dispatch(
      ProductActions.getProductquantity(this.productId, this.unique_id)
    );
    // this.componentDidMount();
  };

  pinhandleChange = (event) => {
    this.setState({ pincode: event.target.value });
  };
  // pincode_changeHandle

  pincode_changeHandle = () => {
    this.setState({ pincode_label: "Check" });
  };
  pincode_change = () => {
    // this.setState({ pincode: "Check" })
    if (this.state.pincode === "") return;
    if (this.state.pincode_label === "Check") {
      this.props.dispatch({ type: "IS_LOADING", is_loading: true });
      this.props.dispatch(
        ProductActions.getItemListByMasterId(this.productId, this.state.pincode)
      );

      this.setState({ pincode_label: "Change" });
      // this.state.pincode_label = "Change";
    } else {
      this.setState({ pincode_label: "Check" });
      this.setState({ pincode: "" });
    }
  };

  // pincode_changeHandle

  render() {
    let { product_slider, rating } = this.state;

    if (product_slider === "") {
      product_slider =
        this.props.products_image_list.length === 0
          ? this.props.product_new_data.image_address
          : this.props.products_image_list[0];
    }

    const RelatedProducts = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // autoplay: true,

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
      ],
    };
    const Product_slider = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // autoplay: true,

      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
      ],
    };
    return (
      <div>
        <HeaderNavbar />
        <PageLoading isLoadingComplete={this.props.is_loading} />

        <section
          className="product_description section_padding_top_bottom"
          id="product_description"
        >
          <Container>
            <Row>
              <Col md={4}>
                <div className="product_card">
                  <InnerImageZoom
                    src={product_slider}
                    zoomSrc={product_slider}
                    zoomType="hover"
                  />
                </div>

                <div>
                  <div className="common_pading_10">
                    <Row>
                      <Col md={12}>
                        <Slider {...Product_slider}>
                          {(this.props.products_image_list || []).map(
                            (x, index) => {
                              return (
                                <div
                                  className="product_slider product_slider_margin"
                                  key={index}
                                >
                                  <div
                                    className="product_card"
                                    onClick={() => {
                                      this.product_slider(x);
                                    }}
                                  >
                                    <img
                                      src={x}
                                      className="img-fluid"
                                      alt="Best Ecommerce natureraise"
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </Slider>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>

              <Col md={5}>
                <div className="product_heading">
                  <h5>{this.props.product_new_data.item_name}</h5>
                  <div className="product_reviews_container">
                    <div className="product_start">
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={rating}
                      />
                    </div>
                    <div>
                      <h6 className="product_reviews">20 reviews</h6>
                    </div>
                  </div>

                  <h6>with 25 Years* Warranty</h6>

                  <div className="product_rank_wrapper">
                    <div className="product_rank">
                      Best seller
                      <span className="product_rank_arrow"></span>
                    </div>
                    <h6>in Solar panels</h6>
                  </div>

                  <div className="product_price">
                    {this.props.product_new_data.retail_price ===
                    this.props.product_new_data.selling_price ? (
                      <div className="product_amount">
                        <h6 className="product_special_price">
                          &#8377; {this.props.product_new_data.selling_price}
                        </h6>
                        <h6 className="product_retail_price">
                          &#8377; {this.props.product_new_data.retail_price}
                        </h6>
                      </div>
                    ) : (
                      <div className="product_amount">
                        <h6 className="product_special_price">
                          &#8377; {this.props.product_new_data.special_price}
                        </h6>
                        <h6 className="product_retail_price">
                          &#8377; {this.props.product_new_data.retail_price}
                        </h6>
                        <h6 className="product_selling_price">
                          {/* &#8377; {this.props.product_new_data.selling_price} */}
                        </h6>
                      </div>
                    )}
                    <div className="product_save">
                      <h6>save {this.props.product_new_data.percentage}%</h6>
                    </div>

                    <div className="product_info_tooltip_wrap">
                      <img
                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/info-basic_6c1a38.svg"
                        alt="products"
                        className="img-fluid"
                      />
                      <span className="product_info_tooltip_content">
                        <div>
                          <div>
                            <h3 className="product_info_title">
                              Price Details
                            </h3>
                          </div>
                          <div className="product_info_special_price">
                            <h3>
                              Maximum retail price: <br />{" "}
                              <span>(inc of all taxes)</span>
                            </h3>
                            <h3 className="product_info_text_strike">
                              &#8377;{this.props.product_new_data.retail_price}
                            </h3>
                          </div>
                          <div className="product_info_special_price retail_underline">
                            <h3>selling price: </h3>
                            <h3 className="product_info_text_strike">
                              &#8377;{this.props.product_new_data.selling_price}
                            </h3>
                          </div>
                          <div className="product_info_special_price special_price_underline ">
                            <h3 className="product_info_special_title">
                              {" "}
                              special price:{" "}
                            </h3>
                            <h3>{this.props.product_new_data.special_price}</h3>
                          </div>
                          <div className="product_info_special_price saving_amount ">
                            <h3 className="product_info_special_title">
                              Overall you save &#8377;
                              {this.props.product_new_data.retail_price -
                                this.props.product_new_data.selling_price}
                              ({this.props.product_new_data.percentage} %) on
                              this product{" "}
                            </h3>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="product_size_wrapper">
                    <div className="product_size_wrapper_inner">
                      <h5 className="product_size_title">size</h5>
                      {this.uniqueSizes.map((item, index) => {
                        return (
                          <h6
                            className={this.size === item ? "active_size" : ""}
                            onClick={() => {
                              this.productChange(item, "");
                            }}
                            key={index}
                          >
                            {item}
                          </h6>
                        );
                      })}
                    </div>
                  </div>
                  <div className="product_color_wrapper">
                    <div className="product_color_wrapper_inner">
                      <h5 className="product_color_title">Color</h5>
                      {this.uniqueColors.map((item, index) => {
                        return (
                          <div
                            onClick={() => {
                              this.size_colors.indexOf(item) === -1
                                ? this.productChange("", "")
                                : this.productChange("", item);
                            }}
                            className={
                              "product_color_wrapper_box " +
                              (this.color === item ? "active_color" : "") +
                              (this.size_colors.indexOf(item) === -1
                                ? "disable_color"
                                : "")
                            }
                            key={index}
                            style={{ backgroundColor: item }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="product_delivery_wrapper">
                    <div className="product_delivery_inner">
                      <h5 className="product_delivery_title">Delivery</h5>
                      <div className="product_delivery_input_wrapper">
                        <Form.Control
                          className="product_pincode_input"
                          type="text"
                          placeholder="Pincode"
                          value={this.state.pincode}
                          onChange={this.pinhandleChange}
                          disabled={this.state.pincode_label === "Change"}
                        />
                        <div className="product_delivery_map">
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="product_delivery_button">
                          <h5 onClick={this.pincode_change}>
                            {this.state.pincode_label}
                          </h5>
                        </div>
                        {this.props.product_new_data.availability ===
                        "false" ? (
                          this.state.pincode !== "" &&
                          this.state.pincode_label !== "Check" ? (
                            <span className="red_color"> Not available</span>
                          ) : (
                            <></>
                          )
                        ) : this.state.pincode !== "" &&
                          this.state.pincode_label !== "Check" ? (
                          <>
                            <span className="green_color">
                              {" "}
                              Product available for this pincode
                            </span>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* <div className="product_check_label">
                        <div className="product_check_pincode_label">Check</div>
                        <i className="fa fa-close product_check_close" aria-hidden="true"></i>
                        <div className="product_check_arrow"></div>
                      </div> */}
                    </div>
                  </div>
                  <div className="product_summary">
                    <h2>Product Summary</h2>
                    <p>
                      Solar panels are those devices which are used to absorb
                      the sun's rays and convert them into electricity or heat.
                      Description: A solar panel is actually a collection of
                      solar (or photovoltaic) cells, which can be used to
                      generate electricity through photovoltaic effect.
                    </p>
                  </div>

                  <div className="product_seller_name_wrapper">
                    Best Seller
                    <span></span>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="product_quan_wrap">
                  {this.props.product_quantity === 0 ? (
                    <div
                      className={
                        "product_button " +
                        (this.props.product_new_data.availability !== "true" &&
                        this.state.pincode_label === "Change"
                          ? "is-disabled"
                          : "")
                      }
                      onClick={this.addtocart_function}
                    >
                      <p>Add To Cart</p>
                    </div>
                  ) : (
                    <div className="product_qunatity">
                      <i
                        className="fa fa-minus"
                        aria-hidden="true"
                        onClick={this.addtocart_decrement}
                      ></i>
                      <p>{this.props.product_quantity}</p>

                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={this.addtocart_increment}
                      ></i>
                    </div>
                  )}

                  <div
                    className={
                      "product_button " +
                      (this.props.product_new_data.availability !== "true" &&
                      this.state.pincode_label === "Change"
                        ? "is-disabled"
                        : "")
                    }
                    onClick={this.handle_buy_navigate}
                  >
                    <p>Buy Now</p>
                  </div>
                </div>
                {this.props.product_quantity >= 1 && (
                  <div className="product_total_wrapper">
                    <p>
                      <span className="product_total_title">Total </span>:{" "}
                      <span className="product_total_quantity">
                        {this.props.product_quantity} &#215;{" "}
                        {this.props.product_new_data.special_price === "0.00"
                          ? this.props.product_new_data.selling_price * 1
                          : this.props.product_new_data.special_price * 1}
                      </span>{" "}
                      ={" "}
                      <span className="product_total_amount">
                        {this.props.product_quantity *
                          1 *
                          (this.props.product_new_data.special_price === "0.00"
                            ? this.props.product_new_data.selling_price * 1
                            : this.props.product_new_data.special_price *
                              1)}{" "}
                      </span>
                    </p>
                  </div>
                )}

                {/* <div className="product_social_wrapper">
                  <p>Share this</p>
                  <div className="">
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/natureraisetechnologies/"
                          target={"_blank"}
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/NatureriseT"
                          target={"_blank"}
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/natureraise54/"
                          target={"_blank"}
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UCD2l9MJdYLndkIqJG5VHByw?disable_polymer=true"
                          target={"_blank"}
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-youtube" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
                <br></br>
                <div>
                  <div className="product_seller">
                    <p className="product_sell_heading">
                      Other Seller Natureraise
                    </p>
                    <div className="product_seller_card">
                      <div className="product_seller_amount">
                        <h6>₹ 16,599.00</h6>
                        <span className="product_seller_add">Add to Cart</span>
                      </div>
                      <div className="product_seller_description">
                        <p>Free Delivery</p>
                        <p>Sold by: Great Indian Sale</p>
                      </div>
                    </div>
                    <div className="product_seller_card">
                      <div className="product_seller_amount">
                        <h6>₹ 16,599.00</h6>
                        <span className="product_seller_add">Add to Cart</span>
                      </div>
                      <div className="product_seller_description">
                        <p>Free Delivery</p>
                        <p>Sold by: Great Indian Sale</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container></Container>
        </section>

        <section
          className="product_tab_section section_padding_top_bottom"
          id="product_tab_section"
        >
          <Container>
            <Row>
              <Col md={9} lg={9} xl={8}>
                <Tabs id="uncontrolled-tab-example">
                  {this.props.product_descriptions_list.map((data, y) => {
                    return (
                      <Tab
                        eventKey={data.description_title}
                        title={data.description_title}
                        key={y}
                      >
                        <div className="product_tab_container">
                          {parse(data.description_details)}
                        </div>
                      </Tab>
                    );
                  })}
                </Tabs>
              </Col>

              <Col md={3} lg={3} xl={4}>
                <div className="review_wrapper">
                  <div>
                    <h4>Add A Review</h4>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                  </div>
                  <div>
                    <Form>
                      <div className="review_start_wrap">
                        <h6>Your rating</h6>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={rating}
                          onStarClick={this.onStarClick.bind(this)}
                        />
                      </div>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Title *"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          placeholder="Your Comments *"
                          rows={3}
                        />
                      </Form.Group>
                      <div className="review_button_wrapper">
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="related_products" id="related_products">
          <Container>
            <Row>
              <Col md={12} xl={12}>
                <div className="related_products">
                  <h3>Related Products</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Slider {...RelatedProducts}>
                  {(this.props.product_list_data.slice(0, 5) || []).map(
                    (x, index) => {
                      return (
                        <ProductCard
                          id={x.id}
                          key={index}
                          percentage={x.percentage}
                          navigate_function={() => {
                            this.props.history.push(x.id);
                          }}
                          item_name={x.item_name}
                          special_price={x.special_price}
                          selling_price={x.selling_price}
                          retail_price={x.retail_price}
                        />
                      );
                    }
                  )}
                </Slider>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product_new_data: state.ProductActions.product_data || [],
    product_list_data: state.ProductActions.product_list || [],
    product_master_list: state.ProductActions.product_master_list || [],
    products_image_list: state.ProductActions.products_image_list || [],
    product_descriptions_list:
      state.ProductActions.product_descriptions_list || [],
    cart_product_list: state.ProductActions.cart_product_list || [],
    total_amount: state.ProductActions.total_amount,
    product_quantity: state.ProductActions.product_quantity,
    is_loading: state.ProductActions.is_loading,
    success_message: state.ProductActions.success_message,
    error_message: state.ProductActions.error_message,
  };
};

export default connect(mapStateToProps, null)(ProductDescription1);
