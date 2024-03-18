import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import { GetResetPasswordLinkByMail } from "../Natureraise/store/actions/User/UserActions";
import { empty_message } from "../Natureraise/store/actions/Product/ProductActions";

import "./ForgetPassword.css";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid E-mail"),
});

const ForgotPassword = () => {
  const [showForm, setShowForm] = useState(true);
  const { handleSubmit, handleChange, errors, values, touched, handleReset } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: (values) => handleForgotPassword(values),
    });

  const { is_loading, success_message, error_message } = useSelector(
    (state) => state.ProductActions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success_message === "SUCCESS") {
      setShowForm(false);
      handleReset();
    }
    if (error_message === "FAILED") {
      toast.error("Mail send Failed, please try again");
      dispatch(empty_message());
    } else if (error_message === "ERROR") {
      toast.error("Something went wrong");

      dispatch(empty_message());
    }
  }, [success_message, error_message, dispatch, handleReset]);

  const handleForgotPassword = (values) => {
    const { email } = values;
    console.log(email);
    dispatch(GetResetPasswordLinkByMail(email));
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Forgot Password | NatureSave</title>
        <meta property="og:title" content="Natureraise" />
        <meta property="og:type" content="website" />

        <meta property="og:description" content="Forgot Password Page" />
      </Helmet>
      <section>
        <div id="ForgetPassword_Main_Section">
          <Jumbotron fluid className="text-center">
            <Container>
              <h4> Account</h4>
              <div className="ForgetPassword_Inner_Section">
                <ul className="Inner_nav">
                  <Link to="/" className="text-light">
                    <li>
                      <i className="fa fa-sign-in"></i> Home
                    </li>
                  </Link>
                  <Link to="/SignIn" className="text-light">
                    <li>
                      <i className="fa fa-user-circle-o"></i> SignIn
                    </li>
                  </Link>
                </ul>
              </div>
            </Container>
          </Jumbotron>
        </div>
        <div className="ForgetPassword_Section">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6}>
                {showForm && (
                  <Form noValidate onSubmit={handleSubmit}>
                    <h3>Reset your password</h3>
                    <p>We will send you an email to reset your password.</p>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter E-mail"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-left"
                      >
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mr-2">
                      Submit
                    </Button>

                    <Button
                      type="button"
                      as={Link}
                      to="/SignIn"
                      variant="outline-secondary"
                    >
                      Cancel
                    </Button>
                  </Form>
                )}

                {!showForm && (
                  <>
                    <h3>Reset Mail Sent successfully </h3>
                    <p>Check spam folder if you can't find reset mail</p>
                    <Button
                      type="button"
                      as={Link}
                      to="/SignIn"
                      variant="outline-secondary"
                    >
                      Back to signin
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
