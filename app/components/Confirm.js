import React, { Component } from "react";
import PropTypes from "prop-types";
import { render, unmountComponentAtNode } from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

export default class ReactConfirmAlert extends Component {
	static propTypes = {
		title: PropTypes.string,
		message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		confirmLabel: PropTypes.string,
		cancelLabel: PropTypes.string,
		onConfirm: PropTypes.func,
		onCancel: PropTypes.func,
		children: PropTypes.node
	};

	static defaultProps = {
		title: false,
		message: false,
		childrenElement: () => null,
		confirmLabel: false,
		cancelLabel: false,
		onConfirm: () => null,
		onCancel: () => null
	};

	onClickConfirm = () => {
		this.props.onConfirm();
		this.close();
	};

	onClickCancel = () => {
		this.props.onCancel();
		this.close();
	};

	close = () => {
		removeElementReconfirm();
	};

	render() {
		const {
			title,
			message,
			confirmLabel,
			cancelLabel,
			childrenElement
		} = this.props;

		return (
			<Modal isOpen={true}>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>
					{message && (
						<div dangerouslySetInnerHTML={{ __html: message }} />
					)}
					{childrenElement()}
				</ModalBody>
				<ModalFooter>
					{cancelLabel && (
						<Button color="link" onClick={this.onClickCancel}>
							{cancelLabel}
						</Button>
					)}
					{confirmLabel && (
						<Button color="primary" onClick={this.onClickConfirm}>
							{confirmLabel}
						</Button>
					)}
				</ModalFooter>
			</Modal>
		);
	}
}

function createElementReconfirm(properties) {
	const divTarget = document.createElement("div");
	divTarget.id = "react-confirm-alert";
	document.body.appendChild(divTarget);
	render(<ReactConfirmAlert {...properties} />, divTarget);
}

function removeElementReconfirm() {
	const target = document.getElementById("react-confirm-alert");
	unmountComponentAtNode(target);
	target.parentNode.removeChild(target);
}

export function confirmAlert(properties) {
	createElementReconfirm(properties);
}
