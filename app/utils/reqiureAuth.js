import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { isObject } from "lodash";
// import { addFlashMessage } from "../actions/flashMessagesActions";
// import { signup, guestLogin } from "../actions/authActions";

export default function(ComposedComponent) {
	class IsAuthenticated extends Component {
		componentWillMount() {
			if (!this.props.isAuthenticated) {
				// this.props.addFlashMessage({
				// 	type: "error",
				// 	text: I18n.t("login.errors.unauthorized_login")
				// });
				this.props.history.push("/auth");
			} else {
				tronWeb.setPrivateKey(
					JSON.parse(localStorage.getItem("user")).privateKey
				);
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.history.push("/auth");
				alert("Please Login to account!");
			}
		}

		render() {
			const { isAuthenticated } = this.props;
			// console.log({ isAuthenticated });
			if (!isAuthenticated) return null;
			return <ComposedComponent {...this.props} />;
		}
	}

	IsAuthenticated.propTypes = {
		// isAuthenticated: PropTypes.bool.isRequired,
		history: PropTypes.object
		// addFlashMessage: PropTypes.func.isRequired,
		// signup: PropTypes.func.isRequired,
		// guestLogin: PropTypes.func.isRequired
	};

	const mapStateToProps = state => ({
		isAuthenticated: state.auth.isAuthenticated
	});

	return connect(
		mapStateToProps
		// { addFlashMessage, signup, guestLogin }
	)(IsAuthenticated);
}
