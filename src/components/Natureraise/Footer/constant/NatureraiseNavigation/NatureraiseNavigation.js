import React from "react";
import "./NatureraiseNavigation.css";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const NatureraiseNavigation = (props) => {
  return (
    <div className="footer_about_wrapper">
      <h3>About us</h3>
      <Row>
        <Col md={6}>
          <div className="footer_list_anchor">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>Profile</li>
              <li>Career Page</li> */}
              <li>
                {" "}
                <Link to="/About">Company</Link>
              </li>
              <li>
                {" "}
                <Link to="/Blog">Blog</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className="footer_list_anchor">
            <ul>
              <li>
                <Link to="/Faq">FAQs</Link>
              </li>

              <li>
                <Link to="/Contact">Contact Us</Link>
              </li>
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
