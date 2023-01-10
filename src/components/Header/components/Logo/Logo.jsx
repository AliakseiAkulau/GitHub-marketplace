import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ url, altText, className }) => (
	<img src={url} alt={altText} className={className} />
);

Logo.propTypes = {
	url: PropTypes.string.isRequired,
	altText: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
};

export default Logo;
