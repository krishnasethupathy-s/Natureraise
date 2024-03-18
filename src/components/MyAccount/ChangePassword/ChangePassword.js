import React from "react";
import { Row, Container, Col, Form, Button, Alert } from "react-bootstrap";
import "./ChangePassword.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

import { ChangePasswordFunction1 } from "../../Natureraise/store/actions/User/UserActions";
import images from "../../constants/images";
import PageLoading from "../../constants/PageLoader/PageLoading";

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => handleChangePassword(values),
  });

  const dispatch = useDispatch();
  const { provider } = useSelector((state) => state.UserActions);

  const handleChangePassword = (values) => {
    const { currentPassword, newPassword, passwordConfirmation } = values;
    dispatch(
      ChangePasswordFunction1(
        currentPassword,
        newPassword,
        passwordConfirmation
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Change Password | NatureSave</title>
        <meta property="og:title" content="Natureraise" />
        <meta property="og:type" content="website" />

        <meta property="og:description" content="Change Password Page" />
      </Helmet>
      <div className="personal-information-wrapper">
        <Container>
          <Row>
            <Col md={12} className="Personal_Information_Heading">
              <h6>Change Password</h6>
              {!!provider && (
                <Alert variant="warning">
                  You're login via social ID ({provider}), You can't change
                  password here.
                </Alert>
              )}
              {!!!provider && (
                <Form name="form" noValidate onSubmit={handleSubmit}>
                  <Row className="justify-content-center align-items-center">
                    <Col md={6}>
                      <Form.Group controlId="formBasicCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={values.currentPassword}
                          placeholder="Enter Old Password"
                          name="currentPassword"
                          onChange={handleChange}
                          isInvalid={!!errors.currentPassword}
                          isValid={
                            touched.currentPassword && !errors.currentPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.currentPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center align-items-center">
                    <Col md={6}>
                      <Form.Label>New Password</Form.Label>
                      <Form.Group controlId="formBasicNewPassword">
                        <Form.Control
                          type="password"
                          value={values.newPassword}
                          placeholder="Enter New Password"
                          name="newPassword"
                          onChange={handleChange}
                          isInvalid={!!errors.newPassword}
                          isValid={touched.newPassword && !errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="justify-content-center align-items-center">
                    <Col md={6}>
                      <Form.Label>Confirmation Password</Form.Label>
                      <Form.Group controlId="formBasicRe-enterNewPassword">
                        <Form.Control
                          type="Password"
                          value={values.passwordConfirmation}
                          placeholder="Re-enter New Password"
                          name="passwordConfirmation"
                          onChange={handleChange}
                          isInvalid={!!errors.passwordConfirmation}
                          isValid={
                            touched.passwordConfirmation &&
                            !errors.passwordConfirmation
                          }
                        />
                      </Form.Group>
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirmation}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={12} className="Mobile_Button_container">
                      <div className="Submit_Button_Section">
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="MyAccount_Update_Button"
                          disabled={!!provider}
                        >
                          Change Password
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <img
                      src={images.Account_Bottom}
                      alt="RealEsate"
                      className="img-fluid w-100"
                    />
                  </Row>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ChangePassword;
