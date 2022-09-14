import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, Form } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { toast } from "react-toastify";

import { empty_message } from "../store/actions/Product/ProductActions";
import { cancelOrder } from "../store/actions/Order/OrderActions";

const CancelModal = ({ handleClose, show, id }) => {
  const [rating, setRating] = useState(0);
  const [ratingTitle, setRatingTitle] = useState("");
  const [ratingComment, setRatingComment] = useState("");

  const { success_message, error_message } = useSelector(
    (state) => state.ProductActions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success_message === "CANCEL_SUCCESS") {
      handleClose();
      toast.success("Order Successfully Cancelled!");
    }
    dispatch(empty_message());
  }, [success_message]);

  const handleCancelOrder = (e) => {
    console.log(id);
    dispatch(cancelOrder(id));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        {!!error_message && (
          <div class="alert alert-danger" role="alert">
            {error_message}
          </div>
        )}
        <h4>Are you sure to cancel your order?</h4>
        <p className="text-muted mt-3">
          {" "}
          * if amount paid via online, amount will return to your account 5-7
          business days!.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleCancelOrder}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;
