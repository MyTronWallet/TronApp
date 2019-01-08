// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import request from "axios";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import numberSeparator from "number-separator";
import routes from "../constants/routes";
import classnames from "classnames";
import styles from "./Home.css";
import ShadowScrollbars from "./ScrollShadow";
import Truncate from "../utils/utils";
import { confirmAlert } from "./Confirm";
import { logout } from "../actions/auth";

import { Formik, Form, Field } from "formik";
import {
	InputField,
	InputFieldGroup,
	InputOptions
} from "../components/InputFieldGroup";

import {
	TabContent,
	TabPane,
	Row,
	Col,
	Modal,
	Button,
	Alert
} from "reactstrap";

const contractType = {
	0: "AccountCreateContract",
	1: "TransferContract",
	2: "TransferAssetContract",
	3: "VoteAssetContract",
	4: "VoteWitnessContract",
	5: "WitnessCreateContract",
	6: "AssetIssueContract",
	8: "WitnessUpdateContract",
	9: "ParticipateAssetIssueContract",
	10: "AccountUpdateContract",
	11: "FreezeBalanceContract",
	12: "UnfreezeBalanceContract",
	13: "WithdrawBalanceContract",
	14: "UnfreezeAssetContract",
	15: "UpdateAssetContract",
	16: "ProposalCreateContract",
	17: "ProposalApproveContract",
	18: "ProposalDeleteContract",
	19: "SetAccountIdContract",
	20: "CustomContract",
	21: "BuyStorageContract",
	22: "BuyStorageBytesContract",
	23: "SellStorageContract",
	30: "CreateSmartContract",
	31: "TriggerSmartContract",
	32: "GetContract",
	33: "UpdateSettingContract",
	41: "ExchangeCreateContract",
	42: "ExchangeInjectContract",
	43: "ExchangeWithdrawContract",
	44: "ExchangeTransactionContract",
	45: "UpdateEnergyLimitContract"
};
class Home extends Component<Props> {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isLoading: true,
			activeTab: "1",
			bandwidth: "0",
			balance: "0",
			currentBlock: {},
			newAssetsList: [],
			account: {},
			transactions: {},
			sendTransaction: {},
			freezeBalance: {},
			unfreezeBalance: {},
			max: "",
			confirm: false,
			modal: false
		};
	}
	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	toggleModal(modal) {
		this.setState({
			[modal]: !this.state[modal],
			sendTransaction: {},
			freezeBalance: {},
			unfreezeBalance: {}
		});
	}

	async getAccountData() {
		const bandwidth = await tronWeb.trx.getBandwidth();
		const balance = await tronWeb.trx.getBalance();
		const currentBlock = await tronWeb.trx.getCurrentBlock();
		const address = tronWeb.address.fromPrivateKey(
			this.props.auth.privateKey
		);
		const account = await tronWeb.trx.getAccount();
		// console.log({ account });
		const _account = await request.get(
			`https://wlcyapi.tronscan.org/api/account?address=${address}`
		);
		const transactions = await request.get(
			`https://wlcyapi.tronscan.org/api/transaction?sort=-timestamp&count=true&address=${address}`
		);

		if (account.assetV2) {
			account.assetV2.map(async asset => {
				const getId = await tronWeb.trx.getTokenFromID(asset.key);
				const newToken = {
					id: asset.key,
					key: getId.name,
					value: asset.value
				};
				this.setState(previous => ({
					newAssetsList: [...previous.newAssetsList, newToken]
				}));
			});
		}

		this.setState({
			isLoading: false,
			bandwidth,
			balance,
			currentBlock,
			// newAssetsList,
			account: {
				..._account.data.data[0],
				...account
			},
			max: tronWeb.fromSun(balance),
			transactions: transactions.data
		});
	}

	componentWillMount() {
		this.getAccountData();
	}
	// componentDidMount() {
	// 	this.getAccountData();
	// }

	onSubmit(values) {
		// console.log(values);
		confirmAlert({
			title: "Confirm transaction", // Title dialog
			message: `Are you sure you want to transfer <b>${values.amount} ${
				values.token
			}</b> To <code>${values.to}</code>`, // Message dialog
			confirmLabel: "Confirm", // Text button confirm
			cancelLabel: "Cancel", // Text button cancel
			onConfirm: async () => {
				if (values.token === "TRX") {
					try {
						const sendTransaction = await tronWeb.trx.sendTransaction(
							values.to,
							tronWeb.toSun(values.amount)
						);
						this.setState({
							sendTransaction
						});
						this.getAccountData();

						console.log("TRX", sendTransaction);
					} catch (err) {
						alert(err);
					}
				} else {
					try {
						const sendToken = await tronWeb.transactionBuilder.sendToken(
							values.to,
							values.amount,
							`${this.currentToken(values.token).id}`,
							this.props.auth.address
						);
						// console.log({ sendToken });
						const signed = await tronWeb.trx.sign(sendToken);
						const sendTransaction = await tronWeb.trx.sendRawTransaction(
							signed
						);
						this.setState({
							sendTransaction
						});
						this.getAccountData();
						console.log(values.token, sendTransaction);
					} catch (err) {
						alert(err);
					}
				}
			} // Action after Confirm
			// onCancel: () => alert("Action after Cancel") // Action after Cancel
		});
	}

	async onSubmitFreeze(values) {
		let resource = "";
		if (values.type === "0") {
			resource = "BANDWIDTH";
		} else if (values.type === "1") {
			resource = "ENERGY";
		}
		try {
			const freezeBalance = await tronWeb.transactionBuilder.freezeBalance(
				tronWeb.toSun(values.amount),
				3,
				resource,
				this.props.auth.address
			);

			console.log(freezeBalance);
			const signed = await tronWeb.trx.sign(freezeBalance);
			const sendFreeze = await tronWeb.trx.sendRawTransaction(signed);
			// console.log({ sendFreeze });
			// console.log({ signed });

			this.setState({
				freezeBalance: sendFreeze
			});
		} catch (err) {
			alert("Something is Wrong!");
		}
	}

	async onSubmitUnFreeze(values) {
		// console.log(values);
		let resource = "";
		if (values.type === "0") {
			resource = "BANDWIDTH";
		} else if (values.type === "1") {
			resource = "ENERGY";
		}

		try {
			const unfreezeBalance = await tronWeb.transactionBuilder.unfreezeBalance(
				resource,
				this.props.auth.address
			);

			const signed = await tronWeb.trx.sign(unfreezeBalance);
			const sendUnFreeze = await tronWeb.trx.sendRawTransaction(signed);
			this.setState({
				unfreezeBalance: {
					...sendUnFreeze,
					error: false,
					txt: "Successful Unfreeze"
				}
			});
		} catch (err) {
			console.log(err);
			this.setState({
				unfreezeBalance: {
					txID: "unfreezeBalance",
					error: true,
					txt:
						"Unable to unfreeze TRX. This could be caused because the minimal freeze period hasn't been reached yet."
				}
			});
		}
	}

	currentToken(token) {
		// console.log(token);
		const { newAssetsList } = this.state;
		return newAssetsList.find(x => {
			if (x.key == token) {
				return x;
			}
		});
	}

	render() {
		// console.log(this.props);
		const { auth } = this.props;
		const {
			isLoading,
			bandwidth,
			balance,
			currentBlock,
			account,
			transactions,
			sendTransaction,
			freezeBalance,
			unfreezeBalance,
			confirm,
			max,
			newAssetsList
		} = this.state;

		if (isLoading) {
			return <i className="loader" />;
		} else {
			return (
				<div className={styles.container}>
					<Row className="mb-3 space-between">
						<Col xs="3">
							<Button
								color="link"
								onClick={() => {
									this.setState({ isLoading: true });
									this.getAccountData();
								}}
							>
								<svg
									className="feather feather-refresh-ccw sc-dnqmqq jxshSx"
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									viewBox="0 0 24 24"
									fill="none"
									stroke="#93999E"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<polyline points="1 4 1 10 7 10" />
									<polyline points="23 20 23 14 17 14" />
									<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
								</svg>
							</Button>
						</Col>
						<Col xs="6" className="text-center">
							<h4 className="font-weight-light">
								Block:{" "}
								{currentBlock.block_header &&
									currentBlock.block_header.raw_data.number}
							</h4>
						</Col>
						<Col xs="3" className="text-right">
							<Button color="link" onClick={() => logout()}>
								<svg
									className="feather fe-icon feather-log-out"
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									viewBox="0 0 24 24"
									fill="none"
									stroke="#93999E"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
									<polyline points="16 17 21 12 16 7" />
									<line x1={21} y1={12} x2={9} y2={12} />
								</svg>
							</Button>
						</Col>
					</Row>
					<Row className="mb-4">
						<Col xs="3">
							<figure
								className={`${styles.box} ${styles.bandwidth}`}
							>
								<Row className={styles.boxRow} noGutters={true}>
									<div>
										<h3>
											{numberSeparator(bandwidth, ",")}
										</h3>
										<h6>Bandwidth</h6>
									</div>
									<div>
										<img
											src={require("../assets/images/bandwidth.svg")}
											alt="bandwidth"
										/>
									</div>
								</Row>
							</figure>
						</Col>
						<Col xs="3">
							<figure
								className={`${styles.box} ${styles.energy}`}
							>
								<Row className={styles.boxRow} noGutters={true}>
									<div>
										<h3>0.0</h3>
										<h6>Energy</h6>
									</div>
									<div>
										<img
											src={require("../assets/images/energy.svg")}
											alt="Energy"
										/>
									</div>
								</Row>
							</figure>
						</Col>
						<Col xs="3">
							<figure className={`${styles.box} ${styles.power}`}>
								<Row className={styles.boxRow} noGutters={true}>
									<div>
										<h3>
											{tronWeb.fromSun(account.power)}
										</h3>
										<h6>Tron Power</h6>
									</div>
									<div>
										<img
											src={require("../assets/images/power.svg")}
											alt="Tron Power"
										/>
									</div>
								</Row>
							</figure>
						</Col>
						<Col xs="3">
							<figure
								className={`${styles.box} ${styles.balance}`}
							>
								<Row className={styles.boxRow} noGutters={true}>
									<div>
										<h3>
											<small>
												{tronWeb.fromSun(balance)} TRX
											</small>
										</h3>
										<h6>Available Balance</h6>
									</div>
									<div>
										<img
											src={require("../assets/images/balance.svg")}
											alt="Available Balance"
										/>
									</div>
								</Row>
							</figure>
						</Col>
					</Row>

					<Row className="mb-4">
						<Col xs="6">
							<figure className={`${styles.box} ${styles.dark}`}>
								<h2 className={styles.title}>Account</h2>
								<div className="ls-group">
									<div className="ls-group-item">
										<div className="key">Name:</div>
										<div className="value">
											{account.name}
											{/* N/A */}
											{/* <svg
											className="icon"
											width={16}
											height={16}
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.111 1L15 4.889 4.889 15H1v-3.889z"
												stroke="#FF6B61"
												strokeWidth="1.556"
												fill="none"
												fillRule="evenodd"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg> */}
										</div>
									</div>
									<div className="ls-group-item">
										<div className="key">Address:</div>
										<div className="value">
											{auth.address}
											<svg
												onClick={this.toggleModal.bind(
													this,
													"qrcode"
												)}
												className="icon cursor"
												width={16}
												height={16}
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M0 7.111h1.778V8.89H0V7.11zm7.111-5.333H8.89v3.555H7.11V1.778zM5.333 7.11H8.89v3.556H7.11V8.889H5.333V7.11zm5.334 0h1.777V8.89h1.778V7.11H16V8.89h-1.778v1.778H16v3.555h-1.778V16h-1.778v-1.778H8.89V16H7.11v-3.556h3.556v-1.777h1.777V8.889h-1.777V7.11zm3.555 7.111v-3.555h-1.778v3.555h1.778zM10.667 0H16v5.333h-5.333V0zm1.777 1.778v1.778h1.778V1.778h-1.778zM0 0h5.333v5.333H0V0zm1.778 1.778v1.778h1.778V1.778H1.778zM0 10.667h5.333V16H0v-5.333zm1.778 1.777v1.778h1.778v-1.778H1.778z"
													fill="#4BD194"
													fillRule="nonzero"
												/>
											</svg>
										</div>
									</div>

									<div className="ls-group-item">
										<Button
											color="success"
											onClick={this.toggleModal.bind(
												this,
												"send"
											)}
										>
											Send
										</Button>
									</div>
								</div>
							</figure>
						</Col>
						<Col xs="6">
							<figure className={`${styles.box} ${styles.dark}`}>
								<Row className="has-tabs">
									<h2 className={styles.title}>Tokens</h2>
									<nav className="css-tabs">
										<a
											className={classnames({
												active:
													this.state.activeTab === "1"
											})}
											onClick={() => {
												this.toggle("1");
											}}
										>
											TRC10
										</a>
										<a
											className={classnames({
												active:
													this.state.activeTab === "2"
											})}
											onClick={() => {
												this.toggle("2");
											}}
										>
											TRC20
										</a>
									</nav>
								</Row>
								<TabContent activeTab={this.state.activeTab}>
									<TabPane tabId="1">
										<ShadowScrollbars
											style={{ height: 200 }}
										>
											<div className="ls-group">
												{newAssetsList &&
													newAssetsList.map(
														(asset, i) => (
															<div
																key={asset.id}
																className="ls-group-item"
															>
																<div className="key light">
																	{asset.key}
																</div>
																<div className="value">
																	{numberSeparator(
																		asset.value,
																		","
																	)}
																</div>
															</div>
														)
													)}
											</div>
										</ShadowScrollbars>
									</TabPane>
									<TabPane tabId="2">
										<ShadowScrollbars
											style={{ height: 200 }}
										>
											<div className="ls-group">
												<span className="text-secondary align-center">
													Coming soon...
												</span>
												{/* {account.assetV2 &&
												account.assetV2.map(
													(asset, i) => (
														<div
															key={asset.key}
															className="ls-group-item"
														>
															<div className="key light">
																{asset.key}
															</div>
															<div className="value">
																{numberSeparator(
																	asset.value,
																	","
																)}
															</div>
														</div>
													)
												)} */}
											</div>
										</ShadowScrollbars>
									</TabPane>
								</TabContent>
							</figure>
						</Col>
					</Row>

					<Row className="mb-4">
						<Col xs="8">
							<figure className={`${styles.box} ${styles.dark}`}>
								<Row className="has-tabs">
									<h2 className={styles.title}>
										Transactions
									</h2>
									<p>
										A Total of{" "}
										<span>{transactions.total}</span>{" "}
										Transactions
									</p>
								</Row>

								<ShadowScrollbars style={{ height: 425 }}>
									<div className="ls-group transactions">
										{transactions &&
											transactions.data &&
											transactions.data.map((tns, i) => (
												<div
													key={tns.id}
													className="ls-group-item"
												>
													<div className="key">
														<a
															href={`https://tronscan.org/#/transaction/${
																tns.hash
															}`}
															target="_blank"
														>
															{
																Truncate(
																	tns.hash,
																	6
																).next
															}
														</a>
													</div>
													<div className="value">
														<TimeAgo
															date={tns.timestamp}
														/>
													</div>
													<div className="value">
														{
															contractType[
																tns.contractType
															]
														}
													</div>
												</div>
											))}
									</div>
								</ShadowScrollbars>
							</figure>
						</Col>
						<Col xs="4">
							<figure className={`${styles.box} ${styles.dark}`}>
								<h2 className={styles.title}>TRON Power</h2>
								<p className="text-sm">
									TRX can be frozen to gain TRON Power and
									enable additional features. For example,
									with TRON Power you can vote for Super
									Representatives.You can gain bandwith or
									energy as well. Frozen tokens are "locked"
									for a period of 3 days. During this period
									the frozen TRX cannot be traded. After this
									period you can unfreeze the TRX and trade
									the tokens. Either one of bandwidth or
									energy can be acquired by each freeze. You
									cannot acquire both resources at the same
									time. When a user unfreeze a certain
									resource, his previous votes will be
									completely voided. If a user would like to
									vote using the remaining TRON Power, he will
									have to perform his voting operations all
									over again.
								</p>
								<Button
									onClick={this.toggleModal.bind(
										this,
										"freeze"
									)}
									color="danger"
								>
									FREEZE
								</Button>
								<Button
									className="ml-2"
									onClick={this.toggleModal.bind(
										this,
										"unFreeze"
									)}
									color="secondary"
								>
									UNFreeze
								</Button>
							</figure>
						</Col>
					</Row>
					<Modal
						isOpen={this.state.qrcode}
						toggle={this.toggleModal.bind(this, "qrcode")}
						className={"qrcode"}
					>
						<h3>SCAN QRCODE</h3>
						<img
							src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${
								auth.address
							}`}
						/>
					</Modal>
					<Modal
						centered={true}
						isOpen={this.state.send}
						toggle={this.toggleModal.bind(this, "send")}
						className={"send"}
					>
						{(sendTransaction.result && (
							<div className="text-center">
								<svg
									className="feather feather-check-circle mt-3 mb-2"
									xmlns="http://www.w3.org/2000/svg"
									width={84}
									height={84}
									viewBox="0 0 24 24"
									fill="none"
									stroke="#00FF8D"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>

								<h3 className="mb-3">Successful Transaction</h3>
								<a
									className="d-block mb-4"
									href={`https://tronscan.org/#/transaction/${
										sendTransaction.transaction.txID
									}`}
									target="_blank"
								>
									<code>
										{sendTransaction.transaction.txID}
									</code>
								</a>

								<Button
									onClick={this.toggleModal.bind(
										this,
										"send"
									)}
									color="secondary"
								>
									Close
								</Button>
							</div>
						)) || (
							<div>
								<h3 className="title">Send</h3>
								<Formik
									initialValues={{
										to: "",
										amount: "",
										token: ""
									}}
									validate={values => {
										let errors = {};
										let value = this.currentToken(
											values.token
										);
										if (value) {
											value = value.value;
										} else {
											value = tronWeb.fromSun(balance);
										}

										const pattern = /^\d+$/;
										// const x = pattern.test(values.amount);
										// console.log({ x, values });
										if (!values.to) {
											errors.to =
												"Please fill a valid address";
										}
										if (!values.amount) {
											errors.amount = "Required";
										} else if (
											// typeof values.amount !== "number"
											!pattern.test(values.amount)
										) {
											errors.amount =
												"Please fill a valid number";
										} else if (values.amount > value) {
											errors.amount = `Your amount should <= ${value}`;
										}

										if (!values.token) {
											errors.token =
												"Please fill a valid token";
										}
										return errors;
									}}
									onSubmit={(values, { setSubmitting }) => {
										this.onSubmit(values);
										// console.log(values);
										setSubmitting(false);
									}}
								>
									{({
										isSubmitting,
										isValid,
										isValidating,
										setFieldValue,
										errors,
										touched
									}) => (
										<Form>
											{/* {console.log({
												isValid,
												touched,
												isValidating
											})} */}
											<Field
												type="text"
												name="to"
												label="To"
												placeholder="To (Address)..."
												component={InputField}
											/>
											<Field
												type="text"
												name="token"
												label="Token"
												placeholder="Token..."
												items={this.state.newAssetsList}
												trx={tronWeb.fromSun(balance)}
												component={InputOptions}
												onChange={e => {
													let value = this.currentToken(
														e.target.value
													);
													if (value) {
														value = value.value;
													} else {
														value = tronWeb.fromSun(
															balance
														);
													}

													this.setState({
														max: value
													});

													setFieldValue(
														"token",
														e.target.value
													);
												}}
											/>
											<Field
												type="number"
												name="amount"
												label="Amount"
												// step="0.000001"
												pattern="\d*"
												placeholder="0"
												icon="MAX"
												clickOnIcon={() =>
													setFieldValue(
														"amount",
														this.state.max
													)
												}
												// clickOnIcon={() =>
												// 	console.log(
												// 		tronWeb.fromSun(balance)
												// 	)
												// }
												component={InputFieldGroup}
											/>
											<div className="actions mt-4">
												<Button
													color="danger"
													type="submit"
													className="mr-2"
													disabled={!isValid}
												>
													Send
												</Button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						)}
					</Modal>
					<Modal
						centered={true}
						isOpen={this.state.freeze}
						toggle={this.toggleModal.bind(this, "freeze")}
						className={"send"}
					>
						{(freezeBalance && freezeBalance.result && (
							<div className="text-center">
								<svg
									className="feather feather-check-circle mt-3 mb-2"
									xmlns="http://www.w3.org/2000/svg"
									width={84}
									height={84}
									viewBox="0 0 24 24"
									fill="none"
									stroke="#00FF8D"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>

								<h3 className="mb-3">Successful Freeze</h3>
								<a
									className="d-block mb-4"
									href={`https://tronscan.org/#/transaction/${
										freezeBalance.transaction.txID
									}`}
									target="_blank"
								>
									<code>
										{freezeBalance.transaction.txID}
									</code>
								</a>

								<Button
									onClick={this.toggleModal.bind(
										this,
										"freeze"
									)}
									color="secondary"
								>
									Close
								</Button>
							</div>
						)) || (
							<div>
								<h3 className="title">FREEZE</h3>
								<Alert color="info">
									Current Power:{" "}
									<b>{tronWeb.fromSun(account.power)}</b>
								</Alert>
								<Formik
									initialValues={{ amount: 0 }}
									validate={values => {
										let errors = {};
										if (
											!values.amount &&
											typeof values.amount !== "number"
										) {
											errors.amount =
												"Please fill a valid number";
										}
										return errors;
									}}
									onSubmit={(values, { setSubmitting }) => {
										this.onSubmitFreeze(values);
										if (values.confirm) {
											setSubmitting(false);
										} else {
											setSubmitting(true);
										}
									}}
								>
									{({
										values,
										touched,
										errors,
										dirty,
										isSubmitting,
										setFieldValue
									}) => (
										<Form>
											<Field
												type="number"
												name="amount"
												label="TRX Amount"
												step="1"
												placeholder="1"
												icon="MAX"
												clickOnIcon={() =>
													setFieldValue(
														"amount",
														tronWeb.fromSun(balance)
													)
												}
												component={InputFieldGroup}
											/>
											<Field
												type="text"
												name="type"
												// label="Token"
												// placeholder="Token..."
												items={[
													{
														key:
															"Freeze TRX to gain bandwith",
														value: 0
													},
													{
														key:
															"Freeze TRX to gain energy",
														value: 1
													}
												]}
												// trx={tronWeb.fromSun(balance)}
												component={InputOptions}
											/>

											<label
												className="label mt-2"
												htmlFor="confirm-item"
											>
												<Field
													id="confirm-item"
													type="checkbox"
													name="confirm"
													component="input"
													className="d-inline-block"
													onChange={e =>
														this.setState({
															confirm:
																e.target.checked
														})
													}
												/>
												<span
													className="d-inline-block"
													style={{
														verticalAlign: "-2px",
														paddingLeft: "10px"
													}}
												>
													I confirm to freeze{" "}
													<b>{values.amount} TRX</b>{" "}
													for at least of 3 days
												</span>
											</label>

											<div className="actions mt-4">
												<Button
													color="danger"
													type="submit"
													className="mr-2"
													disabled={!confirm}
												>
													FREEZE
												</Button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						)}
					</Modal>
					<Modal
						centered={true}
						isOpen={this.state.unFreeze}
						toggle={this.toggleModal.bind(this, "unFreeze")}
						className={"send"}
					>
						{/* {console.log({ unfreezeBalance })} */}
						{(unfreezeBalance && unfreezeBalance.txID && (
							<div className="text-center">
								{!unfreezeBalance.error && (
									<svg
										className="feather feather-check-circle mt-3 mb-2"
										xmlns="http://www.w3.org/2000/svg"
										width={84}
										height={84}
										viewBox="0 0 24 24"
										fill="none"
										stroke="#00FF8D"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
										<polyline points="22 4 12 14.01 9 11.01" />
									</svg>
								)}

								<h3 className="mb-3">{unfreezeBalance.txt}</h3>

								{!unfreezeBalance.error && (
									<a
										className="d-block mb-4"
										href={`https://tronscan.org/#/transaction/${
											unfreezeBalance.txID
										}`}
										target="_blank"
									>
										<code>{unfreezeBalance.txID}</code>
									</a>
								)}

								<Button
									onClick={this.toggleModal.bind(
										this,
										"unFreeze"
									)}
									color="secondary"
								>
									Close
								</Button>
							</div>
						)) || (
							<div>
								<h3 className="title">UNFREEZE</h3>
								<p>Are you sure you want to unfreeze TRX?</p>
								<Formik
									onSubmit={(values, { setSubmitting }) => {
										this.onSubmitUnFreeze(values);
									}}
								>
									{({
										values,
										touched,
										errors,
										dirty,
										isSubmitting
									}) => (
										<Form>
											<Field
												type="text"
												name="type"
												label="Please select the type of unfreeze"
												// placeholder="Token..."
												items={[
													{
														key:
															"Unfreeze the bandwidth account to get TRX",
														value: 0
													},
													{
														key:
															"Unfreeze the energy account to get TRX",
														value: 1
													}
												]}
												// trx={tronWeb.fromSun(balance)}
												component={InputOptions}
											/>

											<div className="actions mt-4">
												<Button
													color="danger"
													type="submit"
													className="mr-2"
												>
													UNFREEZE
												</Button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						)}
					</Modal>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(Home);
