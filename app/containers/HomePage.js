// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../components/Home";

type Props = {};

// export default class HomePage extends Component<Props> {
// 	props: Props;

// 	render() {
// 		return <Home />;
// 	}
// }

function mapStateToProps(state) {
	return {
		counter: state.counter
	};
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(CounterActions, dispatch);
// }

export default connect(
	mapStateToProps
	// mapDispatchToProps
)(Home);
