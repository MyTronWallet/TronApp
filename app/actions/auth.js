import { SET_CURRENT_USER } from "./actions";

export function setAuthentication(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export const logout = () => {
	setAuthentication({
		privateKey: "",
		address: "",
		isAuthenticated: false
	});

	localStorage.removeItem("user");
	window.location.reload();
};
