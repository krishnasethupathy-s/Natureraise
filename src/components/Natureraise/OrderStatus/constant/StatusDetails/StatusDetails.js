import React from "react";
import "./StatusDetails.css";
import { Row, Col } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import moment from "moment";

const StatusDetails = ({
  item,
  status,
  openReviewModal,
  openReturnModal,
  orderDate,
  returnValidity,
}) => {
  const orderDate1 = moment(orderDate, "DD-MM-YYYY").format("MM-DD-YYYY");
  const returnDate = moment(orderDate, "DD-MM-YYYY")
    .add(returnValidity, "days")
    .format("MM-DD-YYYY");
  // console.log(returnDate, moment(returnDate).isSameOrAfter(moment().format("MM-DD-YYYY")) );
  // console.log(orderDate1,   moment(orderDate1).isSameOrBefore(moment().format("MM-DD-YYYY")));
  const isReturnAvaliable =
    moment(orderDate1).isSameOrBefore(moment().format("MM-DD-YYYY")) &&
    moment(returnDate).isSameOrAfter(moment().format("MM-DD-YYYY"));
  // console.log(isReturnAvaliable);
  // console.log(moment().format("MM-DD-YYYY"));

  return (
    <Row className="mb-3 border-bottom">
      <Col md={4}>
        <div className="order_track_wrap">
          <img
            alt="-demo"
            style={{ width: "100px" }}
            src={item.image_address}
            // src="https://www.solarclue.com/image/cache/catalog/Products/Solar%20Water%20Heater/V-Guard/v-guard-solar-water-heater-fpc-systems-nw-500x500-600x600-222x222.png"
          />

          <div className="order_track_content">
            <h6 className="order_title">{item.item_name}</h6>
            <div className="order_color_wrapper_inner">
              <h6 className="order_subtitle">Color:</h6>
              <div
                className="order_color_wrapper_box"
                style={{
                  backgroundColor: item.item_color,
                }}
              ></div>

              <h6 className="order_subtitle" style={{ marginLeft: "10px" }}>
                {" "}
                Size: {item.item_size}{" "}
              </h6>
            </div>
          </div>
        </div>
      </Col>

      <Col className="d-flex align-items-center justify-content-center">
        <h6 className="order_subtitle">Qty: {item.cart_list} </h6>
      </Col>
      <Col className="d-flex align-items-center justify-content-center">
        <h6 className="order_amount">₹ {item.total_amount}</h6>
      </Col>
      {/* <Col md={5}>
        <div>
          <div>
            <Stepper
              steps={[
                {
                  title:
                    status?.status === "Cancelled" ? "Cancelled" : "Ordered",
                },
                { title: "Placed" },
                { title: "Packed" },
                { title: "Shipped" },
                { title: "Delivered" },
              ]}
              activeStep={status?.stepper}
            />
          </div>
          <div className="order_status_text">
            <p>{status?.status_details}</p>
          </div>
        </div>
      </Col> */}

      <Col md={3}>
        <div className="order_delivery_wrap">
          <h1 className="order_title">{status?.delivery_time}</h1>
          {status?.status === "Delivered" && (
            <button
              className="btn order_sub"
              onClick={() => openReviewModal(item.id)}
            >
              <span>
                <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
              </span>
              RATE AND REVIEW PRODUCT
            </button>
          )}

          {status?.status === "Delivered" &&
            isReturnAvaliable &&
            !!!item?.order_status && (
              <button
                className="btn order_sub"
                onClick={() => openReturnModal(item.id)}
              >
                <span>
                  <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
                </span>
                Return Product
              </button>
            )}
          {!!item?.order_status && (
            <p className=" order_sub_status">
              {" "}
              <span>
                <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
              </span>
              {item?.order_status}{" "}
            </p>
          )}
          {/* <p className="order_sub">
            <span>
              <i className="fa fa-refresh" aria-hidden="true"></i>{" "}
            </span>
            RATE AND REVIEW PRODUCT
          </p>
          <p className="order_sub">
            <span>
              <i className="fa fa-question-circle-o" aria-hidden="true"></i>{" "}
            </span>
            RATE AND REVIEW PRODUCT
          </p> */}
        </div>
      </Col>
    </Row>
  );
};

export default StatusDetails;
