import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './textAria.scss';

const TextArea = ({ textAreaClassName, id, value, placeholder, onChange }) => (
	<textarea
		className={classNames('textarea', textAreaClassName)}
		id={id}
		placeholder={placeholder}
		value={value}
		onChange={(event) => onChange(event.target.value)}
	/>
);

TextArea.propTypes = {
	textAreaClassName: PropTypes.string,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

TextArea.defaultProps = {
	textAreaClassName: '',
	placeholder: '',
	onChange: () => {},
	value: '',
};

export default TextArea;
