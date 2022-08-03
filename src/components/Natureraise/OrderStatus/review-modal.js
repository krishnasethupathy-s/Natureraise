import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, Form } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { toast } from "react-toastify";

import {
  addReview,
  empty_message,
} from "../store/actions/Product/ProductActions";

const ReviewModal = ({ handleClose, show, id }) => {
  const [rating, setRating] = useState(0);
  const [ratingTitle, setRatingTitle] = useState("");
  const [ratingComment, setRatingComment] = useState("");

  const { success_message, error_message } = useSelector(
    (state) => state.ProductActions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success_message === "RATING_SUCCESS") {
      handleClose();
      toast.success("Review Successfully Submitted!");
      setRating(0);
      setRatingTitle("");
      setRatingComment("");
    }
    dispatch(empty_message());
  }, [success_message]);

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  const handleRatingTitleChange = (e) => setRatingTitle(e.target.value);
  const handleRatingCommentChange = (e) => setRatingComment(e.target.value);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(id, "" + rating, ratingTitle, ratingComment));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add A Review</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleRatingSubmit}>
        <Modal.Body>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>

          {!!error_message && (
            <div class="alert alert-danger" role="alert">
              {error_message}
            </div>
          )}

          <div className="review_start_wrap">
            <h6>Your rating</h6>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={rating}
              onStarClick={onStarClick}
            />
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Title *"
              value={ratingTitle}
              onChange={handleRatingTitleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              placeholder="Your Comments *"
              rows={3}
              onChange={handleRatingCommentChange}
              value={ratingComment}
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

export default ReviewModal;
