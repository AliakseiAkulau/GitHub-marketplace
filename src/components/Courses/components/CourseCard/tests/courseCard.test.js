import React from 'react';
import { render } from '@testing-library/react';

import { CourseCard } from '../';
import { mockAuthorsData, mockCoursesData } from '../../../../../constants';

jest.mock('react-redux', () => ({
	useDispatch: () => () => {},
	useSelector: (selector) =>
		selector({
			user: {
				token:
					'Bearer Q+u+gKwx9IoxJd8mT8LdJ29yu9uN0gytdwrouUlDmM9W4OstC8gSOyL12ZkWI3qPgr3/uf3A8Ya7mIik0OI3CvHJEM11e/23mR8aQmiwjPYoXv/UqI4otHHHuEygMn6Z9+AFDKJg01qujY3OwF8lrzVUNAySy40jJqy9+1WNDIZwRqGEGB2kgNKgYZSN9vI4pyu0BWYlzaqOYYiwvq0ryHVGD0v6yGddikYo07SIT+uyPirXn5q+V88CYFUjof8rZjrSoQhFrVMOqoGcuZ1q4JfSQXjTT77TiS11NOwtODsmn4Pxusaa+EqkHNgFIv7WvBVlVEwNlOI961bE2BHBoQ==',
			},
			authors: {
				authors: mockAuthorsData,
			},
			courses: {
				courses: [mockCoursesData[0]],
			},
		}),
}));

describe('CourseCard', () => {
	test('should display title', () => {
		const { getByRole } = render(
			<CourseCard isAdmin={true} {...mockCoursesData[0]} />
		);
		expect(getByRole('heading')).toBeInTheDocument();
		expect(getByRole('heading').textContent).toContain(
			mockCoursesData[0].title
		);
	});
	test('should display description', () => {
		const { getByText } = render(
			<CourseCard isAdmin={true} {...mockCoursesData[0]} />
		);
		expect(getByText(mockCoursesData[0].description)).toBeInTheDocument();
		expect(getByText(mockCoursesData[0].description).textContent).toBe(
			mockCoursesData[0].description
		);
	});
	test('should display duration in the correct format', () => {
		const { getByText } = render(
			<CourseCard isAdmin={true} {...mockCoursesData[0]} />
		);
		expect(getByText('0:30 hours')).toBeInTheDocument();
	});
	test('should display authors list', () => {
		const { container } = render(
			<CourseCard isAdmin={true} {...mockCoursesData[0]} />
		);
		expect(
			container.querySelectorAll('.authors-content')[0]
		).toBeInTheDocument();
		expect(container.querySelectorAll('.authors-content').length).toBe(1);
		expect(
			container.querySelectorAll('.authors-content')[0].textContent
		).toEqual('author, author2, author6');
	});
	test('should display created date in the correct format', () => {
		const { getByText } = render(
			<CourseCard isAdmin={true} {...mockCoursesData[0]} />
		);
		expect(getByText('9.3.2021')).toBeInTheDocument();
	});
});
