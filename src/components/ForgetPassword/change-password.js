import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Col, Row, Button, Jumbotron, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  MailVerficationAction,
  ChangePasswordById,
} from "../Natureraise/store/actions/User/UserActions";
import { empty_message } from "../Natureraise/store/actions/Product/ProductActions";
import ChangePasswordForm from "./change-password-form";

import "./ForgetPassword.css";

const ChangePassword = () => {
  const [showForm, setShowForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { success_message, error_message, is_loading } = useSelector(
    (state) => state.ProductActions
  );
  const { customer_id } = useSelector((state) => state.UserActions);

  const dispatch = useDispatch();
  const params = useParams();
  let history = useHistory();

  const getCustomerId = useCallback(
    () => params.hpc.split("&cp=").at(-1),
    [params.hpc]
  );

  useEffect(() => {
    const customer_id = getCustomerId();
    console.log(customer_id);
    dispatch(MailVerficationAction(customer_id));
  }, [dispatch, getCustomerId]);

  useEffect(() => {
    if (success_message === "MAIL_VERIFICATION_SUCCESS") {
      setShowForm(true);
      dispatch(empty_message());
    }

    if (success_message === "MAIL_VERIFICATION_ERROR") {
      setShowForm(false);
      dispatch(empty_message());
    }
    if (success_message === "PASSWORD_RESET_SUCCESS") {
      setShowForm(true);
      toast.success("Password Changed Successfully");
      dispatch(empty_message());
      setShowForm(false);
      setResetSuccess(true);
    }

    if (success_message === "PASSWORD_RESET_ERROR") {
      toast.error(error_message);
      dispatch(empty_message());
    }
  }, [success_message, error_message, history, dispatch]);

  const handleResetPassword = (values) => {
    const { password, passwordConfirmation } = values;

    dispatch(ChangePasswordById(password, passwordConfirmation, customer_id));
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | NatureSave</title>
        <meta property="og:title" content="Natureraise" />
        <meta property="og:type" content="website" />

        <meta property="og:description" content="Password Reset Page" />
      </Helmet>
      <section>
        <div id="ForgetPassword_Main_Section">
          <Jumbotron fluid className="text-center">
            <Container>
              <h4>Reset Password</h4>
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
              {showForm && (
                <Col md={6}>
                  <ChangePasswordForm
                    handleResetPassword={handleResetPassword}
                  />
                </Col>
              )}
              {!showForm && !is_loading && !resetSuccess && (
                <Col md={6}>
                  <h3>Reset Link Expired! </h3>
                  <p>Please try again</p>
                  <Button
                    type="button"
                    as={Link}
                    to="/ForgotPassword"
                    variant="outline-secondary"
                  >
                    Back to Forgot Password
                  </Button>
                </Col>
              )}

              {!showForm && !is_loading && resetSuccess && (
                <Col md={6}>
                  <h3>Password Reset Successfully! </h3>

                  <Button
                    type="button"
                    as={Link}
                    to="/signin"
                    variant="outline-secondary"
                  >
                    Back to signin
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
