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

		TodosActions.add({id: this._sequenceID, value: value, checked: false});
		this.refs.todoInput.setState({inputValue: ""});
	},
	removeItem: function (id) {
		TodosActions.remove(id);
	},
	toggleCheck: function (id) {
		TodosActions.toggleCheck(id);
	},
	toggleAll: function () {
		TodosActions.toggleAll();
	},
	removeChecked: function () {
		TodosActions.removeChecked();
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
				checked={item.checked}
				toggleCheck={this.toggleCheck}
				removeItem={this.removeItem}>
				{item.value}
				</TodoItem>
			);
		}.bind(this));

		return (
			<div className="todos">
				<TodoHead title={this.props.title}></TodoHead>
				<div className="panel">
					<TodoInput toggleAll={this.toggleAll} listItem={listItem} addNewItem={this.addNewItem} ref="todoInput"></TodoInput>
					<TodoList>
						{list}
					</TodoList>
					<TodoControl listItem={listItem} removeChecked={this.removeChecked}></TodoControl>
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
		var isAllChecked = true;

		this.props.listItem.map(function (value) {
			if (!value.checked) {
				isAllChecked = false;
			}
		})

		return (
			<div className="input-control">
				<span onClick={this.props.toggleAll} style={{display: this.props.listItem.length ? "inline-block" : "none"}} className={isAllChecked ? "toggle-all all-checked" : "toggle-all"}>❯</span>
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
	getDefaultProps: function () {
		return {
			unCheckedSrc: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>',
			checkedSrc: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>'
		}
	},
 	render: function () {
		var src = this.props.unCheckedSrc;

		if (this.props.checked) {
			src = this.props.checkedSrc;
		}

		return (
			<li className="todo-item clear-fix">
				<img className="select" src={src} onClick={this.props.toggleCheck.bind(this.props.TodosInstance, this.props.itemkey)} />
				<span className={this.props.checked ? "checked-text" : "unChecked-text"}>{this.props.children}</span>
				<span onClick={this.props.removeItem.bind(this.props.TodosInstance, this.props.itemkey)}
					className="destroy pull-right">×</span>
			</li>
		)
	}
});

var TodoControl = React.createClass({
	render: function () {
		var unCheckedItem = 0;
		var hasChecked = false;

		this.props.listItem.map(function (value) {
			if (!value.checked) {
				unCheckedItem++;
			}

			if (value.checked) {
				hasChecked = true;
			}
		})

		return (
			<div className="footer clear-fix" style={{display: this.props.listItem.length ? "block" : "none"}}>
				<span>{unCheckedItem} Items Left</span>
				<button style={{display: hasChecked ? "block" : "none"}} className="pull-right" onClick={this.props.removeChecked}>Delete</button>
			</div>
		)
	}
});

ReactDOM.render(
	<Todos title="Todos"/>,
	document.querySelector("#todos")
);
