import React, { Component } from "react";
import "./CheckOut.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import images from "../../constants/images";
import Footer from "../Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bs-stepper/dist/css/bs-stepper.min.css";
import Stepper from "bs-stepper";
import { connect } from "react-redux";
import * as ProductActions from "../store/actions/Product/ProductActions";
import MyVerticallyCenteredModal from "../../constants/PopModal/ModalComponent";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as AddCustomerAddress from "../../Natureraise/store/actions/UserProfile/CustomerAddress";
import Config from "../../../Config";
import { gql } from "@apollo/client";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      package_type: "0",
      button_disable: true,
      address_form: false,
      modal_show: false,
      cart_remove_product_id: "",
      order_amount: this.props.total_amount,
      coupon_code_value: "",
      address_data: [],

      address_id: "",
      contact_name: "",
      mobile_number: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      type: "0",

      delivery_address_id:''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(AddCustomerAddress.empty_message());
    this.get_CustomerAddress_List();
    if (this.props.cart_product_list.length !== 0) {
      this.stepper = new Stepper(document.querySelector("#stepper1"), {
        linear: true,
        animation: true,
      });
    }
    this.props.dispatch({type: "COUPON_VALIDATION",coupon_amount: 0});
  }
  get_CustomerAddress_List=()=>
  {
    this.props.dispatch(AddCustomerAddress.getCustomerAddressList());
  }

  handle_address_form = () => {
    this.setState((prevState) => ({
      address_form: !prevState.address_form,
    }));
    this.setState({ state: "" ,contact_name:'', mobile_number:'',address_line1:'',address_line2:'',city:'',pincode:'',landmark:'',type:'0'});
  };

  addtocart_increment = (id) => {
    let increment_id = id;
    this.props.dispatch(ProductActions.addtocart_increment(increment_id));
  };

  addtocart_decrement = (id) => {
    let decrement_id = id;
    this.props.dispatch(ProductActions.addtocart_decrement(decrement_id));
  };

  handle_hide_model = () => {
    this.setState({ modal_show: false });
  };

  remove_cart_item = (item) => {
    this.setState({ modal_show: true });
    this.setState({
      cart_remove_product_id: item.id,
      modal_show_product_name: item.item_name,
    });
  };

  handle_to_delete_record = () => {
    let remove_id = this.state.cart_remove_product_id;
    this.props.dispatch(ProductActions.remove_cart_item(remove_id));
    this.setState({ modal_show: false });
  };

  

  couponcode_handler = (e) => {
    this.setState({ coupon_code_value: e.target.value });
  };

  validate_coupon_function = () => {
    const { order_amount, coupon_code_value } = this.state;
    this.props.dispatch(
      ProductActions.validateCouponCode(order_amount, coupon_code_value)
    );
  };


  componentDidUpdate = () => {
    if (this.props.message === "ADD_SUCCESS_MESSAGE") {
      this.get_CustomerAddress_List();
      toast.success("Successfully Added");
      this.setState((prevState) => ({
        address_form: !prevState.address_form,
      }));
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "DELETE_SUCCESS_MESSAGE") {
      this.get_CustomerAddress_List();
      toast.success("Successfully Deleted");
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "ADD_ERROR_MESSAGE") {
      // toast.success("Some Network Issue");
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "ADD_CATCH_MESSAGE") {
      // toast.success("Some Network Issue");
      this.props.dispatch(AddCustomerAddress.empty_message());
    }else if (this.props.message === "Successfully Applied") {
      toast.success(this.props.message);
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "Not Valid") {
      toast.error(this.props.error_msg);
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "Minimum") {
      toast.error(this.props.error_msg);
      this.props.dispatch(AddCustomerAddress.empty_message());
    } 
  };

  AddCustomerAddress = async (e) => {
    e.preventDefault();
    const {
          address_id,
          contact_name,
          mobile_number,
          address_line1,
          address_line2,
          city,
          state,
          pincode,
          landmark,
          type,
        } = this.state;
    await this.props.dispatch(AddCustomerAddress.addCustomerAddress(
      address_id,
      contact_name,
      mobile_number,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      landmark,
      type,
      )
    );

  };

  Radio_Onchange = () => {
    if (this.state.type === "0") {
      this.setState({ type: "1" });
    } else {
      this.setState({ type: "0" });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  delivery_address_function =(id)=>
  {
    if(this.state.delivery_address_id===id)
    {
    this.setState({delivery_address_id:""});

    }else{
      this.setState({delivery_address_id:id});
    }
 
  }

      // Get CustomerData
      
      getCustomerAddressData(id) {
        const Authorization = localStorage.getItem("Authorization");
    
        const query = gql`
          query getCustomerAddressData($Authorization: String, $id: ID) {
            getCustomerAddressData(Authorization: $Authorization, id: $id) {
              id
              contact_name
              mobile_number
              address_line1
              address_line2
              city
              state
              pincode
              landmark
              type
            }
          }
        `;
    
        Config.client
          .query({
            query: query,
            fetchPolicy: "no-cache",
            variables: { Authorization, id },
          })
          .then((result) => {
            this.setState({ address_id: result.data.getCustomerAddressData["id"] });
            this.setState({
              contact_name: result.data.getCustomerAddressData["contact_name"],
            });
            this.setState({
              mobile_number: result.data.getCustomerAddressData["mobile_number"],
            });
            this.setState({
              address_line1: result.data.getCustomerAddressData["address_line1"],
            });
            this.setState({
              address_line2: result.data.getCustomerAddressData["address_line2"],
            });
            this.setState({ city: result.data.getCustomerAddressData["city"] });
            this.setState({ state: result.data.getCustomerAddressData["state"] });
            this.setState({
              pincode: result.data.getCustomerAddressData["pincode"],
            });
            this.setState({
              landmark: result.data.getCustomerAddressData["landmark"],
            });
            this.setState({ type: result.data.getCustomerAddressData["type"] });
          })
          .catch((error) => {
            alert(error);
          });
      }
    
    
      // End Get Customer Data

      handletoAddressEdit = (id) => {

        let customer_object=this.props.address_data.filter(item=>item.id===id);
    
        this.setState({ address_id: customer_object[0]["id"] });
        this.setState({
          contact_name: customer_object[0]["contact_name"],
        });
        this.setState({
          mobile_number: customer_object[0]["mobile_number"],
        });
        this.setState({
          address_line1:customer_object[0]["address_line1"],
        });
        this.setState({
          address_line2: customer_object[0]["address_line2"],
        });
        this.setState({ city: customer_object[0]["city"] });
        this.setState({ state: customer_object[0]["state"] });
        this.setState({
          pincode: customer_object[0]["pincode"],
        });
        this.setState({
          landmark: customer_object[0]["landmark"],
        });
        this.setState({ type: customer_object[0]["type"] });
    
        this.setState((prevState) => ({
          address_form: !prevState.address_form,
        }));
      };
    

// Add Payment Action

// AddingPaymentFunction = () => {
//   const Authorization = localStorage.getItem("Authorization");
//   const { } = this.state;
//   let amount="500"

//   const form_Data1 = JSON.stringify({
  
//   });
//   const formData = new FormData();
//   formData.append("json", form_Data1);
//   this.props.dispatch({ type: "IS_LOADING", is_loading: true });
//   this.props.dispatch(UserAction.AddSessionBooking(formData));
// };

// razorpayPaymentDisplay = (res) => {
//   var options = {
//     key: "rzp_test_2Sqj6jogVPWQKw",
//     amount: this.state.amount,
//     currency: "INR",
//     name: "Natureraise",
//     description: "Natureraise Online",
//     image: images.dabble_logo,
//     order_id: res,
//     handler: this.orderPaymentChecking,
//     prefill: {
//       name: localStorage.getItem("last_name"),
//       email: localStorage.getItem("email_id"),
//       contact: localStorage.getItem("contact_number"),
//     },
//     notes: {
//       address: "note value",
//     },
//     theme: {
//       color: "#e22024",
//     },
//   };

//   let rzp = new window.Razorpay(options);
//   rzp.open();
// };

// orderPaymentChecking = (data) => {
//   const Authorization = localStorage.getItem("Authorization");
//   const razorpay_payment_id = data.razorpay_payment_id;
//   const razorpay_order_id = data.razorpay_order_id;
//   const razorpay_signature = data.razorpay_signature;
//   const schedule_time_id = this.state.schedule_time_id;

  
//   const form_Data1 = JSON.stringify({
//     Authorization,
//     razorpay_payment_id,
//     razorpay_order_id,
//     razorpay_signature,
//     schedule_time_id
//   });
//   const formData = new FormData();
//   formData.append("json", form_Data1);

//   this.props.dispatch(UserAction.SessionBookingPaymentChecking(formData));
// };




  render() {
    const { address_form, modal_show, modal_show_product_name } = this.state;
    return (
      <div>
        <HeaderNavbar />
        <MyVerticallyCenteredModal
          title="Remove Item ?"
          subtitle={modal_show_product_name}
          cancel_title="CANCEL"
          delete_title="DELETE"
          show={modal_show}
          handle_delete_record={this.handle_to_delete_record}
          handleClose={this.handle_hide_model}
        />
        {this.props.cart_product_list.length === 0 ? (
          <div className="check_out_no_record_wrapper">
            <Container>
              <Row>
                <Col md={{ span: 8, offset: 2 }} lg={8}>
                  <div className="check_out_no_record_cards">
                    <img
                      src="https://image.flaticon.com/icons/png/512/102/102661.png"
                      alt="cart"
                    />
                    <p>Your Cart is Empty</p>
                    <span>Add something to make me happy :)</span>
                    <Link to="/">
                      <div className="check_out_shopping_button">
                        <h6>Continue Shopping</h6>
                      </div>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <div className="check_out_section section_padding_top_bottom">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="check_out_title">
                    <h3>Check Out</h3>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <div id="stepper1" className="bs-stepper">
                    <div className="bs-stepper-header">
                      <div className="step" data-target="#test-l-1">
                        <button className="step-trigger">
                          <span className="bs-stepper-circle">1</span>
                          <span className="bs-stepper-label">
                            Shopping Cart
                          </span>
                        </button>
                      </div>
                      <div className="line"></div>
                      <div className="step" data-target="#test-l-2">
                        <button className="step-trigger">
                          <span className="bs-stepper-circle">2</span>
                          <span className="bs-stepper-label">
                            Shopping Details
                          </span>
                        </button>
                      </div>
                      <div className="line"></div>
                      <div className="step" data-target="#test-l-3">
                        <button className="step-trigger">
                          <span className="bs-stepper-circle">3</span>
                          <span className="bs-stepper-label">Payments</span>
                        </button>
                      </div>
                    </div>

                    <div className="bs-stepper-content">
                      <Form className="Form_Box">
                        <div id="test-l-1" className="content">
                          <div className="checkout_heading">
                            {this.props.cart_product_list.length ===
                            0 ? null : (
                              <h3>
                                Shopping Cart (
                                {this.props.cart_product_list.length})
                              </h3>
                            )}
                          </div>
                          {this.props.cart_product_list.map((item, i) => {
                            return (
                              <div className="checkout_list">
                                <Row>
                                  <Col md={12}>
                                    <Row className="checkout_product_wrap">
                                      <Col md={2} xs={4}>
                                        <img
                                          src={images.product_image4}
                                          alt="natureraise"
                                          className="img-fluid product_image"
                                          onClick={() => {
                                            this.handle_to_product_navigate(
                                              item.id
                                            );
                                          }}
                                        />
                                      </Col>

                                      <Col
                                        md={4}
                                        xs={8}
                                        className="checkout_title_wrapper"
                                      >
                                        <div className="checkout_title">
                                          <h6>{item.item_name}</h6>

                                          {item.retail_price ===
                                          item.selling_price ? (
                                            <div className="product_amount_wrapper">
                                              <h6 className="product_amount_color">
                                                {item.special_price}
                                              </h6>
                                              <h6 className="product_amount_color1">
                                                ₹ {item.retail_price}{" "}
                                              </h6>
                                              <h6 className="product_percentage">
                                                {item.percentage}% off
                                              </h6>
                                            </div>
                                          ) : (
                                            <div className="product_amount_wrapper">
                                              <h6 className="product_amount_color">
                                                {item.special_price}
                                              </h6>
                                              <h6 className="product_amount_color1">
                                                ₹ {item.retail_price}{" "}
                                              </h6>
                                              <h6 className="product_amount_color1">
                                                ₹ {item.selling_price}{" "}
                                              </h6>
                                              <h6 className="product_percentage">
                                                {item.percentage}% off
                                              </h6>
                                            </div>
                                          )}
                                          <Row>
                                          <Col
                                        md={6}
                                        xs={8}
                                        className="checkout_title_wrapper"
                                      >
                                          <div className="product_size_wrapper">
                                          <div className="product_size_wrapper_inner">
                                            <h5 className="product_size_title">size</h5>
                                            
                                                <h6 
                                                className='active_size'>{item.item_size}</h6>
                                              
                                          </div>
                                        </div>

                                      </Col>
                                      <Col
                                        md={6}
                                        xs={8}
                                        className="checkout_title_wrapper"
                                      >
                                        <div className="product_color_wrapper">
                                        <div className="product_color_wrapper_inner">
                                          <h5 className="product_color_title">Color</h5>
                                          
                                              <div                                                
                                                className={"product_color_wrapper_box active_color"}                                                                                               
                                                style={{ backgroundColor: item.item_color }}
                                              ></div>
                                            
                                        </div>
                                      </div>
                                      </Col>
                                          </Row>
                                          
                                        
                                          
                                        </div>
                                        
                                      </Col>

                                      <Col
                                        md={3}
                                        xs={5}
                                        className="checkout_increment"
                                      >
                                        <div className="checkout_inner_wrap">
                                          <i
                                            class={
                                              item.card_quantity === 1
                                                ? "fa fa-minus disabled_icons"
                                                : "fa fa-minus"
                                            }
                                            aria-hidden="true"
                                            onClick={() => {
                                              this.addtocart_decrement(item.id);
                                            }}
                                          ></i>
                                          <span>{item.card_quantity}</span>
                                          <i
                                            class="fa fa-plus"
                                            aria-hidden="true"
                                            onClick={() => {
                                              this.addtocart_increment(item.id);
                                            }}
                                          ></i>
                                        </div>
                                      </Col>

                                      <Col
                                        md={2}
                                        xs={5}
                                        className="checkout_increment"
                                      >
                                        <div>
                                          <h6>
                                            {" "}
                                            {item.card_quantity *
                                              1 *
                                              item.special_price *
                                              1}
                                          </h6>
                                          {/* <h6>₹{this.props.total_amount}</h6> */}
                                        </div>
                                      </Col>
                                      <Col
                                        md={1}
                                        xs={2}
                                        className="checkout_increment"
                                      >
                                        <div>
                                          <i
                                            class="fa fa-trash-o"
                                            aria-hidden="true"
                                            data-toggle="Delete"
                                            data-placement="top"
                                            title="Delete!"
                                            onClick={() => {
                                              this.remove_cart_item(item);
                                            }}
                                          ></i>
                                        </div>
                                        
                                      </Col>
                                    </Row>
                                    
                                  </Col>
                                </Row>
                              </div>
                            );
                          })}

                          <div className="check_out_button_end">
                            <Button
                              type="button"
                              variant="primary "
                              // onClick={this.payment_order_function}
                              onClick={() => this.stepper.next()}
                            >
                              PLACE TO ORDER
                            </Button>
                          </div>
                        </div>
                        <div id="test-l-2" className="content">
                          <div className="checkout_heading">
                            <h3>Address List</h3>
                          </div>

                          <div className="Checkout_address_wrapper">
                            <h6>ADD A NEW ADDRESS</h6>
                            <span onClick={this.handle_address_form}>
                              {" "}
                              {!address_form ? "Add" : "Hide"}{" "}
                              <i
                                onClick={this.handle_address_form}
                                class={
                                  !address_form
                                    ? "fa fa-plus-circle"
                                    : "fa fa-minus-circle"
                                }
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                          {address_form && (
                            <Row>
                              <Col md={12}>
                                <Form  onSubmit={this.AddCustomerAddress}>
                                  <div className="py-4 checkout_address_form">
                                    <Row>
                                      <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Label>Name</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Name *"
                                            value={this.state.contact_name}
                                            name="contact_name"
                                            onChange={this.handleChange}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Label>Mobile Number</Form.Label>

                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Number *"
                                            value={this.state.mobile_number}
                                            name="mobile_number"
                                            onChange={this.handleChange}
                                            required
                                            minLength="10"
                                            maxLength="10"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Label>
                                            Address Line-1
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Address Line-1*"
                                            value={this.state.address_line1}
                                            name="address_line1"
                                             onChange={this.handleChange}
                                             required
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Label>Address Line-2</Form.Label>

                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Address Line-2*"
                                            value={this.state.address_line2}
                                            name="address_line2"
                                            onChange={this.handleChange}
                                            required
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Label>City</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Your City*"
                                            value={this.state.city}
                                            name="city"
                                            onChange={this.handleChange}
                                            required
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Label>State</Form.Label>

                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Control
                                            type="text"
                                            placeholder="Your State*"
                                            value={this.state.state}
                                            name="state"
                                            onChange={this.handleChange}
                                            required
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Label>Pincode</Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Pincode*"
                                            value={this.state.pincode}
                                            name="pincode"
                                            onChange={this.handleChange}
                                            required
                                            minLength="6"
                                            maxLength="6"
                                            
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col md={6}>
                                        <Form.Label>Landmark</Form.Label>

                                        <Form.Group controlId="formBasicEmail">
                                          <Form.Control
                                            type="text"
                                            placeholder="Your Landmark*"
                                            value={this.state.landmark}
                                            name="landmark"
                                            onChange={this.handleChange}
                                            required
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col md={6}>
                                        <Form.Label>Type</Form.Label>
                                        <div className="checkout_radio_wrapper">
                                        <Form.Check
                                            type="radio"
                                            label="Home"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            checked={this.state.type === "0"}
                                            onClick={this.Radio_Onchange}
                                          />
                                          <Form.Check
                                            type="radio"
                                            label="Office"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            checked={this.state.type === "1"}
                                            onClick={this.Radio_Onchange}
                                          />
                                        </div>
                                      </Col>

                                      <Col md={12}>
                                        <Form.Label></Form.Label>
                                        <div className="checkout_submit_wrapper">
                                          <Button
                                            variant="primary"
                                            type="submit"
                                          >
                                            Submit
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </Form>
                              </Col>
                            </Row>
                          )}
                          {
                            
                            this.state.address_form===false &&
                             this.props.address_data.map((data, index) => (
                               
                           
                               <Row className="Checkout_address_card_padding">

                              <Col md={12} className="Checkout_address_card">
                              <div className="Checkout_address_type">
                                <h6> {data.type === "0" ? "Home" : "Office"}</h6>
                                <Form.Check type="checkbox"
                                 checked={this.state.delivery_address_id===data.id} onChange={()=>{this.delivery_address_function(data.id)}}   />
                              </div>
                              <div>
                                <Row>
                                  <Col md={8}>
                                    <div className="checkout_addreslist">
                                      <h6>{data.contact_name}</h6>
                                      <h6>{data.mobile_number}</h6>
                                    </div>
                                    <div className="checkout_addreslist1">
                                      <h6> {data.address_line1} {data.address_line2} {data.city} {data.state} {data.landmark} {data.pincode} </h6>
                              

                                    </div>
                                  </Col>
                                </Row>
                              </div>
  
                              <div className="Checkout_address_type" onClick={() =>
                                      this.handletoAddressEdit(data.id)}>
                                <h6>
                                  <span>
                                    <i   onClick={() =>
                                      this.handletoAddressEdit(data.id)
                                    } class="fa fa-edit" aria-hidden="true"></i>
                                  </span>{" "}
                                  Edit
                                </h6>
                              </div>
                            </Col>
                            </Row>


                              ))}
                          
                      

                          <div className="Checkout_Button_Container">
                            <div>
                              <Button
                                type="button"
                                variant="primary"
                                onClick={() => this.stepper.to(1)}
                              >
                                Previous
                              </Button>
                            </div>

                            <div>
                              <Button
                                type="button"
                                variant="primary"
                                onClick={() => this.stepper.next()}
                                disabled={this.state.delivery_address_id===""}
                                // disabled={this.state.button_disable}
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div id="test-l-3" className="content">
                          <div className="Quotes_Button_Container">
                            <div>

                            <div className="checkout_heading">
                            <h3>How would you like to pay ?</h3>
                          </div>

                          <div className="checkout_payment_wrapper">
                            <div className="checkout_inner_wrapper">
                            <img src="https://www.pngfind.com/pngs/m/415-4153789_credit-card-aggregator-visa-hd-png-download.png"
                            alt="natureraise" className="img-fluid" />
                            </div>
                            <div className="checkout_inner_wrapper">
                            <img src="https://www.freepnglogos.com/uploads/paypal-logo-png-4.png"
                            alt="natureraise" className="img-fluid" />
                            </div>
                            <div className="checkout_inner_wrapper">
                            <img src="https://lh3.googleusercontent.com/proxy/jFlwr9ISj-dezInKhDoLWeroEjXZC_g1tXNA8pTSRrYKDDFvzz5hwLKajU7qiQ1JTOUV3c3xuFuMA8zQSEaiZ5YqKT0I8tQhg1BgXG3PjIwnYH-7hEvdeC8OswOdM7ehGxCbiQ"
                            alt="natureraise" className="img-fluid" />
                            </div>
                            <div className="checkout_inner_wrapper">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Giropay.svg/1200px-Giropay.svg.png"
                            alt="natureraise" className="img-fluid" />
                           </div>
                     
                          
                                 
                      
                          </div>
                              <div>
                               <div className="checkout_delivery_card">
                               <Form.Check
                                  type="radio"
                                  label="Cash On Delivery"
                                  name="formHorizontalRadios"
                                  id="formHorizontalRadios1"
                                />
                               <img src="https://www.hilaptop.com/userdata/public/gfx/84bc164e4577a32233b0291e1fc84888.jpg"
                               className="img-fluid" alt="cash on delivery" />
                               </div>
                               <div className="checkout_delivery_card">

                               
                                <Form.Check
                                  type="radio"
                                  label="Online"
                                  name="formHorizontalRadios"
                                  id="formHorizontalRadios2"
                                />
                                 <img src="http://pngimg.com/uploads/credit_card/credit_card_PNG207.png"
                               className="img-fluid" alt="cash on delivery" />
                              </div>
                              </div>
                            </div>
                            <div className="stepper_online_cash_wrapper">
                              <div>
                                <Button
                                  type="button"
                                  variant="primary"
                                  onClick={() => this.stepper.to(2)}
                                >
                                  Previous
                                </Button>
                              </div>
                              <div>
                                <Button
                                  type="submit"
                                  variant="primary"
                                  onClick={() => this.stepper.next()}
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Col>

                <Col md={4}>
                  {this.props.cart_product_list.length === 0 ? (
                    <div></div>
                  ) : (
                    <div className="summary_card sticky-top">
                      <h3>Summary</h3>
                      {this.props.coupon_validation_amount === 0 ? (
                        <div className="summary_coupon_code">
                          <h6>Enter Coupon Code</h6>
                          <div>
                            <div className="summary_coupon_button_wrapper">
                              <Form>
                                <Form.Group controlId="formBasicEmail">
                                  <Form.Control
                                    onChange={this.couponcode_handler}
                                    name="coupon_code_value"
                                    type="text"
                                    placeholder="Coupon Code *"
                                  />
                                </Form.Group>
                              </Form>

                              <div className="summary_coupon_button">
                                <p onClick={this.validate_coupon_function}>
                                  Apply
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="summary_amount">
                        <div>
                          <h6>
                            Price({this.props.cart_product_list.length} items)
                          </h6>
                          <h6>₹ {this.props.mrp_amount}</h6>
                        </div>
                        <div>
                          <h6>Discount</h6>
                          <h6>₹ {this.props.save_amount}</h6>
                        </div>
                        <div>
                          <h6>Coupons for you</h6>
                          <h6>₹ {this.props.coupon_validation_amount}</h6>
                        </div>
                        <div>
                          <h6>Delivery Charges</h6>
                          <h6>Free</h6>
                        </div>
                      </div>
                      <div className="summary_total">
                        <h6>Total</h6>
                        <h6>
                          ₹
                          {this.props.total_amount -
                            this.props.save_amount -
                            this.props.coupon_validation_amount}
                        </h6>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.ProductActions.cart_product_list);
  return {
    cart_product_list: state.ProductActions.cart_product_list || [],
    total_amount: state.ProductActions.total_amount,
    product_quantity: state.ProductActions.product_quantity,
    save_amount: state.ProductActions.save_amount,
    mrp_amount: state.ProductActions.mrp_amount,
    coupon_validation_amount: state.ProductActions.coupon_validation_amount,
    message: state.AddCustomerAddress.message,
    error_msg: state.AddCustomerAddress.error_msg,
    address_data: state.AddCustomerAddress.address_data || [],
    form_action: state.AddCustomerAddress.form_action,


  };
};

export default connect(mapStateToProps, null)(CheckOut);
