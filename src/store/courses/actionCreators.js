import * as actions from './actionTypes';

export const addCourseStarted = () => ({
	type: actions.ADD_COURSE_STARTED,
});

export const addCourseSuccess = (data) => ({
	type: actions.ADD_COURSE_SUCCESS,
	payload: { data },
});

export const addCourseFailure = (error) => ({
	type: actions.ADD_COURSE_FAILURE,
	payload: { error },
});

export const deleteCourseStarted = () => ({
	type: actions.DELETE_COURSE_STARTED,
});

export const deleteCourseSuccess = (id) => ({
	type: actions.DELETE_COURSE_SUCCESS,
	payload: { id },
});

export const deleteCourseFailure = (error) => ({
	type: actions.DELETE_COURSE_FAILURE,
	payload: { error },
});

export const updateCourseStarted = () => ({
	type: actions.UPDATE_COURSE_STARTED,
});

export const updateCourseSuccess = (data) => ({
	type: actions.UPDATE_COURSE_SUCCESS,
	payload: { data },
});

export const updateCourseFailure = (error) => ({
	type: actions.UPDATE_COURSE_FAILURE,
	payload: { error },
});

export const getCoursesStarted = () => ({
	type: actions.GET_COURSES_STARTED,
});

export const getCoursesSuccess = (data) => ({
	type: actions.GET_COURSES_SUCCESS,
	payload: { data },
});

export const getCoursesFailure = (error) => ({
	type: actions.GET_COURSES_FAILURE,
	payload: { error },
});
