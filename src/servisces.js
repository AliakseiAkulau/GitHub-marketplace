import axios from 'axios';

const LOGIN = 'http://localhost:3000/login';
const REGISTER = 'http://localhost:3000/register';
const GET_USER = 'http://localhost:3000/users/me';
const GET_ALL_COURSES = 'http://localhost:3000/courses/all';
const ADD_NEW_COURSE = 'http://localhost:3000/courses/add';
const DELETE_COURSE = 'http://localhost:3000/courses/';
const UPDATE_COURSE = 'http://localhost:3000/courses/';
const GET_ALL_AUTHORS = 'http://localhost:3000/authors/all';
const ADD_NEW_AUTHOR = 'http://localhost:3000/authors/add';
const LOGOUT = 'http://localhost:3000/logout';
const POST = 'POST';
const GET = 'GET';
const DELETE = 'DELETE';
const PUT = 'PUT';

export const logError = (error) => {
	console.error('error', error);
	if (error.response) {
		console.log(
			`status code: ${error.response.status} message: ${error.toString()}`
		);
	} else {
		console.log('Error', error.message);
	}
};

const postRequest = async (method, route, data = {}, config = {}) => {
	let res;
	if (method === POST) {
		res = await axios.post(route, data, config);
	} else if (method === GET) {
		res = await axios.get(route, data);
	} else if (method === DELETE) {
		res = await axios.delete(route, data);
	} else if (method === PUT) {
		res = await axios.put(route, data, config);
	}
	return res;
};

export const logInUser = async (data) => {
	return await postRequest(POST, LOGIN, data);
};

export const registerUser = async (data) => {
	return await postRequest(POST, REGISTER, data);
};
export const getUser = async (token) => {
	return await postRequest(GET, GET_USER, {
		headers: {
			Authorization: token,
		},
	});
};

export const getAllCourses = async () => {
	return await postRequest(GET, GET_ALL_COURSES);
};

export const addNewCourse = async (token, data) => {
	return await postRequest(
		POST,
		ADD_NEW_COURSE,
		{
			...data,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);
};
export const deleteCourse = async (token, id) => {
	return await postRequest(DELETE, `${DELETE_COURSE}${id}`, {
		headers: {
			Authorization: token,
		},
	});
};
export const updateCourse = async (token, data, id) => {
	return await postRequest(PUT, `${UPDATE_COURSE}${id}`, data, {
		headers: {
			Authorization: token,
		},
	});
};

export const getAllAuthors = async (token) => {
	return await postRequest(GET, GET_ALL_AUTHORS, {
		headers: {
			Authorization: token,
		},
	});
};

export const addNewAuthor = async (token, data) => {
	return await postRequest(
		POST,
		ADD_NEW_AUTHOR,
		{
			name: data,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);
};

export const logout = async (token) => {
	return await postRequest(DELETE, LOGOUT, {
		headers: {
			Authorization: token,
		},
	});
};
