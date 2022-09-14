import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .min(8, "Minimum 8 characters long")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ChangePasswordForm = ({ handleResetPassword }) => {
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      handleResetPassword(values);
    },
  });
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <h3>Reset your password</h3>
      <p>We will send you an email to reset your password.</p>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          // onBlur={handleBlur}
          isValid={touched.password}
          isInvalid={!!errors.password}
        />
        {touched.password && errors.password ? (
          <div className="error-message">{errors.password}</div>
        ) : null}
        {/* <Form.Control.Feedback type="invalid" className="text-left">
          {errors.password}
        </Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group controlId="formBasicConfrimPassword">
        <Form.Control
          type="password"
          name="passwordConfirmation"
          placeholder="Re-enter password"
          value={values.passwordConfirmation}
          onChange={handleChange}
          // onBlur={handleBlur}
          isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
          isInvalid={!!errors.passwordConfirmation}
        />

        {touched.passwordConfirmation && errors.passwordConfirmation ? (
          <div className="error-message">{errors.passwordConfirmation}</div>
        ) : null}
        {/* <Form.Control.Feedback type="invalid" className="text-left">
          {errors.passwordConfirmation}
        </Form.Control.Feedback> */}
      </Form.Group>
      <Button variant="primary" type="submit" className="mr-2">
        Submit
      </Button>
      <Button type="button" as={Link} to="/SignIn" variant="outline-secondary">
        Cancel
      </Button>{" "}
    </Form>
  );
};

export default ChangePasswordForm;
