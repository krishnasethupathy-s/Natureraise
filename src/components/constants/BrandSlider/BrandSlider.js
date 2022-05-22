import React, { Component } from 'react';
import Slider from "react-slick";
import { Container, Col, Row, } from "react-bootstrap";

import './BrandSlider.css'

export default class BrandSlider extends Component {
  render() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    return (
        <section className={this.props.brand_section} id={this.props.brand_section} >
        <Container>
          <Row>
            <Col md={12}>
              <Slider {...settings}>
                {this.props.brandimages.map((brand_data, brandid) => {
                  return (
                    <div key={brandid} className={this.props.brand_image_wrapper}>
                      <img
                        src={brand_data.product_image}
                        className="img-fluid"
                        alt="brand_images"
                      />
                    </div>
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
