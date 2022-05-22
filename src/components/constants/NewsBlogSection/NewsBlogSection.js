import React, { Component } from "react";
import { Row, Container, Col, Card, Button } from "react-bootstrap";
import "./NewBlogSection.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Config from "../../../Config";
import {  withRouter} from "react-router-dom";
import * as Moment from 'moment';


 class NewsBlogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news_list: [],
    };
  }

  componentDidMount()
  {
     this.fetchPropertyList();
}

  async fetchPropertyList() {
    try {
      let response = await fetch(Config.BaseUrl + "AllNewsList/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      let responseJsonData = await response.json();
      this.setState({ news_list: responseJsonData });
     
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  }

  news_navigate =(id)=>
  {

    localStorage.setItem('news_blog_id',id);
    this.props.history.push('/NewsDetails');
  }

  render() {
    const Newstestimonial = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
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
  
    return (
      <section className="news-blog-section" id="news-blog-section">
        <div className="NewBlogSectionWrapper">
          <Container>
            <Row>
              <Col md={12} className="text-center">
                <span className="sub_headings_underling">News And Updates</span>
                <h2>Popular Posts</h2>
              </Col>

              <Col md={12} className="new-testimonial-card">
                {
                  this.state.news_list.length === 0 ?
             
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                        <p>Please Wait</p>
                    </div>
                     :
               
                <Slider {...Newstestimonial}>
                  {this.state.news_list.map((data,index) => {
                    return (
                      <div key={index} className="News_Blog_Card">
                        <Card>
                          <Card.Img
                            variant="top"
                            src={data.image_address}
                          />
                          <Card.Body>
                            <Card.Title>{data.heading}</Card.Title>
                            <p>
                            {data.description.slice(0,60)+"...."}
                            {/* {parse(data.details)} */}
                          
                            </p>
                       
                         
                          </Card.Body>
                          <div className="News-Blog_Read">
                            <span className="pb-2"> {Moment(data.entry_date).format("MM-DD-YYYY")}</span>
                           
                              <span  onClick={()=>{this.news_navigate(data.id)}} className="read-more-buton" >READ MORE</span>{" "}
                             
                            </div>
                        </Card>
                      </div>
                    );
                  })}
                </Slider>
                 
                }
              </Col>

              <Col md={12} className="text-center news-blog-showbutton">
                <Link to="/BlogList">
                  <Button variant="primary show_button" type="submit">
                    Show All
                  </Button>{" "}
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}
export default withRouter(NewsBlogSection);