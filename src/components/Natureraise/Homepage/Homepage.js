import React, { Component } from "react";

import "./Homepage.css";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";
import BrandSlider from "../../constants/BrandSlider/BrandSlider";
import { connect } from "react-redux";
import * as Banner from "../store/actions/Sitedata/Banner";
import * as ProductActions from "../store/actions/Product/ProductActions";
import * as AccountData from "../../constants/AccountData";
import Slider from "react-slick";
import ProductCard from "../Common/Components/ProductCard/ProductCard";

import DeliveryProcess from "../Common/Components/DeliveryProcess/DeliveryProcess";
import SecondOfferSection from "../Common/Components/SecondOfferSection/SecondOfferSection";
import PageLoading from "../../constants/PageLoader/PageLoading";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner_list: [],
      isLoadingComplete: true,
      rating: 1,
      isLoading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(Banner.fetchBanners());
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  }

  // navigate product list page
  navigate_function = (item) => {
    localStorage.setItem("product_id", item.id);
    this.props.history.push(`/ProductDescription/${item.id}`);
  };

  // add to cart Function
  add_to_card = (id) => {
    if (this.props.product_quantity === 0) {
      this.addtocart_function(id);
    }
    this.props.history.push("/CheckOut");
  };

  addtocart_function = (id) => {
    let cart_id = id;
    this.props.dispatch(ProductActions.addtocart(cart_id));
  };
  // add to cart Function

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            // infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 1450,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            // infinite: true,
            dots: false,
            centerPadding: "30px",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
      ],
    };
    var featuresilder = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 1450,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,

            // infinite: true,
            dots: false,
          },
        },

        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // infinite: true,
            dots: false,
          },
        },

        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // infinite: true,
          },
        },
      ],
    };

    return (
      <div>
        <HeaderNavbar />
        <PageLoading isLoadingComplete={this.props.is_loading} />

        <div>
          <Carousel>
            {this.props.banner_list.map((image, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100 banner-image-size"
                    src={image}
                    // src="https://cdn.shopify.com/s/files/1/2980/5140/articles/Main_Banner_Design_1800x_a5ed6c61-aa26-4e7d-87d7-8eb95d63f1fd_2x.jpg?v=1610512794"
                    alt="natureraise"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>

        <section>
          <DeliveryProcess deliveryprocess={AccountData.DELIVERY_PROCESS} />
        </section>

        <section className="product-list-wrapper" id="product-list-wrapper">
          <Container>
            <Row>
              <Col md={12}>
                <div className="our-collection-heading-wrap">
                  <h6>Featured products new update</h6>
                  <h6>View all</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={3} xs={12} xl={2}>
                <div className="brand-slider-offer">
                  <img
                    src={images.brand_images}
                    alt="natureraise"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col md={9} xs={12} xl={10}>
                <div className="product-card-mobile">
                  <Slider {...settings}>
                    {(this.props.product_list_data.slice(0, 12) || []).map(
                      (x) => {
                        return (
                          <ProductCard
                            className={`mr-2`}
                            key={x.id}
                            id={x.id}
                            percentage={x.percentage}
                            navigate_function={() => {
                              this.navigate_function(x);
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
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="our-collection-section" id="our-collection-section">
          <Container>
            <Row>
              <Col md={12}>
                <div className="our-collection-heading-wrap">
                  <h6>Our collections</h6>
                  <h6>View all</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <BrandSlider
                  brand_section="brand-section"
                  brand_image_wrapper="brand-image-wrapper"
                  brandimages={AccountData.SLIDER_IMAGE}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="offers-section" id="offers-section">
          <Container>
            <Row>
              <Col md={12} lg={12} xl={12}>
                <Row>
                  <Col md={4}>
                    <div className="offer-banner-wrap">
                      <img
                        src={images.offer_banner1}
                        alt="Natureraise"
                        className="img-fluid"
                      />
                    </div>
                    <div className="offer-banner-wrap">
                      <img
                        src={images.offer_banner2}
                        alt="Natureraise"
                        className="img-fluid"
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="offer-banner-wrap">
                      <img
                        src={images.offer_banner3}
                        alt="Natureraise"
                        className="img-fluid"
                      />
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="offer-banner-wrap">
                      <img
                        src={images.offer_banner4}
                        alt="Natureraise"
                        className="img-fluid"
                      />
                    </div>
                    <div className="offer-banner-wrap">
                      <img
                        src={images.offer_banner5}
                        alt="Natureraise"
                        className="img-fluid"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="product-list-wrapper" id="product-list-wrapper">
          <Container>
            <Row>
              <Col md={12}>
                <div className="our-collection-heading-wrap">
                  <h6>Top Offers</h6>
                  <h6>View all</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={3} xs={12} xl={2}>
                <div className="brand-slider-offer">
                  <img
                    src="https://www.solarclue.com/image/catalog/Sub-Banner/square-banner/Solar-Inverter.png"
                    alt="natureraise"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col md={6} xs={12} xl={8}>
                <div className="product-card-mobile">
                  <Slider {...featuresilder}>
                    {(this.props.product_list_data.slice(0, 12) || []).map(
                      (x) => {
                        return (
                          <ProductCard
                            className={`mr-2`}
                            key={x.id}
                            id={x.id}
                            percentage={x.percentage}
                            navigate_function={() => {
                              this.navigate_function(x);
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
                </div>
              </Col>
              <Col md={3} xs={12} xl={2}>
                <div className="brand-slider-offer">
                  <img
                    src="https://www.solarclue.com/image/catalog/Sub-Banner/square-banner/Solar-Inverter.png"
                    alt="natureraise"
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="offers-second-section" id="offers-second-section">
          <SecondOfferSection offersdata={AccountData.DELIVERY_PROCESS} />
        </section>

        <section className="product-list-wrapper" id="product-list-wrapper">
          <Container>
            <Row>
              <Col md={12}>
                <div className="our-collection-heading-wrap">
                  <h6>Recent View</h6>
                  <h6>View all</h6>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={3} xs={12} xl={2}>
                <div className="brand-slider-offer">
                  <img
                    src="https://www.solarclue.com/image/catalog/Sub-Banner/square-banner/Solar-Inverter.png"
                    alt="natureraise"
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col md={9} xs={12} xl={10}>
                <div className="product-card-mobile">
                  <Slider {...settings}>
                    {(this.props.product_list_data.slice(0, 12) || []).map(
                      (x, index) => {
                        return (
                          <ProductCard
                            className={`mr-2`}
                            key={index}
                            id={x.id}
                            percentage={x.percentage}
                            navigate_function={() => {
                              this.navigate_function(x);
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
                </div>
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
    banner_list: state.Banner.banner_list,
    is_loading: state.ProductActions.is_loading,
    product_list_data: state.ProductActions.product_list || [],
  };
};

export default connect(mapStateToProps, null)(HomePage);
