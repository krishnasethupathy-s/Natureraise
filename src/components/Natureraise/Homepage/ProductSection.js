import React from "react";

import { Link } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import ProductCard from "../Common/Components/ProductCard/ProductCard";

const ProductSection = ({
  settings,
  images,
  data,
  title,
  id,
  adPlacement,
  addToCart,
}) => {
  return (
    <section className="product-list-wrapper" id="product-list-wrapper">
      <Container>
        <Row>
          <Col md={12}>
            <div className="our-collection-heading-wrap">
              <h6>{title}</h6>
              {/* <Link
                to={`/Products/${id}?range=100&range=100000&search=&sort=1`}
                className="text-dark"
              >
                <h6>Show More</h6>
              </Link> */}
            </div>
          </Col>
        </Row>
        <Row>
          {adPlacement && (
            <Col md={3} xs={12} xl={2}>
              <div className="brand-slider-offer">
                {/* <Link
                  to={`/Products/${id}?range=100&range=1000000&search=&sort=1`}
                > */}
                <img src={images} alt="natureraise" className="img-fluid" />
                {/* </Link> */}
              </div>
            </Col>
          )}
          <Col md={9} xs={12} xl={10}>
            <div className="product-card-mobile">
              <Slider {...settings}>
                {data.map((x) => {
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
                      image={x.image_address}
                      special_price={x.special_price}
                      selling_price={x.selling_price}
                      retail_price={x.retail_price}
                      addToCart={() => addToCart(x.id, x.product_price_id)}
                    />
                  );
                })}
              </Slider>
            </div>
          </Col>
          {!adPlacement && (
            <Col md={3} xs={12} xl={2}>
              <div className="brand-slider-offer">
                {/* <Link
                  to={`/Products/${id}?range=100&range=1000000&search=&sort=1`}
                > */}
                <img src={images} alt="natureraise" className="img-fluid" />
                {/* </Link> */}
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ProductSection;
