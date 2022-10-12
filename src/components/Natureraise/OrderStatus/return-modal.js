import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { Button, Modal, Form } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { empty_message } from "../store/actions/Product/ProductActions";
import { addOrderReturn } from "../store/actions/Order/OrderActions";

const ReturnOrderSchema = Yup.object().shape({
  defect_type: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const ReturnModal = ({ handleClose, show, id, order_id }) => {
  const { reason } = useSelector((state) => state.OrderReducer);

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isValid,
    handleReset,
  } = useFormik({
    initialValues: {
      defect_type: "",
      description: "",
    },
    validationSchema: ReturnOrderSchema,
    onSubmit: (values) => {
      handleOrderReturnSubmit(values);
    },
  });

  const { success_message, error_message } = useSelector(
    (state) => state.ProductActions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success_message === "RETURN_SUCCESS") {
      handleClose();
      toast.success("Return request submitted!");
      handleReset();
    }
    dispatch(empty_message());
  }, [success_message, dispatch]);

  const handleOrderReturnSubmit = (values) => {
    const { defect_type, description } = values;

    dispatch(addOrderReturn(order_id, id, defect_type, description));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Return Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Please Provide full details to return product*</p>

          {!!error_message && (
            <div class="alert alert-danger" role="alert">
              {error_message}
            </div>
          )}

          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Reason*</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={handleChange}
              name="defect_type"
              defaultValue={values.defect_type}
              isInvalid={!!errors.defect_type}
            >
              <option value={""}>---Select Reason---</option>
              {!!reason &&
                reason?.map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.item_category_name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              placeholder="Your Comments *"
              name="description"
              rows={3}
              onChange={handleChange}
              value={values.description}
              isInvalid={!!errors.description}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ReturnModal;
