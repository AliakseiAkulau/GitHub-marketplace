import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { CourseForm } from '../';
import { useDispatch } from 'react-redux';
import { mockAuthorsData, mockCoursesData } from '../../../../../constants';

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
		courses: [...mockCoursesData],
	},
};

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(() => {}),
	useSelector: (selector) => selector(mockInitialSelector),
}));
jest.mock('react-router-dom', () => ({
	useParams: () => ({
		courseId: undefined,
	}),
	useHistory: () => {},
}));

describe('CourseForm', () => {
	test('should show authors lists (all and course authors)', () => {
		const { getAllByTestId } = render(<CourseForm />);
		expect(getAllByTestId('courseAuthors')[0].textContent).toBe(
			'Author list empty'
		);
		expect(getAllByTestId('allAuthors').length).toBe(3);
	});
	test("'Create author' click button should call dispatch.", () => {
		useDispatch.mockReturnValue(jest.fn());
		const { getByText, getByLabelText } = render(<CourseForm />);
		const input = getByLabelText('Author name');
		fireEvent.change(input, { target: { value: '234' } });
		const button = getByText('Create author');
		fireEvent.click(button);
		expect(useDispatch).toBeCalled();
	});
	test('Add author button click should add an author to course authors list.', () => {
		const { getAllByRole, getAllByTestId } = render(<CourseForm />);
		const button = getAllByRole('button', { name: 'Add author' });
		expect(getAllByTestId('courseAuthors')[0].textContent).toBe(
			'Author list empty'
		);
		expect(getAllByTestId('allAuthors').length).toBe(3);
		fireEvent.click(button[0]);
		expect(getAllByTestId('courseAuthors').length).toBe(1);
		expect(getAllByTestId('allAuthors').length).toBe(2);
	});
	test("'Delete author' button click should delete an author from the course list.", () => {
		const { getAllByRole, getByRole, getAllByTestId } = render(<CourseForm />);
		const button = getAllByRole('button', { name: 'Add author' });
		expect(getAllByTestId('courseAuthors')[0].textContent).toBe(
			'Author list empty'
		);
		expect(getAllByTestId('allAuthors').length).toBe(3);
		fireEvent.click(button[0]);
		expect(getAllByTestId('courseAuthors').length).toBe(1);
		expect(getAllByTestId('allAuthors').length).toBe(2);
		fireEvent.click(getByRole('button', { name: 'Delete author' }));
		expect(getAllByTestId('courseAuthors')[0].textContent).toBe(
			'Author list empty'
		);
		expect(getAllByTestId('allAuthors').length).toBe(3);
	});
});
