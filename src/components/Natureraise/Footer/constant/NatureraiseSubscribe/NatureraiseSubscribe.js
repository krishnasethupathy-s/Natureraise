import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Config from "../../../../../Config";
import "./NatureraiseSubscribe.css";

const NatureraiseSubscribe = (props) => {
  const [email_id, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email_id) {
      toast.error("Please enter email");
      return;
    }

    dispatch({ type: "IS_LOADING", is_loading: true });

    const type = "news";
    const status = 1;

    const mutation = `mutation addSubscriber(
      $type: String,
      $email_id: String,
      $status: String
      ) {
        addSubscriber(
          type:$type, 
          email_id:$email_id, 
          status:$status,
        ){
              message
          }
      }`;

    fetch(Config.BaseUrl + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          type,
          email_id,
          status,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseText) => {
        if (responseText.data.addSubscriber["message"] === "SUCCESS") {
          setEmail("");
          toast.success("Successfully Added");
          dispatch({ type: "IS_LOADING", is_loading: false });
        } else {
          toast.success(responseText.data.addSubscriber["message"]);
          dispatch({ type: "IS_LOADING", is_loading: false });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong, try again");
        dispatch({ type: "IS_LOADING", is_loading: false });
      });
  };

  return (
    <div className="footer_subscribe_wrapper">
      <h3>Subscribe</h3>
      <p>Subscribe to our newsletter! Stay always in touch!</p>
      <div className="form_subscribe">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFooterEmail">
            <Form.Label></Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                onChange={handleEmailChange}
                placeholder="Enter email"
                value={email_id}
              />
              <InputGroup.Append>
                {" "}
                <button type="submit" className="email_subscribe">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </button>
              </InputGroup.Append>
            </InputGroup>

            <Form.Text className="text-muted">
              * Don't worry, we don't spam.
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default NatureraiseSubscribe;
