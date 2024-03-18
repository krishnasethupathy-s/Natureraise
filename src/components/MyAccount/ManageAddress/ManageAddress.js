import React, { Component } from "react";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import "./ManageAddress.css";

import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoading from "../../constants/PageLoader/PageLoading";
import * as AddCustomerAddress from "../../Natureraise/store/actions/UserProfile/CustomerAddress";
import { connect } from "react-redux";
import MyVerticallyCenteredModal from "../../constants/PopModal/ModalComponent";
import images from "../../constants/images";

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
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
      address_data: [],
      isLoadingComplete: true,
      modal_show: false,
      customer_address_id: "",
      customer_name_remove: "",
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    localStorage.setItem("property_id", "");
    this.get_CustomerAddress_List();
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
  }
  get_CustomerAddress_List = () => {
    this.props.dispatch(AddCustomerAddress.getCustomerAddressList());
  };

  handle_hide_model = () => {
    this.setState({ modal_show: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleViewBtnClick = () => {
    this.setState((prevState) => ({
      setOpen: !prevState.setOpen,
    }));

    this.setState({
      state: "",
      contact_name: "",
      mobile_number: "",
      address_line1: "",
      address_line2: "",
      city: "",
      pincode: "",
      landmark: "",
      type: "0",
    });
  };

  Radio_Onchange = () => {
    if (this.state.type === "0") {
      this.setState({ type: "1" });
    } else {
      this.setState({ type: "0" });
    }
  };

  componentDidUpdate = async () => {
    if (this.props.message === "ADD_SUCCESS_MESSAGE") {
      let success = await this.props.dispatch(
        AddCustomerAddress.empty_message()
      );
      if (success) {
        this.get_CustomerAddress_List();
        toast.success("Address Added");
        this.setState((prevState) => ({ setOpen: !prevState.setOpen }));
        this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      }
    } else if (this.props.message === "DELETE_SUCCESS_MESSAGE") {
      let success = await this.props.dispatch(
        AddCustomerAddress.empty_message()
      );
      if (success) {
        this.get_CustomerAddress_List();
        toast.success("Successfully Deleted");
        this.props.dispatch({ type: "IS_LOADING", is_loading: false });
      }
    } else if (this.props.message === "ADD_ERROR_MESSAGE") {
      // toast.success("Some Network Issue");
      this.props.dispatch(AddCustomerAddress.empty_message());
    } else if (this.props.message === "ADD_CATCH_MESSAGE") {
      // toast.success("Some Network Issue");
      this.props.dispatch(AddCustomerAddress.empty_message());
    }
  };

  AddCustomerAddressSubmit = async (e) => {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });

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
    console.log(
      address_id,
      contact_name,
      mobile_number,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      landmark,
      type
    );
    await this.props.dispatch(
      AddCustomerAddress.addCustomerAddress(
        address_id,
        contact_name,
        mobile_number,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        landmark,
        type
      )
    );
  };

  // End Get Customer Data

  // Delete Action

  // end Delete Action

  handletoAddressEdit = (id) => {
    let customer_object = this.props.address_data.filter(
      (item) => item.id === id
    );

    this.setState({ address_id: customer_object[0]["id"] });
    this.setState({
      contact_name: customer_object[0]["contact_name"],
    });
    this.setState({
      mobile_number: customer_object[0]["mobile_number"],
    });
    this.setState({
      address_line1: customer_object[0]["address_line1"],
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
      setOpen: !prevState.setOpen,
    }));
  };

  handletoDelete = (item) => {
    this.setState({ modal_show: true });
    this.setState({ customer_address_id: item.id });
    this.setState({ customer_name_remove: item.contact_name });
  };

  handle_to_delete_record = () => {
    const id = this.state.customer_address_id;
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    this.props.dispatch(AddCustomerAddress.deleteCustomerAddress(id));
    this.setState({ modal_show: false });
  };

  render() {
    const { modal_show, customer_name_remove } = this.state;
    return (
      <>
        <Helmet>
          <title>My Address | NatureSave</title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta
            property="og:description"
            content="User's can manage their address's"
          />
        </Helmet>{" "}
        <div className="manage-address-wrapper">
          <MyVerticallyCenteredModal
            title="Delete Record?"
            subtitle={customer_name_remove}
            cancel_title="CANCEL"
            delete_title="DELETE"
            show={modal_show}
            handle_delete_record={this.handle_to_delete_record}
            handleClose={this.handle_hide_model}
          />
          <Container>
            <Row>
              <Col md={12} className="MyAddress_Details_Section_Heading">
                <h6>Manage Address</h6>

                <Row>
                  <Col md={12} className="MyAddress_Border_Section">
                    <div>
                      <div className="MyAddress_Add_Section">
                        <h6 onClick={() => this.handleViewBtnClick()}>
                          ADD A NEW ADDRESS
                        </h6>

                        <i
                          className={
                            this.state.setOpen
                              ? "fa fa-minus-circle"
                              : "fa fa-plus-circle"
                          }
                          aria-hidden="true"
                          onClick={() => this.handleViewBtnClick()}
                        ></i>
                      </div>

                      {this.state.setOpen ? (
                        <Form onSubmit={this.AddCustomerAddressSubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group controlId="formGridName">
                                <Form.Label>Contact Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Contact Name"
                                  value={this.state.contact_name}
                                  name="contact_name"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formGridPhone">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Mobile Number"
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
                              <Form.Group controlId="formGridAddress1">
                                <Form.Label>Address Line-1</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line-1"
                                  value={this.state.address_line1}
                                  name="address_line1"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formGridAddress2">
                                <Form.Label>Address Line-2</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line-2"
                                  value={this.state.address_line2}
                                  name="address_line2"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter City"
                                  value={this.state.city}
                                  name="city"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter State"
                                  value={this.state.state}
                                  name="state"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formGridZip">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Pincode"
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
                              <Form.Group controlId="formGridLandmark">
                                <Form.Label>Landmark</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter landmark"
                                  value={this.state.landmark}
                                  name="landmark"
                                  onChange={this.handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <fieldset>
                                <Form.Group as={Row}>
                                  <Col
                                    sm={6}
                                    className="Radio_button_Container"
                                  >
                                    <Form.Check
                                      type="radio"
                                      label="Home"
                                      name="formHorizontalRadios"
                                      id="formHorizontalRadios1"
                                      checked={this.state.type === "0"}
                                      onChange={this.Radio_Onchange}
                                    />
                                    <Form.Check
                                      type="radio"
                                      label="Office"
                                      name="formHorizontalRadios"
                                      id="formHorizontalRadios2"
                                      checked={this.state.type === "1"}
                                      onChange={this.Radio_Onchange}
                                    />
                                  </Col>
                                </Form.Group>
                              </fieldset>
                            </Col>

                            <div className="Submit_Button_Section">
                              <Button
                                variant="outline-primary Hiring_Button"
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </Row>
                        </Form>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                {}

                {this.props.address_data.map((item, index) => (
                  <Row key={index}>
                    <Col md={12} className="Address_Details_Border_Section">
                      <div className="Address_Details_Main_Section">
                        <div className="Address_Details_Type">
                          <h6>{item.type === "0" ? "Home" : "Office"}</h6>
                        </div>
                        <div>
                          <i
                            className="fa fa-pencil"
                            aria-hidden="true"
                            onClick={() => this.handletoAddressEdit(item.id)}
                          ></i>
                          <i
                            className="fa fa-trash ml-2"
                            aria-hidden="true"
                            color="red"
                            onClick={() => this.handletoDelete(item)}
                          ></i>
                        </div>
                      </div>
                      <Row>
                        <Col md={4}>
                          <div className="Address_Name_Details_Section">
                            <h6>{item.contact_name}</h6>
                            <h6>{item.mobile_number}</h6>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <div className="Address_Full_Details_Section">
                            <h6>
                              {item.address_line1} {item.address_line2}{" "}
                              {item.city} {item.state} &nbsp;
                              {item.landmark} {item.pincode}{" "}
                            </h6>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
                <img
                  src={images.Account_Bottom}
                  className="img-fluid w-100"
                  alt="RealEsate"
                />
              </Col>
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
    address_data: state.AddCustomerAddress.address_data || [],
    form_action: state.AddCustomerAddress.form_action,
  };
};

export default connect(mapStateToProps, null)(ManageAddress);
