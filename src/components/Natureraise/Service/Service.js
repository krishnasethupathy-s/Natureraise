import React, { Component } from 'react';
import './Service.css';
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import Footer from "../Footer/Footer";
import {Container,Col,Row} from "react-bootstrap";
import images from "../../constants/images";
import SectionHeader from '../../constants/SectionHeader/SectionHeader';
import Sectionsubtitle from '../../constants/SectionSubtitle/SectionSubtitle';


export default class Service extends Component {
  render() {
    return (
     <section>
          <HeaderNavbar />
          <SectionHeader about_banner="service_banner" section_title="Service" section_subtitle="Service" />
          <div className="service_section section_padding_top_bottom" id="service_section">
          <Sectionsubtitle title="what we offer" subtitle="Awesome Services" doublestring="Offer"
          description="All functions including supply chain, value chain, project scheduling, manufacturing, services and spares, technology, R&D, etc. are integrated to give a complete solutions package." />
           
          <div className="service_gallery">
          <div className="service_common_height"></div>
              <Container>
                  <Row>
                      <Col md={3}>
                          <div className="service_wrap">
                              <div className="service_wrap_image">
                                  <img src={images.service_solar} alt="solarpanel" className="img-fluid"  />
                              </div>
                      <div className="services_content-wrap">
                      <h3 className="services_title">Enhanced Services</h3>
                      </div>
                          </div>
                      </Col>
                      <Col md={3} className="service_box2">
                         <div>
                          <img  src={images.service_image1} className="img-fluid" alt="natureraise"/>
                         </div>
                      </Col>
                      <Col md={3}>
                          <div className="service_wrap dark_bg_color">
                              <div className="service_wrap_image">
                                  <img src={images.service_solar} alt="solarpanel" className="img-fluid"  />
                              </div>
                      <div className="services_content-wrap">
                      <h3 className="services_title">Technical Service</h3>
                      </div>
                          </div>
                      </Col>
                      <Col md={3} className="service_box2">
                         <div>
                          <img  src={images.service_image2} className="img-fluid" alt="natureraise"/>
                         </div>
                      </Col>

                 
                      <Col md={3} className="service_box2">
                         <div>
                          <img  src={images.service_image3} className="img-fluid" alt="natureraise"/>
                         </div>
                      </Col>
                      <Col md={3}>
                          <div className="service_wrap green_bg_color">
                              <div className="service_wrap_image">
                                  <img src={images.service_solar} alt="solarpanel" className="img-fluid"  />
                              </div>
                      <div className="services_content-wrap ">
                      <h3 className="services_title">Maintenance Services</h3>
                      </div>
                          </div>
                      </Col>
                 
                      <Col md={3} className="service_box2">
                         <div>
                          <img  src={images.service_image4} className="img-fluid" alt="natureraise"/>
                         </div>
                      </Col>
                      <Col md={3}>
                          <div className="service_wrap">
                              <div className="service_wrap_image">
                                  <img src={images.service_solar} alt="solarpanel" className="img-fluid"  />
                              </div>
                      <div className="services_content-wrap">
                      <h3 className="services_title">Solar Panel Services</h3>
                      </div>
                          </div>
                      </Col>
                  </Row>

                
              </Container>

          </div>

          <div className="service_why section_padding_top_bottom" id="service_why" >
              <div className="service_wy_padding">

              <Container>
                  <Row>
                      <Col md={6}>

                         <div>
                         <img src={images.service_background} alt="solar panel" className="img-fluid"/>
                         </div>
                      </Col>
                      <Col md={6}>
                          <div className="service_wrapper">
                            <div className="service_wapper_title">
                            <span >why choose us</span>
                            </div>
                              <h3 className="service_wrapper_subtitle">Save the Planet by Using Renewable Energy</h3>

                              <p className="service_wrapper_description">
                              iRecco is among the world’s leading renewable energy solutions provider that is revolutionising and redefining the way sustainable energy sources are harnessed across the world. Present in 18 countries across Asia, Australia, Europe, Africa and the Americas, Veztaz is powering a greener tomorrow.
                              </p>
                              <Row>
                              <Col md={6}>

                        

                                <div className="service_image_wrapper">
                                <div>
                                <img src={images.solar_cell} alt="solar images"  />
                                </div>

                                <div>
                                <h3>18000+</h3>
                                <h6>INSTALLED CAPACITY</h6>
                                </div>
                                </div>

                              </Col>
                              <Col md={6}>
                              <div className="service_image_wrapper">
                                <div>
                                <img src={images.wind_energy} alt="solar images"  />
                                </div>
                                <div>
                                <h3>1200+</h3>
                                <h6>WTGS INSTALLED</h6>
                                </div>
                                </div>
                              </Col>
                          </Row>

                          </div>
                     
                          <span className="dbl_bg_text">Why Us</span>
                          
                          </Col>
                  </Row>
              </Container>
              </div>



          </div>


          <div className="price_plan_section section_padding_top_bottom" id="price_plan_section" >
          <Sectionsubtitle title="pricing tables" subtitle="Choose Your Best Service" doublestring="pricing"
          description="All functions including supply chain, value chain, project scheduling, manufacturing, services and spares, technology, R&D, etc. are integrated to give a complete solutions package." />
           <div className="price_plan_wrapper">

               <Container>
                   <Row>
                       <Col md={4}>
                           <div className="price_plan_card">
                            <div className="pricer_plan_header">
                            <div className="pricing_title_wrapper">
                             <div className="pricing_title">
                              <h4>Standard</h4>
                             </div>
                             <div className="pricing_amount">
                           <span>  Rs 120 / per mo</span>
                             </div>
                            </div>

                            <div className="pricing_content">
                                <ul>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Installation</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Repair & Replacement</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Monitoring Work</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Panel Maintence</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> 24/7 Skilled Support</li>
                                </ul>
                            </div>
                            <div className="pricing_button_wrapper">
                            <div className="pricing_button">
                            <span>Choose a plan</span>
                            </div>
                            </div>
                           
                            </div>
                           </div>
                       </Col>
                       <Col md={4}>
                       <div className="price_plan_card">
                       <div className="price_plan_best"><p>Best</p></div>
                            <div className="pricer_plan_header">
                            <div className="pricing_title_wrapper">
                             <div className="pricing_title">
                              <h4>Popular</h4>
                             </div>
                             <div className="pricing_amount">
                           <span>  Rs 220 / per mo</span>
                             </div>
                            </div>

                            <div className="pricing_content">
                                <ul>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Installation</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Repair & Replacement</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Monitoring Work</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Panel Maintence</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> 24/7 Skilled Support</li>
                                </ul>
                            </div>
                            <div className="pricing_button_wrapper">
                            <div className="pricing_button prcing_button_hightlight">
                            <span>Choose a plan</span>
                            </div>
                            </div>
                           
                            </div>
                           </div>
                       </Col>

                       <Col md={4}>
                       <div className="price_plan_card">
                         
                            <div className="pricer_plan_header">
                            <div className="pricing_title_wrapper">
                             <div className="pricing_title">
                              <h4>Premium</h4>
                             </div>
                             <div className="pricing_amount">
                           <span>  Rs 320 / per mo</span>
                             </div>
                            </div>

                            <div className="pricing_content">
                                <ul>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Installation</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Repair & Replacement</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Monitoring Work</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> Panel Maintence</li>
                                    <li><i class="fa fa-check" aria-hidden="true"></i> 24/7 Skilled Support</li>
                                </ul>
                            </div>
                            <div className="pricing_button_wrapper">
                            <div className="pricing_button ">
                            <span>Choose a plan</span>
                            </div>
                            </div>
                           
                            </div>
                           </div>
                           </Col>
                   </Row>
               </Container>

           </div>
          </div>

         </div>

      

          <Footer />
     </section>
    );
  }
}
