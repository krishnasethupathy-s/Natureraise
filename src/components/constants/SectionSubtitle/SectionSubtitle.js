import React, { Component } from 'react';
import {Container,Col,Row,Form,Button} from "react-bootstrap";
import './SectionSubtitle.css'

export default class Sectionsubtitle extends Component {
  render() {
    return (
  <div className="section_title_section" id="section_title_section">
      <Container>
             <Row>
                 <Col md={12}>
               <div className="service_heading">
               <span className="service_title">{this.props.title}</span>
               <h3 className="service_subtitle">{this.props.subtitle}</h3>
               <div className="service_common_height"></div>
               <p className="service_description">{this.props.description}</p>
               </div>
               <span className="service_doubline">{this.props.doublestring} </span>
                 </Col>
             </Row>

         </Container>
  </div>
    );
  }
}
