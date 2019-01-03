import { SET_CURRENT_USER } from "../actions/actions";
// import isEmpty from "lodash/isEmpty";

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !action.user,
				user: action.user
			};
		// case SET_PROFILE_INFO:
		// 	return {
		// 		...state,
		// 		profile: { ...action.profile }
		// 	};
		default:
			return state;
	}
};
