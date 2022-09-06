import React, { Component } from "react";
import { Row, Container, Col, Button, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "./BlogList.css";
import Footer from "../Natureraise/Footer/Footer";
import HeaderInnerNavbar from "../Natureraise/HeaderNavbar/HeaderNavbar";
import Config from "../../Config";
import Facebook from "../mincomponent/Facebook/Facebook";
import * as Moment from "moment";

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news_list: [],
      recent_data: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchPropertyList();
  }
  async fetchPropertyList() {
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
  news_navigate = (id) => {
    localStorage.setItem("blog_id", id);
    this.props.history.push("/BlogDetails");
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Blog | Natureraise</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="Blog Page" />
        </Helmet>
        <div>
          <HeaderInnerNavbar />
          <section className="news-list-container" id="news-list-container">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="news-list-title">
                    <p>Home</p>
                    <h2>
                      <span>Blogs</span>
                    </h2>
                  </div>
                </Col>
                <Col md={9} lg={9} xl={9} className="news-list-details">
                  <Row>
                    {this.state.news_list.map((data) => {
                      return (
                        <Col md={4} lg={4} xl={4} key={data.id}>
                          <div className="News_Blog_Card">
                            <Card>
                              <Card.Img
                                variant="top"
                                src={data.image_address}
                              />
                              <Card.Body>
                                <Card.Title>{data.heading}</Card.Title>
                                <Card.Text>
                                  {data.description.slice(0, 60) + "...."}
                                </Card.Text>
                              </Card.Body>
                              <div className="News-Blog_Read">
                                <span className="pb-2">
                                  {" "}
                                  {Moment(data.entry_date).format("MM-DD-YYYY")}
                                </span>
                                <span
                                  onClick={() => {
                                    this.news_navigate(data.id);
                                  }}
                                  className="read-more-buton"
                                >
                                  READ MORE
                                </span>{" "}
                              </div>
                            </Card>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
                <Col md={3} lg={3} xl={3}>
                  <div className="sticky-top">
                    <div className="Recent-post-blog ">
                      <h3>Recent Blogs</h3>
                      {this.state.recent_data.map((data) => {
                        return (
                          <div className="recent-post-image" key={data.id}>
                            <img
                              className="img-fluid"
                              src={data.image_address}
                              alt="news"
                            />
                            <div className="Recent-post-heading">
                              <h6
                                onClick={() => {
                                  this.news_navigate(data.id);
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
                    <div className="Twitter-container">
                      <Facebook />
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
