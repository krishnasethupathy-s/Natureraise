import React from "react";
import { Card } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import Avatar from "react-avatar";

import Config from "../../../Config";

import "./review-card.css";

const ReviewCard = ({ id, username, title, rating, date, description }) => {
  const convertedDate = moment(Config.stringToDateTime(date)).format(
    "MMMM Do YYYY"
  );

  return (
    <Card border="light" className="mt-2 mr-2">
      <Card.Body className="p-1">
        <div className="d-flex align-items-center">
          <Avatar name={username} size="45" round={true} />
          <div className="ml-3 flex-fill pt-1">
            <Card.Title>{username}</Card.Title>

            <Card.Subtitle className="small">on {convertedDate}</Card.Subtitle>
            <div>
              <StarRatingComponent
                name="star"
                starCount={5}
                value={+rating}
                editing={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <p className="mb-1 p-0 font-weight-bold text-capitalize">{title}</p>

          <Card.Text className="p-0">{description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
