/**
 * Created by doyen on 2015/12/23.
 */
/*----------scripts---------*/
import React from "react/addons";
import ReactDOM from "react-dom";

/*----------styles---------*/
import "../sass/common";
import "../sass/introduce";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Foo = React.createClass({
	getInitialState: function() {
		return {items: ['click me']}
	},
	saveAndContinue: function(e) {
		e.preventDefault();
		this.setState({items: this.state.items.concat(["animate " + this.state.items.length])});
	},
	render: function() {
		return (
			<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={1000} transitionAppearTimeout={1000} className='button-row' component='ul'>
			{
				this.state.items.map(function(item) {
					return <li key={item}><a href="#" className="button" onClick={this.saveAndContinue}>{item}</a></li>
				}, this)
			}
			</ReactCSSTransitionGroup>
		)
	}
});

ReactDOM.render(<Foo />, document.getElementById('introduce'));