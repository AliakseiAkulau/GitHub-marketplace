import {
	addAuthorFailure,
	addAuthorStarted,
	addAuthorSuccess,
	getAllAuthorsFailure,
	getAllAuthorsStarted,
	getAllAuthorsSuccess,
} from './actionCreators';
import { addNewAuthor, getAllAuthors, logError } from '../../servisces';

export const getAllAuthorsThunk = (token) => async (dispatch) => {
	dispatch(getAllAuthorsStarted());

	try {
		const response = await getAllAuthors(token);

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			dispatch(getAllAuthorsSuccess([...result]));
		}
	} catch (error) {
		logError(error);
		dispatch(getAllAuthorsFailure(error.toString()));
	}
};

export const addNewAuthorThunk = (token, data) => async (dispatch) => {
	dispatch(addAuthorStarted());

	try {
		const response = await addNewAuthor(token, data);

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			dispatch(addAuthorSuccess({ ...result }));
		}
	} catch (error) {
		logError(error);
		dispatch(addAuthorFailure(error.toString()));
	}
};
