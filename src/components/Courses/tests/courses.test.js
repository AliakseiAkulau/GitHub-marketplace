import React from 'react';
import { render, screen } from '@testing-library/react';

import { Courses } from '../';
import { useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { mockAuthorsData, mockCoursesData } from '../../../constants';

const mockInitialSelector = {
	user: {
		role: 'admin',
		token:
			'Bearer Q+u+gKwx9IoxJd8mT8LdJ29yu9uN0gytdwrouUlDmM9W4OstC8gSOyL12ZkWI3qPgr3/uf3A8Ya7mIik0OI3CvHJEM11e/23mR8aQmiwjPYoXv/UqI4otHHHuEygMn6Z9+AFDKJg01qujY3OwF8lrzVUNAySy40jJqy9+1WNDIZwRqGEGB2kgNKgYZSN9vI4pyu0BWYlzaqOYYiwvq0ryHVGD0v6yGddikYo07SIT+uyPirXn5q+V88CYFUjof8rZjrSoQhFrVMOqoGcuZ1q4JfSQXjTT77TiS11NOwtODsmn4Pxusaa+EqkHNgFIv7WvBVlVEwNlOI961bE2BHBoQ==',
	},
	authors: {
		authors: mockAuthorsData,
	},
	courses: {
		courses: [mockCoursesData[0]],
	},
};

jest.mock('react-redux', () => ({
	useDispatch: () => () => {},
	useSelector: jest.fn(),
}));

describe('Courses', () => {
	test('should display amount of CourseCard equal length of courses array.', () => {
		useSelector.mockImplementation((selector) =>
			selector({
				...mockInitialSelector,
				courses: {
					courses: [...mockCoursesData],
				},
			})
		);
		const { container } = render(<Courses />);
		expect(container.querySelectorAll('.course-card').length).toEqual(
			mockCoursesData.length
		);
	});
	test('should display Empty container if courses array length is 0', () => {
		useSelector.mockImplementation((selector) =>
			selector({
				...mockInitialSelector,
				courses: {
					courses: [],
				},
			})
		);
		const { container } = render(<Courses />);
		expect(
			container.querySelectorAll('.courses-wrapper')[0]
		).toBeEmptyDOMElement();
		expect(
			container.querySelectorAll('.courses-wrapper')[0].children.length
		).toEqual(0);
	});
	test('CourseForm should be showed after a click on a button "Add new course"', () => {
		useSelector.mockImplementation((selector) => selector(mockInitialSelector));
		const history = createMemoryHistory();
		render(
			<>
				<Router history={history}>
					<Courses />
				</Router>
			</>
		);

		userEvent.click(screen.getByText('Add new course'));
		expect(history.location.pathname).toEqual('/courses/add');
	});
});
