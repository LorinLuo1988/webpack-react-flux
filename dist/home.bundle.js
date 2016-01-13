webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _header = __webpack_require__(2);

	__webpack_require__(163);

	__webpack_require__(164);

	/*--------styles--------*/

	(0, _header.createNav)(); /**
	                           * Created by doyen on 2015/12/23.
	                           */
	/*---------scripts---------*/

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createNav = undefined;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(161);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	__webpack_require__(162);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
	                                                                                                                                                                                                                              * Created by doyen on 2015/12/24.
	                                                                                                                                                                                                                              */
	/*---------scripts---------*/

	/*--------styles--------*/

	var navList = ["关于本站", "个人简介", "教育经历", "工作经历", "专业技能"];

	var HeaderMixin = {
		componentDidMount: function componentDidMount() {}
	};

	var Header = _react2.default.createClass({
		displayName: "Header",

		render: function render() {
			var nav = [];
			for (var i = 0; i < this.props.nav.length; i++) {
				nav.push(_react2.default.createElement(
					"li",
					{ key: i },
					_react2.default.createElement(
						"a",
						{ href: "#" },
						this.props.nav[i]
					)
				));
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"ul",
					null,
					nav
				)
			);
		},
		getDefaultProps: function getDefaultProps() {
			return {
				name: "name"
			};
		},
		propTypes: {
			nav: _react2.default.PropTypes.array,
			name: _react2.default.PropTypes.string.isRequired
		},
		mixins: [HeaderMixin],
		componentDidMount: function componentDidMount() {}
	});

	var List = _react2.default.createClass({
		displayName: "List",

		render: function render() {
			var _props = this.props;
			var name = _props.name;

			var other = _objectWithoutProperties(_props, ["name"]);

			return _react2.default.createElement(
				"div",
				other,
				_react2.default.createElement(
					"h4",
					null,
					"Title"
				),
				_react2.default.createElement(
					"ul",
					null,
					this.props.children
				)
			);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			console.log(this.props);
			console.log(nextProps);
		},
		componentDidMount: function componentDidMount() {
			this.setProps({ "aa": "Aaa" });
		}
	});

	var Item = _react2.default.createClass({
		displayName: "Item",

		render: function render() {
			return _react2.default.createElement(
				"li",
				null,
				this.props.name
			);
		}
	});
	var list = [_react2.default.createElement(Item, { name: "haha", key: "haha" }), _react2.default.createElement(Item, { name: "hehe", key: "hehe" }), _react2.default.createElement(Item, { name: "yiyi", key: "yiyi" })];

	function createNav() {
		_reactDom2.default.render(_react2.default.createElement(Header, { nav: navList }), document.getElementById("header"));

		_reactDom2.default.render(_react2.default.createElement(
			List,
			{ name: "list", id: "list", className: "list" },
			list
		), document.getElementById("index"));
	}

	var createNav = exports.createNav = createNav;

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["React"] = __webpack_require__(4);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(5);


/***/ },

/***/ 162:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 164:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});