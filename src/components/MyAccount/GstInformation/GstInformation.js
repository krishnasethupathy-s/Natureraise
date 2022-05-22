import React, { Component } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import "./GstInformation.css";
import Config from "../../../Config";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import images from "../../constants/images";
import { connect } from "react-redux";


class GstInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      isLoadingComplete: true,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

    setTimeout(() => {
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }, 1000);
  }



  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.setState({ isLoadingComplete: true });
    e.preventDefault();
    const Authorization = localStorage.getItem("Authorization");
    const { first_name, last_name, mobile_number1, email_id } = this.state;
    const mutation = `mutation CustomerUpdation($email_id:String, $mobile_number1:String, $first_name:String, $last_name:String,  
                                          $Authorization:String ) {
                                            CustomerUpdation(email_id:$email_id, mobile_number1:$mobile_number1, first_name:$first_name, last_name:$last_name,
            Authorization:$Authorization){
              message
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
          email_id,
          mobile_number1,
          first_name,
          last_name,
          Authorization,
        },
      }),
    })
      .then((response) => response.json())

      .then((responseText) => {
        if (responseText.data.CustomerUpdation["message"] === "SUCCESS") {
          this.setState({ isLoadingComplete: false });
          toast.success("Successfully Added");
          localStorage.setItem('first_name',this.state.first_name);
          localStorage.setItem('last_name',this.state.last_name);
          localStorage.setItem('mobile_number1',this.state.mobile_number1);
          localStorage.setItem('email_id',this.state.email_id);
          setTimeout(() => {
        
          window.location.reload();
          }, 2000);
         
          
         
        } else {
          // alert(responseText.data.CustomerUpdation["message"]);
          toast.success(responseText.data.CustomerUpdation["message"]);
          setTimeout(() => {
        
            window.location.reload();
            }, 2000);
        }
      })
      .catch((error) => {
        toast.success(error);
     
      });
  };

  render() {
    return (
      <div className="personal-information-wrapper">
        <Container>
 
          <Row>
            <Col md={12} className="Personal_Information_Heading">
              <h6>GST Information</h6>
              <Form name="form" onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Gst Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.first_name}
                        placeholder="Gst Number *"
                        name="first_name"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Pan Number</Form.Label>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        value={this.state.last_name}
                        placeholder="Pan Number *"
                        name="last_name"
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