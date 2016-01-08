/**
 * Created by doyen on 2015/12/24.
 */
/*---------scripts---------*/
import React from "react";
import ReactDOM from "react-dom";

/*--------styles--------*/
import "../../style/header.less"

var navList = ["关于本站", "个人简介", "教育经历", "工作经历", "专业技能"];

var HeaderMixin = {
	componentDidMount: function () {

	}
}

var Header = React.createClass({
	render: function () {
		var nav = [];
		for (var i = 0; i < this.props.nav.length; i++) {
			nav.push(<li key={i}><a href="#">{this.props.nav[i]}</a></li>);
		}
		return (
			<div>
				<ul>{nav}</ul>
			</div>
		);
	},
	getDefaultProps: function () {
		return {
			name: "name"
		}
	},
	propTypes: {
		nav: React.PropTypes.array,
		name: React.PropTypes.string.isRequired
	},
	mixins: [HeaderMixin],
	componentDidMount: function () {

	}
});

var List = React.createClass({
	render: function () {
		var {name, ...other} = this.props;

		return (
			<div {...other}>
				<h4>Title</h4>
				<ul>
					{this.props.children}
				</ul>
			</div>
		);
	},
	componentWillReceiveProps: function (nextProps) {
		console.log(this.props)
		console.log(nextProps)
	},
	componentDidMount: function () {
		this.setProps(
			{"aa": "Aaa"}
		)
	}
});

var Item = React.createClass({
	render: function () {
		return (
			<li>{this.props.name}</li>
		);
	}
});
var list = [
	<Item name="haha" key="haha"/>,
	<Item name="hehe" key="hehe"/>,
	<Item name="yiyi" key="yiyi"/>
];

function createNav () {
	ReactDOM.render(
		<Header nav={navList}/>,
		document.getElementById("header")
	);

	ReactDOM.render(
		<List name="list" id="list" className="list">
			{list}
		</List>,
		document.getElementById("index")
	);
}

export var createNav =  createNav;

