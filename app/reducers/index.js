// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import counter from "./counter";
import auth from "./auth";

export default function createRootReducer(history: History) {
	return combineReducers({
		router: connectRouter(history),
		counter,
		auth
	});
}
