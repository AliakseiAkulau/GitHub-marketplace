import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './input.scss';

const Input = ({
	id,
	inputClassName,
	placeholder,
	onChange,
	value,
	...props
}) => (
	<input
		type='text'
		id={id}
		className={classNames('input', inputClassName)}
		placeholder={placeholder}
		value={value}
		onChange={(event) => onChange(event.target.value)}
		{...props}
	/>
);

Input.propTypes = {
	id: PropTypes.string.isRequired,
	inputClassName: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

Input.defaultProps = {
	inputClassName: '',
	placeholder: '',
	onChange: () => {},
	value: '',
};

export default Input;
