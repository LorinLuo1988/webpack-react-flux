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
	}
})


export var TodosStore = todosStore;