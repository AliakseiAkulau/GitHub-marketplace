import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../../../common/Button';

const AuthorItem = ({ name, onClick, btnLabel, testId }) => (
	<li className='authors-list-item' data-testid={testId}>
		<span className='authors-list-item-name'>{name}</span>
		<Button btnText={btnLabel} onClick={onClick} />
	</li>
);

AuthorItem.propTypes = {
	name: PropTypes.string.isRequired,
	testId: PropTypes.string.isRequired,
	btnLabel: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default AuthorItem;
