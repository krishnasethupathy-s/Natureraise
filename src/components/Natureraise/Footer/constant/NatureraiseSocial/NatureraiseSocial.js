import React from "react";
import "./NatureraiseSocial.css";
import * as AccountData from "../AccountData/AccountData";

const NatureraiseSocial = (props) => {
  return (
    <div className="social_icon-bar">
      {AccountData.SOCIAL_LINK.map((data, idx) => {
        return (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={data.classname}
            key={idx}
          >
            <i className={data.icon_name}></i>
          </a>
        );
      })}
    </div>
  );
};

export default NatureraiseSocial;
