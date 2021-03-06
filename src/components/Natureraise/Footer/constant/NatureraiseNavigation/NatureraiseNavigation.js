import React from "react";
import "./NatureraiseNavigation.css";
import { Link } from 'react-router-dom';
import { Col, Row} from "react-bootstrap";

const NatureraiseNavigation = (props) => {
  return (
    <div className="footer_about_wrapper">
      <h3>About us</h3>
      <Row>
        <Col md={6}>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Career Page</li>
            <li>Company</li>
          </ul>
        </Col>
        <Col md={6}>
          <div className="footer_list_anchor">
            <ul>
              <li>
                <Link to="/Faq">FAQs</Link>
              </li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>
                <Link to="/PrivacyPolicy">Terms Of Use</Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NatureraiseNavigation;
