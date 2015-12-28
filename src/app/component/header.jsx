/**
 * Created by doyen on 2015/12/24.
 */
import React from "react";
import ReactDOM from "react-dom";
import "../../style/header.less"

var Header = React.createClass({
	render: function () {
		var nav = [];
		for (var i = 0; i < this.props.nav.length; i++) {
			nav.push(<li key={i}><a href="#">{this.props.nav[i]}</a></li>);
		}
		return (
			<ul>{nav}</ul>
		);
	}
});

function createNav (list) {
	ReactDOM.render(
		<Header nav={list}/>,
		document.getElementById("header")
	);
}

export var createNav =  createNav;