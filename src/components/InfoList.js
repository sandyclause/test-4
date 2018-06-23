import React, { Component } from "react";

const InfoList = (props) => {
  return (
    <li>
      <p>{props.label}: {props.info}</p>
    </li>
  )
}

export default InfoList;