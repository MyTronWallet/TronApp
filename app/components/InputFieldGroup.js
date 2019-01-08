import React from "react";
import shortid from "shortid";
// import classnames from "classnames";

export const InputFieldGroup = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	icon,
	clickOnIcon,
	...props
}) => {
	const id = shortid();
	const _icon = icon ? (
		icon
	) : (
		<svg
			className="feather feather-copy"
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			data-reactid={381}
		>
			<rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
	);
	return (
		<div className="mb-1">
			<label className="label" htmlFor={field.name}>
				{props.label}
				{touched[field.name] && errors[field.name] && (
					<span className="text-danger pl-1">
						{errors[field.name]}
					</span>
				)}
			</label>
			<div className="input-group mb-1">
				<input
					className="form-control"
					id={field.name}
					type="text"
					{...field}
					{...props}
				/>
				<div className="input-group-append" onClick={clickOnIcon}>
					<div className="input-group-text">{_icon}</div>
				</div>
			</div>
		</div>
	);
};

export const InputField = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	// const id = shortid();
	// console.log({ touched: touched[field.name] });
	return (
		<div className="mb-1">
			<label className="label" htmlFor={field.name}>
				{props.label}
				{touched[field.name] && errors[field.name] && (
					<span className="text-danger pl-1">
						{errors[field.name]}
					</span>
				)}
			</label>
			<input
				className="form-control mb-1"
				id={field.name}
				type="text"
				{...field}
				{...props}
			/>
		</div>
	);
};

export const InputOptions = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	items,
	trx,
	...props
}) => {
	// const id = shortid();
	return (
		<div className="mb-1">
			<label className="label" htmlFor={field.name}>
				{props.label}
				{touched[field.name] && errors[field.name] && (
					<span className="text-danger pl-1">
						{errors[field.name]}
					</span>
				)}
			</label>
			<select
				className="form-control mb-1"
				id={field.name}
				type="text"
				{...field}
				{...props}
			>
				<option value="" disabled hidden>
					Choose here
				</option>
				{/* <optgroup label="TRC10 Token"> */}
				{trx && <option value={"TRX"}>TRX ({trx} Available)</option>}
				{items &&
					items.map(
						item =>
							(trx && (
								<option key={item.key} value={item.key}>
									{item.key}{" "}
									{trx && ` (${item.value} Available)`}
								</option>
							)) || (
								<option key={item.key} value={item.value}>
									{item.key}
								</option>
							)
					)}
				{/* </optgroup> */}
			</select>
		</div>
	);
};

export const Checkbox = ({
	field: { name, value, onChange, onBlur },
	form: { errors, touched, setFieldValue },
	id,
	label,
	className,
	...props
}) => {
	return (
		<div>
			<input
				name={name}
				id={field.name}
				type="checkbox"
				value={value}
				checked={value}
				onChange={onChange}
				onBlur={onBlur}
				className={classNames("radio-button")}
			/>
			<label htmlFor={field.name}>{label}</label>
			{/* {touched[name] && <InputFeedback error={errors[name]} />} */}
		</div>
	);
};
