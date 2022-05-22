import React from "react";
import "./NatureraiseSocial.css";
import * as AccountData from "../AccountData/AccountData";

const NatureraiseSocial = (props) => {
  return (
    <div class="social_icon-bar">
         {AccountData.SOCIAL_LINK.map((data, id) => {
            return (
    <a href={data.url} target="_blank" class={data.classname}><i class={data.icon_name}></i></a> 
            );
          })}

  </div>
  );
};

export default NatureraiseSocial;
