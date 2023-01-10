import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../../../common/Input';
import { Button } from '../../../../common/Button';
import { TextArea } from '../../../../common/TextArea';
import { AuthorItem } from './components/AuthorItem';
import { Label } from '../../../../common/Label';
import { pipeDuration } from '../../../../helpers';
import { addNewAuthorThunk } from '../../../../store/authors/thunk';
import {
	getAuthorsSelector,
	getCoursesSelector,
	getUserSelector,
} from '../../../../store/selectors';
import {
	addCourseThunk,
	updateCourseThunk,
} from '../../../../store/courses/thunk';
import './courseForm.scss';

const CourseForm = () => {
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseDuration, setCourseDuration] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const allAuthors = useSelector(getAuthorsSelector);
	const allCourse = useSelector(getCoursesSelector);
	const [addAuthorName, setAddAuthorName] = useState('');
	const dispatch = useDispatch();
	const { token } = useSelector(getUserSelector);
	const { courseId } = useParams();

	useEffect(() => {
		if (courseId) {
			const course = allCourse.find((item) => item.id === courseId);
			setCourseTitle(course.title);
			setCourseDescription(course.description);
			setCourseDuration(`${course.duration}`);
			const oldCourseAuthor = course.authors
				.map((item) => searchAuthor(allAuthors, item))
				.flat();
			setCourseAuthors(oldCourseAuthor);
		}
	}, [allAuthors, allCourse, courseId]);

	const history = useHistory();

	const onCreateCourseClick = () => {
		if (
			courseTitle.length === 0 ||
			courseDuration.length === 0 ||
			courseAuthors.length === 0
		) {
			alert('Please, fill in all fields');
			return;
		} else if (courseDescription.length < 2) {
			alert('courseDescription should be at least 2 characters');
			return;
		} else if (parseInt(courseDuration, 10) === 0) {
			alert('duration should be more than 0 minute');
			return;
		}

		const newCourse = {
			title: courseTitle,
			description: courseDescription,
			duration: parseInt(courseDuration, 10),
			authors: courseAuthors.map((item) => item.id),
		};

		// TODO check error before navigate to courses ?
		if (courseId) {
			dispatch(updateCourseThunk(token, newCourse, courseId));
		} else {
			dispatch(addCourseThunk(token, newCourse));
		}

		history.push('/courses');
	};

	const onTitleChange = (value) => {
		setCourseTitle(value);
	};

	const onDescriptionChange = (value) => {
		setCourseDescription(value);
	};

	const onAddAuthorName = (value) => {
		setAddAuthorName(value);
	};

	const onDurationChange = (value) => {
		if (isNaN(value)) {
			alert('please provide number for duration');
		} else {
			setCourseDuration(value);
		}
	};

	const searchAuthor = (list, id) => list.filter((item) => item.id === id);

	const addItem = (list, item) => [...list, ...item];

	const deleteItem = (list, value) => list.filter((item) => item.id !== value);

	const onAddAuthorClick = (id) => {
		const newAuthor = searchAuthor(allAuthors, id);
		setCourseAuthors(addItem(courseAuthors, newAuthor));
	};

	const onDeleteAuthorClick = (id) => {
		setCourseAuthors(deleteItem(courseAuthors, id));
	};

	const onCreateAuthorClick = (authorName) => {
		if (authorName.length < 2) {
			alert('author name length should be at least 2 characters');
			return;
		}
		dispatch(addNewAuthorThunk(token, authorName));
	};

	return (
		<div className='create-course-wrapper'>
			<div className='first-section'>
				<Label id='title-input' labelText='Title'>
					<Input
						id='title-input'
						inputClassName='title-input'
						onChange={onTitleChange}
						value={courseTitle}
						placeholder='Enter title...'
					/>
				</Label>
				<Button
					btnText={courseId ? 'Update course' : 'Create course'}
					onClick={onCreateCourseClick}
				/>
			</div>
			<div className='second-section'>
				<Label id='textAria-description' labelText='Description'>
					<TextArea
						textAreaClassName='textAria-description'
						id='textAria-description'
						placeholder='Enter description'
						value={courseDescription}
						onChange={onDescriptionChange}
					/>
				</Label>
			</div>
			<div className='third-section'>
				<div className='container add-author-container'>
					<h3 className='add-author'>Add author</h3>
					<Label id='author-name' labelText='Author name'>
						<Input
							id='author-name'
							inputClassName='author-name-input'
							onChange={onAddAuthorName}
							value={addAuthorName}
							placeholder='Enter author name...'
						/>
					</Label>
					<Button
						btnText='Create author'
						btnClassName='create-author-btn'
						onClick={(e) => onCreateAuthorClick(addAuthorName, e)}
					/>
				</div>
				<div className='container select-author-container'>
					<h3 className='select-author'>Authors</h3>
					<ul className='authors-list all-authors' aria-labelledby='allAuthors'>
						{allAuthors.length > 0 ? (
							allAuthors
								.filter(
									({ id: allAuthorsId }) =>
										!courseAuthors?.some(
											({ id: courseAuthorsId }) =>
												allAuthorsId === courseAuthorsId
										)
								)
								.map(({ id, name }) => (
									<AuthorItem
										name={name}
										key={`allAuthors${id}`}
										onClick={(e) => onAddAuthorClick(id, e)}
										btnLabel='Add author'
										testId='allAuthors'
									/>
								))
						) : (
							<li className='empty-list' data-testid='allAuthors'>
								<span className='empty-list'>Author list empty</span>
							</li>
						)}
					</ul>
				</div>
				<div className='container add-duration-container'>
					<h3 className='add-duration'>Duration</h3>
					<Label id='duration' labelText='Duration'>
						<Input
							id='duration'
							inputClassName='duration-input'
							onChange={onDurationChange}
							value={courseDuration}
							placeholder='Enter duration in minutes...'
						/>
					</Label>
					<span className='display-duration'>
						Duration: <strong>{pipeDuration(courseDuration)}</strong> hours
					</span>
				</div>
				<div className='container select-author-container'>
					<h3 className='course-authors'>Course authors</h3>
					<ul className='authors-list course-authors'>
						{courseAuthors.length > 0 ? (
							courseAuthors.map(({ id, name }) => (
								<AuthorItem
									name={name}
									key={`courseAuthors${id}`}
									onClick={(e) => onDeleteAuthorClick(id, e)}
									btnLabel='Delete author'
									testId='courseAuthors'
								/>
							))
						) : (
							<li className='empty-list' data-testid='courseAuthors'>
								<span className='empty-list'>Author list empty</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
