import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";

import { setAuthentication } from "../actions/auth";

import {
	Button,
	FormGroup,
	Label,
	Input,
	FormText,
	Container,
	Alert
} from "reactstrap";

import { InputField, InputFieldGroup } from "../components/InputFieldGroup";

// 662E27FBB250097E8A1EAB108CC46161CCB7E5258D8B055A7A19F9116360122C

class AuthPage extends Component {
	state = {
		privateKey: "",
		address: "",
		publicKey: "",
		createAccount: false
	};

	onSubmit(values) {
		// console.log(values);
		const address = tronWeb.address.fromPrivateKey(values.privateKey);

		if (address) {
			tronWeb.setPrivateKey(values.privateKey);

			this.props.setAuthentication({
				privateKey: values.privateKey,
				address: tronWeb.address.fromPrivateKey(values.privateKey),
				isAuthenticated: true
			});

			localStorage.setItem(
				"user",
				JSON.stringify({
					address: tronWeb.address.fromPrivateKey(values.privateKey),
					privateKey: values.privateKey,
					isAuthenticated: true
				})
			);

			// this.props.history.push("/app");
			window.location.reload();
		} else {
			alert("Private key is not found!");
		}
	}

	async createAccount() {
		const account = await window.tronWeb.createAccount();
		this.setState({
			...account,
			createAccount: true
		});
	}

	render() {
		const { createAccount } = this.state;
		// console.log(this.props);
		return (
			<section id="main">
				<div className="auth">
					<div>
						<img
							className="primary-logo"
							src={require("../assets/images/logo.png")}
							alt=""
						/>
						<div className="form-holder">
							{/* <div className="py-4 text-center">
							<h1>Login</h1>
						</div> */}

							<div
								id="createAccount"
								style={{
									display: createAccount ? "block" : "none"
								}}
							>
								<div className="row justify-content-md-center">
									<Formik
										initialValues={{
											privateKey: this.state.privateKey,
											address: this.state.address.hex,
											publicKey: this.state.publicKey
										}}
										enableReinitialize={true}
										onSubmit={(
											values,
											{ setSubmitting }
										) => {
											this.onSubmit(values);
											setSubmitting(false);
										}}
									>
										{({ isSubmitting, isValid }) => (
											<Form className="form-signin">
												<Field
													type="text"
													name="privateKey"
													label="Private key"
													placeholder="Private key..."
													readOnly
													component={InputFieldGroup}
												/>
												<Field
													type="text"
													name="address"
													label="Address"
													placeholder="Address..."
													readOnly
													component={InputFieldGroup}
												/>
												<Field
													type="text"
													name="publicKey"
													label="Public Key"
													placeholder="Public Key..."
													readOnly
													component={InputFieldGroup}
												/>

												<Alert
													color="danger"
													className="mt-4"
												>
													Save your private key.
												</Alert>
												<div className="actions mt-2">
													<Button
														color="danger"
														type="submit"
														className="mr-2"
														disabled={isSubmitting}
													>
														Login
													</Button>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							</div>
							<div
								id="login"
								style={{
									display: createAccount ? "none" : "block"
								}}
							>
								<div className="row justify-content-md-center">
									<Formik
										initialValues={{ privateKey: "" }}
										validate={values => {
											let errors = {};
											if (!values.privateKey) {
												errors.privateKey = "Required";
											}
											return errors;
										}}
										onSubmit={(
											values,
											{ setSubmitting }
										) => {
											this.onSubmit(values);
											setSubmitting(false);
										}}
									>
										{({ isSubmitting, isValid }) => (
											<Form className="form-signin">
												<Field
													type="text"
													name="privateKey"
													label="Enter your private key"
													placeholder="Private key..."
													// placeholder="کد ارسال شده به ایمیل خود را در زیر وارد نمایید..."
													component={InputField}
												/>
												<div className="actions mt-4">
													<Button
														color="danger"
														type="submit"
														className="mr-2"
														disabled={isSubmitting}
													>
														Login
													</Button>
													<a
														className="btn btn-secondary text-white"
														onClick={() =>
															this.createAccount()
														}
													>
														Create Account
													</a>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(setAuthentication, dispatch);
// }

export default connect(
	mapStateToProps,
	{ setAuthentication }
)(AuthPage);
