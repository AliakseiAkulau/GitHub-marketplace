import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../common/Button';
import { formatAuthors, formatDate, pipeDuration } from '../../../../helpers';
import {
	getAuthorsSelector,
	getUserSelector,
} from '../../../../store/selectors';
import { deleteCourseThunk } from '../../../../store/courses/thunk';
import './courseCard.scss';

const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	authors,
	isAdmin,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const authorsData = useSelector(getAuthorsSelector);
	const { token } = useSelector(getUserSelector);
	const handleClick = () => {
		history.push(`/courses/${id}`);
	};

	const handleDeleteCourse = () => {
		dispatch(deleteCourseThunk(token, id));
	};
	const handleEditCourse = () => {
		history.push(`/courses/update/${id}`);
	};

	return (
		<div className='course-card' key={id}>
			<div className='left-content'>
				<h2>{title}</h2>
				<p className='description'>{description}</p>
			</div>
			<div className='right-content'>
				<ul className='course-card__description-list'>
					<li className='course-card__authors-wrapper'>
						<span className='bold-span'>Authors:</span>
						<span className='authors-content'>
							{formatAuthors(authorsData, authors)}
						</span>
					</li>
					<li className='course-card__duration-wrapper'>
						<span className='bold-span'>Duration:</span>
						<span className='duration-content'>
							{pipeDuration(duration)} hours
						</span>
					</li>
					<li className='course-card__created-wrapper'>
						<span className='bold-span'>Created:</span>
						<span className='created-content'>{formatDate(creationDate)}</span>
					</li>
				</ul>
				<div className='course-card__button-wrapper'>
					<Button btnText='Show course' onClick={handleClick} />
					{isAdmin && (
						<>
							<Button onClick={handleDeleteCourse}>
								<FaTrash />
							</Button>
							<Button onClick={handleEditCourse}>
								<FaEdit />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

CourseCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	creationDate: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	authors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CourseCard;
