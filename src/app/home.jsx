/**
 * Created by doyen on 2015/12/23.
 */
/*---------scripts---------*/
import React from "react";
import ReactDOM from "react-dom";
import Header from "./component/header.jsx";

/*--------styles--------*/
import "../style/common";
import "homeCss";

ReactDOM.render(
	<Header nav={["关于本站a", "个人简介", "教育经历", "工作经历", "专业技能"]}/>,
	document.getElementById("header")
);
