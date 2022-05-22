import React from "react";
import "./NatureraiseAbout.css";
import * as AccountData from "../AccountData/AccountData";
const NatureraiseAbout = (props) => {
  return (
    <div className="footer_wrapper_content">
      <h3>NATURERAISE</h3>
      <p>
        NatureRaise extensive range of robust and reliable products backed by
        its cutting-edge R&D and more than two decades of expertise are designed
        to performance.
      </p>
      <div className="footer_wrapper_social">
        <ul>
          {AccountData.SOCIAL_LINK.map((social_data, social_id) => {
            return (
              <li key={social_id}>
                <a
                  href={social_data.url}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <i class={social_data.icon_name} aria-hidden="true"></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NatureraiseAbout;
