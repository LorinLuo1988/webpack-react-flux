/**
 * Created by doyen on 2016/1/7.
 */
/*---------scripts---------*/
import React from "react";
import ReactDOM from "react-dom";
import {TodosStore} from "./store";
import {TodosActions} from "./action";

/*--------styles--------*/
import "../style/common";
import "../style/todos";

var Todos = React.createClass({
	getInitialState: function () {
		return {
			isUpdate: false
		}
	},
	_sequenceID: 0,
	componentDidMount: function () {
		TodosStore.addChangeListener(this.storeChange);
	},
	componentWillUnmount: function () {
		TodosStore.removeChangeListener(this.storeChange);
	},
	storeChange: function () {
		this.setState({
			isUpdate : !this.state.isUpdate
		});
	},
	addNewItem: function (event) {
		if (event.keyCode != 13 && event.type == "keyup") {
			return false;
		}

		var value = this.refs.todoInput.state.inputValue;

		if (value == "") {
			return false;
		}

		this._sequenceID++;

		TodosActions.add({id: this._sequenceID, value: value});
		this.refs.todoInput.setState({inputValue: ""});
	},
	removeItem: function (id) {
		TodosActions.remove(id);
	},
	render: function () {
		var listItem = TodosStore.getAllItem();
		var list = [];

		listItem.map(function (item, index) {
			list.push(
				<TodoItem
				key={item.id}
				itemkey={item.id}
				TodosInstance={this}
				removeItem={this.removeItem}>
				{item.value}
				</TodoItem>
			);
		}.bind(this));

		return (
			<div className="todos">
				<TodoHead title={this.props.title}></TodoHead>
				<div className="panel">
					<TodoInput addNewItem={this.addNewItem} ref="todoInput"></TodoInput>
					<TodoList>
						{list}
					</TodoList>
					<TodoControl></TodoControl>
				</div>
			</div>
		)
	}
});

var TodoHead = React.createClass({
	render: function () {
		return (
			<div className="header">
				<h4>{this.props.title}</h4>
			</div>
		)
	}
});

var TodoInput = React.createClass({
	getInitialState: function () {
		return {
			inputValue: ""
		}
	},
	inputValueChange: function () {
		this.setState({inputValue: this.refs["new-todo"].value});
	},
	render: function () {
		return (
			<div className="input-control">
				<span className="toggle-all">❯</span>
				<input onChange={this.inputValueChange}
					onKeyUp={this.props.addNewItem}
					value={this.state.inputValue}
					ref="new-todo"
					className="new-todo"
					type="text"
					placeholder="What needs to be done" />
				<button onClick={this.props.addNewItem} className="pull-right add">add</button>
			</div>
		)
	},
	componentDidMount: function () {
	}
});

var TodoList = React.createClass({
	render: function () {
		return (
			<div className="todo-list">
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
});

var TodoItem = React.createClass({
	render: function () {
		return (
			<li className="todo-item clear-fix">
				{this.props.children}
				<span onClick={this.props.removeItem.bind(this.props.TodosInstance, this.props.itemkey)}
					className="destroy pull-right">×</span>
			</li>
		)
	}
});

var TodoControl = React.createClass({
	render: function () {
		return (
			<div className="footer clear-fix">
				<button className="pull-right">DELETE</button>
			</div>
		)
	}
});

ReactDOM.render(
	<Todos title="Todos"/>,
	document.querySelector("#todos")
);
