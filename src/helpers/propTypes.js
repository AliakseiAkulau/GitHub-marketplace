import PropTypes from 'prop-types';

export const courseDataProp = PropTypes.shape({
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	creationDate: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const coursesDataProp = PropTypes.arrayOf(courseDataProp);

export const authorsDataProp = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
	})
);
