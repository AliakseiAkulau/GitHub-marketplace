import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const Button = ({
	btnText,
	btnRef,
	className,
	btnClassName,
	isDisabled,
	children,
	type,
	...props
}) => (
	<button
		ref={btnRef}
		className={classNames(className, btnClassName, 'btn', {
			'btn--disabled': isDisabled,
		})}
		type={type}
		{...(isDisabled && { disabled: isDisabled })}
		{...props}
	>
		{btnText}
		{children && children}
	</button>
);

Button.propTypes = {
	btnText: PropTypes.string,
	btnRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	className: PropTypes.string,
	btnClassName: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

Button.defaultProps = {
	btnText: '',
	btnRef: () => null,
	className: '',
	btnClassName: '',
	isDisabled: false,
	type: 'button',
	children: null,
};

export default Button;
