import React, { Component } from "react";
// import { Switch, Route, Redirect } from "react-router";
import { connect } from "react-redux";

// import routes from "./constants/routes";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
// import CounterPage from "./containers/CounterPage";
import AuthPage from "./containers/AuthPage";
// import requireAuth from "./utils/reqiureAuth";

class Routes extends Component {
	render() {
		// console.log(this.props);
		const renderComp = () => {
			if (this.props.isAuthenticated) {
				window.tronWeb.setPrivateKey(
					JSON.parse(localStorage.getItem("user")).privateKey
				);
				return <HomePage />;
			} else {
				return <AuthPage />;
			}
		};
		return <App>{renderComp()}</App>;
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
}

export default connect(mapStateToProps)(Routes);
