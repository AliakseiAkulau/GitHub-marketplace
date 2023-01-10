import {
	addCourseFailure,
	addCourseStarted,
	addCourseSuccess,
	deleteCourseFailure,
	deleteCourseStarted,
	deleteCourseSuccess,
	getCoursesFailure,
	getCoursesStarted,
	getCoursesSuccess,
	updateCourseFailure,
	updateCourseStarted,
	updateCourseSuccess,
} from './actionCreators';
import {
	addNewCourse,
	deleteCourse,
	getAllCourses,
	logError,
	updateCourse,
} from '../../servisces';

export const getAllCoursesThunk = () => async (dispatch) => {
	dispatch(getCoursesStarted());

	try {
		const response = await getAllCourses();

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			dispatch(getCoursesSuccess(result));
		}
	} catch (error) {
		logError(error);
		dispatch(getCoursesFailure(error.toString()));
	}
};

export const addCourseThunk = (token, data) => async (dispatch) => {
	dispatch(addCourseStarted());

	try {
		const response = await addNewCourse(token, data);

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			dispatch(addCourseSuccess(result));
		}
	} catch (error) {
		logError(error);
		dispatch(addCourseFailure(error.toString()));
	}
};

export const updateCourseThunk = (token, data, id) => async (dispatch) => {
	dispatch(updateCourseStarted());

	try {
		const response = await updateCourse(token, data, id);

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			dispatch(updateCourseSuccess(result));
		}
	} catch (error) {
		logError(error);
		dispatch(updateCourseFailure(error.toString()));
	}
};

export const deleteCourseThunk = (token, id) => async (dispatch) => {
	dispatch(deleteCourseStarted());

	try {
		const response = await deleteCourse(token, id);

		if (201 <= response.status <= 300) {
			dispatch(deleteCourseSuccess(id));
		}
	} catch (error) {
		logError(error);
		dispatch(deleteCourseFailure(error.toString()));
	}
};
