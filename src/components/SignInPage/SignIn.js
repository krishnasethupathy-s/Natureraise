import React, { Component } from 'react';

import './SignIn.css';
import Footer from '../Natureraise/Footer/Footer';
import HeaderInnerNavbar from '../Natureraise/HeaderNavbar/HeaderNavbar';
import { Container, Col, Row, Button, Jumbotron, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PageLoading from '../constants/PageLoader/PageLoading';
import * as UserActions from '../Natureraise/store/actions/User/UserActions';
import { toast } from "react-toastify";

class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lastname: '',
            password: '',
            client_ip: '',
            redirect: false,
            isLoadingComplete: true,


        };
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        // localStorage.clear();
        this.getIP().then(data => {
            this.setState({ client_ip: data['ip'] });
        });
        setTimeout(() => {
          this.setState({   isLoadingComplete: false,})
          }, 1000);

    }


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async getIP() {
        const response = await fetch('https://api64.ipify.org/?format=json');
        const data = await response.json();
        return data;
    }
    componentDidUpdate=()=>
    {
        if (this.props.message === 'SUCCESS') {
            this.props.dispatch(UserActions.empty_message())
          this.navigate_function();
        }
        else if(this.props.error_msg==="Invalid Crediental")
        {
            toast.error(this.props.error_msg);
            this.props.dispatch(UserActions.empty_message())
        }
        else if(this.props.message==="0")
        {
            toast.error(this.props.error_msg);
        }
       
    }
    handleSubmit = async(e) => {
        e.preventDefault();
        const { username, password, client_ip } = this.state;
        await this.props.dispatch(UserActions.SignInAction(username, password, client_ip));
       
    };
    navigate_function =()=>
    {this.props.history.push('/'); 
    }
 

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to="/" />
        // }
     
        return (

            <section>
                 {/* {
                        this.state.isLoadingComplete ?
                        <PageLoading />
                          : null
                    } */}

               <PageLoading isLoadingComplete={this.state.isLoadingComplete} />
                <HeaderInnerNavbar />
             
                <div id="SignIn_Main_Section">
                    <Jumbotron fluid className="text-center">
                        <Container >
                            <div className="SingIn_title_wrapper">
                            <div className="SignIn_Section" >
                                <ul className="Inner_nav">
                                    <li><a href="/"><i className="fa fa-sign-in"></i> Home</a></li>
                                    <Link to="/SignUp">
                                        <li><a ><i class="fa fa-user-circle-o" ></i> SignUp</a></li>
                                    </Link>
                                </ul>
                            </div>
                            </div>

                        </Container>
                    </Jumbotron>
                </div>
                <div className="SignIn_Form_Section">
              
                    <Container>
                        <Row>
                        <Col md={3}>
                            </Col>

                            <Col md={6}>

                           
                             <span className="center_double_line">LOGIN </span>
                                <div className="form_card_details">
                                    <h1> Login Here</h1>
    
                                <Form name="form" onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Your Email *" name="username" onChange={this.handleChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Your Password *" name="password" onChange={this.handleChange} required />
                                    </Form.Group>
                                
                                    <Button variant="primary" type="submit" className="SignIn">
                                        Login</Button>

                                        <div className="ortext ">
                                            <h6>Or</h6>
                                        </div>
                                        <div className="sign_in_socialicons">
                                    <ul>
                                        <li><i class="fa fa-google" aria-hidden="true"></i></li>
                                        <li><i class="fa fa-twitter" aria-hidden="true"></i></li>
                                        <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
                                    </ul>
                                </div>
                                    <div className="Create_Account_Text">
                                        <Link to="/SignUp">
                                            <h6>Create account</h6></Link>
                                        <Link to="/">
                                            <h6>Return to Home</h6></Link>
                                    </div>
                                </Form>

                               
                                </div>


                            </Col>
                            <Col md={3}>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.UserActions.message,
        error_msg: state.UserActions.error_msg,
    };
  
};
// export default Addproducts;
export default connect(mapStateToProps,null)(SignIn);