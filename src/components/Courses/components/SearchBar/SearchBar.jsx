import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../../../common/Input';
import { Button } from '../../../../common/Button';
import './searchBar.scss';

const SearchBar = ({ filterCourses }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const onSubmitSearch = () => {
		filterCourses(searchQuery);
	};

	const onSearchChange = (current) => {
		setSearchQuery(current);
	};

	return (
		<div className='search'>
			<Input
				id='search-courses'
				inputClassName='search-input'
				placeholder='Enter course name or id'
				onChange={onSearchChange}
				value={searchQuery}
			/>
			<Button btnText='Search' onClick={onSubmitSearch} />
		</div>
	);
};

SearchBar.propTypes = {
	filterCourses: PropTypes.func.isRequired,
};

export default SearchBar;
