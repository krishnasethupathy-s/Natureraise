import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import ReviewCard from "./review-card";
import "./review-scrollbar.css";

const Reviews = ({ data, hasMore, reviewHandler }) => {
  return (
    <div className="review_wrapper">
      <div>
        <h4>Reviews</h4>
      </div>

      {!!!data.length ? (
        <p style={{ textAlign: "center" }}>
          <b>No reviews, Be the first one to review.</b>
        </p>
      ) : (
        <div
          id="scrollableDiv"
          style={{ height: 300, overflow: "auto" }}
          className="scrollbar scrollbar-primary "
        >
          <InfiniteScroll
            dataLength={data?.length} //This is important field to render the next data
            next={reviewHandler}
            hasMore={hasMore}
            style={{ overflow: "hidden" }}
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.5}
            loader={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 3,
                }}
              >
                <Spinner animation="grow" variant="dark" size="lg">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((review) => (
              <ReviewCard
                key={review.id}
                title={review.review_title}
                rating={review.ratings_point}
                username={review.entered_name}
                description={review.description}
                date={review.entry_date}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Reviews;
