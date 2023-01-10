import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Label = ({ id, labelClassName, labelText, children }) => {
	return (
		<label htmlFor={id} className={classNames(`${id}__label`, labelClassName)}>
			{labelText && <span className='label-text'>{labelText}</span>}
			{children && children}
		</label>
	);
};

Label.propTypes = {
	id: PropTypes.string.isRequired,
	labelClassName: PropTypes.string,
	labelText: PropTypes.string,
	children: PropTypes.element,
};

Label.defaultProps = {
	labelText: '',
	children: null,
	labelClassName: '',
};

export default Label;
