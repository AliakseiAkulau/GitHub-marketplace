import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Courses } from './components/Courses';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { checkAuth } from './helpers/auth';
import { CourseForm } from './components/Courses/components/CourseForm';
import { CourseInfo } from './components/CourseInfo';
import { PrivateRouter } from './components/PrivateRouter';
import { getUserSelector } from './store/selectors';

const App = () => {
	const isLoggedIn = checkAuth();
	const { isAuth, token, role } = useSelector(getUserSelector);

	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/'>
						{isLoggedIn && isAuth && <Redirect to='/courses' />}
						{isLoggedIn && isAuth === false && token.length > 0 && (
							<Redirect to='/login' />
						)}
					</Route>
					<Route exact path='/courses'>
						<Courses />
					</Route>
					<PrivateRouter
						exact
						strict
						path='/courses/add'
						component={CourseForm}
						role={role}
					/>
					<PrivateRouter
						exact
						strict
						path='/courses/update/:courseId'
						component={CourseForm}
						role={role}
					/>
					<Route exact path='/courses/:courseId'>
						<CourseInfo />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/registration'>
						<Registration />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default App;
