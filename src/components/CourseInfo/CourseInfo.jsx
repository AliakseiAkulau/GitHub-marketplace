import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthorsSelector, getCoursesSelector } from '../../store/selectors';
import { Button } from '../../common/Button';
import { formatDate, pipeDuration } from '../../helpers';
import './courseInfo.scss';

const CourseInfo = () => {
	const coursesData = useSelector(getCoursesSelector);
	const authorsData = useSelector(getAuthorsSelector);

	const { courseId } = useParams();

	const data = coursesData.find((item) => item.id === courseId) || {
		title: '',
		description: '',
		duration: '',
		authors: [],
		creationDate: '',
	};
	const { title, description, duration, authors, creationDate } = data;

	return (
		<div className='content-wrapper'>
			<Link to='/courses'>
				<Button btnClassName='back-to-course' btnText='Back to course' />
			</Link>
			<h1 className='title'>{title}</h1>
			<div className='course-info-wrapper'>
				<div className='description'>
					<p>{description}</p>
				</div>
				<div className='right-content'>
					<ul className='list'>
						<li className='list-item'>
							<span className='list-item-name'>ID:</span>
							<span className='list-item-value'>{courseId}</span>
						</li>
						<li className='list-item'>
							<span className='list-item-name'>Duration:</span>
							<span className='list-item-value'>
								{pipeDuration(duration)} hours
							</span>
						</li>
						<li className='list-item'>
							<span className='list-item-name'>Created:</span>
							<span className='list-item-value'>
								{formatDate(creationDate)}
							</span>
						</li>
						<li className='list-item'>
							<span className='list-item-name'>Authors:</span>
							{authors.map((item) => (
								<p className='list-item-value' key={item}>
									{
										authorsData.find((searchItem) => searchItem.id === item)
											.name
									}
								</p>
							))}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
