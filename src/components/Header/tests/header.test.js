import React from 'react';
import { render } from '@testing-library/react';

import { Header } from '../';
import { BrowserRouter, Route } from 'react-router-dom';
import { LOGO_ALT_TEXT } from '../../../constants';

jest.mock('../../../helpers/auth', () => ({
	checkAuth: () => true,
	getFromLS: () => {},
}));
jest.mock('react-redux', () => ({
	useDispatch: () => () => {},
	useSelector: (selector) =>
		selector({
			user: {
				name: 'test',
				token:
					'Bearer Q+u+gKwx9IoxJd8mT8LdJ29yu9uN0gytdwrouUlDmM9W4OstC8gSOyL12ZkWI3qPgr3/uf3A8Ya7mIik0OI3CvHJEM11e/23mR8aQmiwjPYoXv/UqI4otHHHuEygMn6Z9+AFDKJg01qujY3OwF8lrzVUNAySy40jJqy9+1WNDIZwRqGEGB2kgNKgYZSN9vI4pyu0BWYlzaqOYYiwvq0ryHVGD0v6yGddikYo07SIT+uyPirXn5q+V88CYFUjof8rZjrSoQhFrVMOqoGcuZ1q4JfSQXjTT77TiS11NOwtODsmn4Pxusaa+EqkHNgFIv7WvBVlVEwNlOI961bE2BHBoQ==',
				email: 'test@test.com',
				isAuth: true,
				role: 'user',
				loading: false,
				error: null,
			},
		}),
}));

describe('Header', () => {
	test("should have logo and user's name", () => {
		const { container, getByAltText } = render(
			<>
				<BrowserRouter>
					<Header />
					<Route path='/login'>login page</Route>
				</BrowserRouter>
			</>
		);

		const img = getByAltText(LOGO_ALT_TEXT);
		expect(container).toHaveTextContent('test');
		expect(img).toBeInTheDocument();
	});
});
