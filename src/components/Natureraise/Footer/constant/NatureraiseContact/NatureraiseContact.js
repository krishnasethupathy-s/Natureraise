import React from "react";
import "./NatureraiseContact.css";
import * as AccountData from "../AccountData/AccountData";

const NatureraiseContact = (props) => {
  return (
    <div className="footer_wrapper_contact">
      <h3>Contacts</h3>
      <div className="footer_contact_content">
        <ul>
          {AccountData.CONTACT_DATA.map((contact_data, contact_id) => {
            return (
              <li key={contact_id}>
                <i className={contact_data.icon_name} aria-hidden="true"></i>
                {contact_data.desc}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NatureraiseContact;
