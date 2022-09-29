import React from "react";
import "./PrivacyPolicyComp.css";

const PrivacyPolicyComp = (props) => {
  return (
    <div className="privacty_content">
      <h6 className="privacy_heading">Updated September 22, 2022</h6>
      <h5 className="privacy_title">Privacy Policy</h5>
      <p className="privacy_description">
        This privacy policy sets out how Naturesave.in uses we understand that
        you do care for your personal information provided. Naturesave protect
        any information that you given when you use this website. We work to
        keep your information safe or secure because your privacy is important
        us.
      </p>
      <p className="privacy_description">
        We ask you to provide certain information by which you can be identified
        when using this website. Then you can be assured that it will only be
        used in accordance with this privacy statement. We use your data to help
        seller in handling order, delivering the order gamut & Services
        processing payment option, communication with you about placed order &
        promotional offer, recommending best product service as per your
        requirement .
      </p>
      <p className="privacy_description">
        What type of personal information we collect
      </p>
      <ul style={{ listStyleType: "disc" }} className="privacy_description">
        <li>User Name and Company Name</li>
        <li>Contact information including email address.</li>
        <li>
          Demographic information such as country ,Region ,Street Address,
          city,and state postal code so on,
        </li>
        <li>Other information relevant to customer survey and /or offer.</li>
      </ul>

      <p className="privacy_description">
        Gathering of personal information of any user is helpful to improve our
        service to meet the maximum customer satisfaction while they shop with
        us ,However ,you have the choice not to revel certain info, but you
        might not be availing of the benefits of several feature provided by us.
      </p>
    </div>
  );
};

export default PrivacyPolicyComp;
