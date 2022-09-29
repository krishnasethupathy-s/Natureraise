import React from "react";
import "./PrivacyPolicyComp.css";

const RefundPolicy = (props) => {
  return (
    <div className="privacty_content">
      <h6 className="privacy_heading">Updated September 22, 2022</h6>
      <h5 className="privacy_title">Refund Policy</h5>
      <p className="privacy_description">
        <b> Cancellation of Order:</b>
      </p>
      <p className="privacy_description">
        Order can be cancelled before the shipment .After shipment it can be
        only RTO .Once order get cancelled amount will be refund for “Prepaid
        Order”
      </p>
      <p className="privacy_description">
        For cancelling the ordered item simple login to your account on
        <a href="https://www.natursave.in"> www.natursave.in </a> and Choose the
        cancel option along with reason for cancellation and press the submit
        button.
      </p>
      <p className="privacy_description">
        <b> Cancellation of Order:</b>
      </p>
      <p className="privacy_description">
        Customer can return the ordered item in case of Damaged product , Differ
        from the description on the website ,Wrong item delivered or Wrong size
        or, Wrong Quantity ,Missing Part ,Accessories Defective condition So on.
      </p>
      <p className="privacy_description">
        Please keep the item in its original condition, with brand outer box,
        MRP tag attached, user manual, warranty card, and original accessories
        in manufacture packaging for successful return pick-up
      </p>
      <p className="privacy_description">
        Note: Only an unused item can be retuned within 10 days for receiving
        the item.
      </p>

      <p className="privacy_description">
        <b>Refund :</b>
      </p>
      <p className="privacy_description">
        Once the order gets cancelled the amount will be refunded to the
        customer based on the payment mode chosen by the customer at the time of
        placing the order ,
      </p>
      <p className="privacy_description">
        If transaction is done by through NEFT and cheque then customer need to
        share below mentioned details at our Email ID{" "}
        <a href="mailto:naturaisetech@gmail.com">naturaisetech@gmail.com</a>{" "}
        from registered Email ID.
      </p>
      <ul className="privacy_description">
        <li>Account number, Account Holder Name, IFSC Code.</li>
      </ul>
      <p className="privacy_description">
        After Receiving the required information for refund ,will be processed
        in 2 working days and same will reflect in your account in another 2-4
        working days .
      </p>
      <p className="privacy_description">
        Naturesave Technologies pvt Ltd. Will make all attempted o provide you
        hassle free return or refund experience ,it shall have complete right to
        decide as whether an order should be cancelled or not or refund to be
        initiated or not ,also the customer agrees not to dispute the decision
        made by Natureraise Technologies Pvt Ltd .For all the product ordered
        from its web site.
      </p>
    </div>
  );
};

export default RefundPolicy;
