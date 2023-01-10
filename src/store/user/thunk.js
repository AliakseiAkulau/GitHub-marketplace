import { getUser, logError, logInUser, logout } from '../../servisces';
import {
	deleteUserStarted,
	deleteUserSuccess,
	deleteUserFailure,
	getUserFailure,
	getUserStarted,
	getUserSuccess,
	logInFailure,
	logInStarted,
	logInSuccess,
} from './actionCreators';
import { deleteUserFromLS, saveToLS } from '../../helpers/auth';

export const getUserMe = (token) => async (dispatch) => {
	dispatch(getUserStarted());

	try {
		const response = await getUser(token);

		if (201 <= response.status <= 300) {
			const { result } = response?.data;
			const name = result.name || result.email;
			dispatch(getUserSuccess({ ...result, name, token }));
		}
	} catch (error) {
		logError(error);
		dispatch(getUserFailure(error.toString()));
		deleteUserFromLS();
	}
};

export const logInUserThunk = (email, password) => async (dispatch) => {
	dispatch(logInStarted());

	try {
		const response = await logInUser({ email, password });

		if (201 <= response.status <= 300) {
			const { result: token } = response?.data;
			dispatch(logInSuccess({ token }));
		}
		saveToLS('token', response.data?.result);
		dispatch(getUserMe(response.data?.result));
	} catch (error) {
		logError(error);
		dispatch(logInFailure(error.toString()));
	}
};

export const deleteUserThunk = (token) => async (dispatch) => {
	try {
		dispatch(deleteUserStarted());
		await logout(token);

		dispatch(deleteUserSuccess());
	} catch (error) {
		logError(error);
		dispatch(deleteUserFailure(error.toString()));
	}
};
