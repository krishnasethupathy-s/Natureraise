import React from "react";
import "./PrivacyPolicyComp.css";

const ShippingPolicy = (props) => {
  return (
    <div className="privacty_content">
      <h6 className="privacy_heading">Updated September 22, 2022</h6>
      <h5 className="privacy_title">Shipping Policy</h5>
      <p className="privacy_description">
        <b> Cancellation of Order:</b>
      </p>
      <p className="privacy_description">
        It gives you access to all payment modes including Credit Card, Debit
        Card, Netbanking, UPI and popular wallets including JioMoney, Mobikwik,
        Airtel Money, FreeCharge, Ola Money and PayZapp.
      </p>
      <p className="privacy_description">
        Delivery time is approximately 3 - 7 days.
      </p>

      <p className="privacy_description">
        We are currently shipping in pan India. The orders can only be shipped
        to places that are covered by logistic partners and courier agencies and
        not to places restricted by government authorities.
      </p>
      <p className="privacy_description">
        If a non-delivery or late delivery occurs due to a reason ascertained to
        the customer (i.e. wrong or incomplete name or address or recipient not
        available or any other related reason) any extra cost spent by PWTPL for
        re-delivery shall be claimed from the customer.
      </p>
      <p className="privacy_description">
        Our logistics partners will attempt delivery of the items twice. In case
        the delivery is not executed during the two attempts, due to the
        recipient not being available / premises locked /phone not being
        answered, etc., then the customer shall have to bear the cost of
        redelivery of items.
      </p>
      <p className="privacy_description">
        Tracking: e-mail/SMS containing your package tracking information will
        be sent after shipment. For any queries please call us at{" "}
        <b>9606632288</b> or email us at{" "}
        <a href="mailto:natureraisetech@gmail.com">natureraisetech@gmail.com</a>
        .
      </p>

      <p className="privacy_description">
        <b>Shipping Returned Merchandise:</b>
      </p>
      <p className="privacy_description">
        We recommend shipping returned merchandise via courier or insured parcel
        for tracking purposes. PWTPL does not take any responsibility for
        reimbursement or compensation in the event that any returned packages
        are lost, stolen, or mishandled. We do not refund shipping or insurance
        costs.
      </p>
    </div>
  );
};

export default ShippingPolicy;
