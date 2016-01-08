/**
 * Created by doyen on 2016/1/7.
 */
import Dispatcher from "./dispatcher.js";

var todosActions = {
	add: function (value) {
		Dispatcher.dispatch({
			eventName: "new-item",
			item: value
		})
	},
	remove: function (value) {
		Dispatcher.dispatch({
			eventName: "remove-item",
			item: value
		})
	}
}

export var TodosActions = todosActions;