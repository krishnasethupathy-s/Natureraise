import React, { Component } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import "./GstInformation.css";
import Config from "../../../Config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import images from "../../constants/images";
import { connect } from "react-redux";

class GstInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan_number: "",
      gst_number: "",
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    this.setState({
      pan_number: localStorage.getItem("pan_number") ?? "",
      gst_number: localStorage.getItem("gst_number") ?? "",
    });

    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    e.preventDefault();
    const Authorization = localStorage.getItem("Authorization");
    const { gst_number, pan_number } = this.state;
    const mutation = `mutation GstUpdation(
      $Authorization:String, 
      $gst_number:String,  
      $pan_number:String
      ) {
          GstUpdation(
            Authorization:$Authorization, 
            gst_number:$gst_number, 
            pan_number:$pan_number,
        ){
              message,
          }
      }`;

    fetch(Config.BaseUrl + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          Authorization,
          gst_number,
          pan_number,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        if (responseText.data.GstUpdation["message"] === "SUCCESS") {
          this.setState({ isLoadingComplete: false });
          toast.success("Successfully Added");

          this.props.dispatch({ type: "IS_LOADING", is_loading: false });

          localStorage.setItem("pan_number", this.state.pan_number);
          localStorage.setItem("gst_number", this.state.gst_number);
        } else {
          toast.success(responseText.data.GstUpdation["message"]);
          this.props.dispatch({ type: "IS_LOADING", is_loading: false });
        }
      })
      .catch((error) => {
        toast.success(error);
        this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>GST Information | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta property="og:description" content="GST Information Page" />
        </Helmet>
        <div className="personal-information-wrapper">
          <Container>
            <Row>
              <Col md={12} className="Personal_Information_Heading">
                <h6>GST Information</h6>
                <Form name="form" onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formBasicGst">
                        <Form.Label>Gst Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.gst_number}
                          placeholder="Gst Number *"
                          name="gst_number"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Pan Number</Form.Label>
                      <Form.Group controlId="formBasicPan">
                        <Form.Control
                          type="text"
                          value={this.state.pan_number}
                          placeholder="Pan Number *"
                          name="pan_number"
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Col md={12} className="Mobile_Button_container">
                    <div className="Submit_Button_Section">
                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="MyAccount_Update_Button"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Form>
              </Col>
            </Row>
            <Row>
              <img
                src={images.Account_Bottom}
                alt="RealEsate"
                className="img-fluid w-100"
              />
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.AddCustomerAddress.message,
    error_msg: state.AddCustomerAddress.error_msg,
  };
};

export default connect(mapStateToProps, null)(GstInformation);
