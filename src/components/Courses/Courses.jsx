import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CourseCard } from './components/CourseCard';
import { SearchBar } from './components/SearchBar';
import { Button } from '../../common/Button';
import { getCoursesSelector, getUserSelector } from '../../store/selectors';
import './courses.scss';
import { getAllAuthorsThunk } from '../../store/authors/thunk';
import { getAllCoursesThunk } from '../../store/courses/thunk';

const Courses = () => {
	const coursesData = useSelector(getCoursesSelector);
	const { role } = useSelector(getUserSelector);
	const [displayedCourses, setDisplayedCourses] = useState(coursesData || []);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllAuthorsThunk());
		dispatch(getAllCoursesThunk());
	}, [dispatch]);

	useEffect(() => {
		setDisplayedCourses(coursesData);
	}, [coursesData]);

	const filterCourses = (query) =>
		setDisplayedCourses(
			coursesData.filter(
				(item) =>
					item.id.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
					item.title.toLowerCase().indexOf(query.toLowerCase()) > -1
			)
		);

	const handleAddNewCourseClick = () => history.push('/courses/add');

	return (
		<>
			<div className='content-wrapper'>
				<div className='search-wrapper'>
					<SearchBar filterCourses={filterCourses} />
					<Button
						btnText={'Add new course'}
						onClick={handleAddNewCourseClick}
						isDisabled={role !== 'admin'}
					/>
				</div>
				<div className='courses-wrapper'>
					{displayedCourses?.map(
						({ id, title, description, creationDate, duration, authors }) => (
							<CourseCard
								id={id}
								key={`${id}`}
								title={title}
								description={description}
								creationDate={creationDate}
								duration={duration}
								authors={authors}
								isAdmin={role === 'admin'}
							/>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default Courses;
