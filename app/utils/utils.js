function Truncate(_str, padding = 3) {
	if (!_str) return;
	const str = _str.toString();
	const leftSide = str.substr(0, padding);
	const rightSide = str.substr(str.length - padding, padding);
	const newStr = `${leftSide}${".".repeat(padding)}${rightSide}`;
	return {
		next: newStr,
		prev: str
	};
}

export default Truncate;
