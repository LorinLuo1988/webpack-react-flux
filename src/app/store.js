/**
 * Created by doyen on 2016/1/7.
 */
import Dispatcher from "./dispatcher.js";
import events from "events";

var EventEmitter = events.EventEmitter;

function TodosStore () {
	this.items = [];
}

TodosStore.prototype = new EventEmitter();

TodosStore.prototype.addChangeListener = function (callback) {
	this.on("change", callback);

	return this;
}

TodosStore.prototype.removeChangeListener = function (callback) {
	this.removeListener("change", callback);

	return this;
}

TodosStore.prototype.emitChange = function () {
	this.emit("change");

	return this;
}

TodosStore.prototype.addItem = function (item) {
	this.items.push(item);

	return this;
}

TodosStore.prototype.removeItem = function (item) {
	this.items = this.items.filter(function (value) {
		if (value.id != item) {
			return true;
		} else {
			return false;
		}
	})

	return this;
}

TodosStore.prototype.toggleCheck = function (item) {
	this.items = this.items.map(function (value) {
		if (value.id == item) {
			value.checked = !value.checked;
		}

		return value;
	})

	return this;
}

TodosStore.prototype.toggleAll = function () {
	var hasUnChecked = false;

	this.items.map(function (value) {
		if (!value.checked) {
			hasUnChecked = true;
		}
	})

	if (hasUnChecked) {
		this.items = this.items.map(function (value) {
			value.checked = true;

			return value;
		})
	} else {
		this.items = this.items.map(function (value) {
			value.checked = false;

			return value;
		})
	}

	return this;
}

TodosStore.prototype.removeChecked = function () {
	this.items = this.items.filter(function (value) {
		if (value.checked) {
			return false;
		} else {
			return true;
		}
	})

	return this;
}

TodosStore.prototype.getAllItem = function () {
	return this.items;
}

var todosStore = new TodosStore();

Dispatcher.register(function (event) {
	switch(event.eventName) {
		case "new-item":
			todosStore.addItem(event.item).emitChange();
			break;
		case "remove-item":
			todosStore.removeItem(event.item).emitChange();
			break;
		case "toggle-check":
			todosStore.toggleCheck(event.item).emitChange();
			break;
		case "remove-checked":
			todosStore.removeChecked().emitChange();
			break;
		case "toggle-all":
			todosStore.toggleAll().emitChange();
			break;
	}
})


export var TodosStore = todosStore;