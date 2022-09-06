import React, { Component } from "react";
import { Row, Container, Col, Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "./BlogDetails.css";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import Config from "../../Config";
import http from "../../http_common";
import parse from "html-react-parser";
import * as Moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Facebook from "../mincomponent/Facebook/Facebook";
import * as AccountData from "../Natureraise/Footer/constant/AccountData/AccountData";
export default class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news_data: [],
      news_list: [],
      type: "news",
      email_id: "",
      btn_id: "add",
      btn_disable: false,
      toast_show: false,
      auto_hide: false,
      recent_data: [],
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);

    localStorage.setItem("property_id", "");
    this.GetNewsBlogData();
    this.RecentPost();
  }
  get_component_reload() {
    this.componentDidMount();
  }

  async GetNewsBlogData() {
    try {
      const blog_id = localStorage.getItem("blog_id");
      const form_Data1 = JSON.stringify({ blog_id });
      let response = await fetch(Config.BaseUrl + "GetBlogData/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: form_Data1,
      });
      let responseJsonData = await response.json();
      this.setState({ news_data: responseJsonData });
      console.log(responseJsonData);

      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  async RecentPost() {
    try {
      let response = await fetch(Config.BaseUrl + "AllBlogList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      let responseJsonData = await response.json();
      this.setState({ news_list: responseJsonData });
      let news_blogdata = [];
      let news_all_data = responseJsonData;
      for (let i = 0; i < news_all_data.length; i++) {
        if (i < 3) {
          news_blogdata.push(news_all_data[i]);
        }
      }
      this.setState({ recent_data: news_blogdata });
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  Recent_Navigate = (id) => {
    localStorage.setItem("news_blog_id", id);
    this.get_component_reload();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onchange_Checkbox_Handler = () => {
    this.setState((prevState) => ({
      btn_disable: !prevState.btn_disable,
    }));
  };

  handlesubmitnewsletter = (event) => {
    event.preventDefault();
    const { type } = this.state;
    const { email_id } = this.state;
    const { btn_id } = this.state;
    const form_Data1 = JSON.stringify({
      type,
      email_id,
      btn_id,
    });
    const formData = new FormData();
    formData.append("json", form_Data1);

    http
      .post("/AddSubscriber", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data["message"] === "SUCCESS") {
          this.setState({ email_id: "" });
          toast.success("Thank You");
          this.setState({ toast_show: true, btn_disable: false });
          setTimeout(() => {
            this.setState({ toast_show: false });
          }, 2000);

          //  alert("Thank YouSubscribe")
        } else {
          alert("error");
        }
      })
      .catch((error1) => {
        alert(error1);

        console.error(error1);
      });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>
            {this.state.news_data.heading ?? "Blog Detail"} | Natureraise
          </title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta
            property="og:description"
            content={`${this.state.news_data.heading} page`}
          />
        </Helmet>

        <div>
          <HeaderInnerNavbar />
          <section
            className="blog-description-section"
            id="blog-description-section"
          >
            <Container>
              <Row>
                <Col md={8} xl={8} lg={8}>
                  <div className="blog-image_container">
                    <img
                      src={this.state.news_data.image_address}
                      alt="news"
                      className="img-fluid w-100"
                    />
                  </div>

                  <div className="blog-description-title">
                    <div className="blog-padding-10">
                      <h4>{this.state.news_data.heading}</h4>
                    </div>
                    <div className="blog-padding-10">
                      {this.state.news_data.length === 0 ? (
                        <p>Please Wati</p>
                      ) : (
                        <p>{parse(this.state.news_data.details)}</p>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={4} xl={4} lg={4}>
                  <div className="sticky-top">
                    <div className="social-link-card">
                      <div className="content-padding-10">
                        <h3>Social Links</h3>
                        <div className="social-link-container">
                          <ul>
                            {AccountData.SOCIAL_LINK.map((data, idx) => (
                              <li key={idx}>
                                <a
                                  href={data.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i
                                    class={data.icon_name}
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                            ))}
                            {/* <li>
                              <i
                                class="fa fa-facebook-square"
                                aria-hidden="true"
                              ></i>
                            </li>
                            <li>
                              <i class="fa fa-instagram" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i class="fa fa-whatsapp" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i
                                class="fa fa-youtube-square"
                                aria-hidden="true"
                              ></i>
                            </li>
                            <li>
                              <i class="fa fa-linkedin" aria-hidden="true"></i>
                            </li> */}
                          </ul>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="Recent-post-blog">
                      <h3>Recent Posts</h3>

                      {this.state.recent_data.map((data) => {
                        return (
                          <div key={data.id} className="recent-post-image">
                            <img src={data.image_address} alt="news" />
                            <div>
                              <h6
                                onClick={() => {
                                  this.Recent_Navigate(data.id);
                                }}
                              >
                                {data.heading}
                              </h6>
                              <span>
                                {Moment(data.entry_date).format("MM-DD-YYYY")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      {/* <Toast show={this.state.toast_show} delay={2000} autohide={this.state.auto_hide}/> */}

                      <div>
                        <ToastContainer position="bottom-right" />
                      </div>
                    </div>

                    <div className="new-letter-section">
                      <div className="content-padding-10">
                        <h3>Newsletter</h3>

                        <p>
                          Subscribe to our newsletter and get our newest updates
                          right on your inbox.
                        </p>
                        <div>
                          <Form onSubmit={this.handlesubmitnewsletter}>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Control
                                type="email"
                                name="email_id"
                                onChange={this.handleChange}
                                required
                                placeholder="Enter email"
                                value={this.state.email_id}
                              />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                              <Form.Check
                                type="checkbox"
                                label="I agree to the terms & conditions"
                                onChange={this.onchange_Checkbox_Handler}
                                checked={this.state.btn_disable}
                              />
                            </Form.Group>
                            <Button
                              variant="primary w-100 Hiring_Button"
                              type="submit"
                              disabled={!this.state.btn_disable}
                            >
                              Subscribe
                            </Button>
                          </Form>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Col md={12} xl={12} lg={12} className="facebook_iframe">
                        <Facebook />
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <Footer />
        </div>
      </>
    );
  }
}
