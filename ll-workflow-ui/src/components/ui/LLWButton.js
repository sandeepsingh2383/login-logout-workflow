import React, { Component } from "react";
import { observer } from "mobx-react";

const LLWButton = ({ ...props }) => {
	return <a className="btn" {...props} onClick={props.onClick}>{props.title}</a>;
};

export default LLWButton;
