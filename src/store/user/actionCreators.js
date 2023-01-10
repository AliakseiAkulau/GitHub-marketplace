import * as actions from './actionTypes';

export const saveUser = (name, token, email) => ({
	type: actions.SAVE_USER,
	payload: {
		name,
		token,
		email,
	},
});

export const deleteUserStarted = () => ({
	type: actions.DELETE_USER_STARTED,
});
export const deleteUserSuccess = () => ({
	type: actions.DELETE_USER_SUCCESS,
});
export const deleteUserFailure = (error) => ({
	type: actions.DELETE_USER_FAILURE,
	payload: {
		error,
	},
});

export const logInStarted = () => ({
	type: actions.LOG_IN_STARTED,
});

export const logInSuccess = (data) => ({
	type: actions.LOG_IN_SUCCESS,
	payload: { ...data },
});

export const logInFailure = (error) => ({
	type: actions.LOG_IN_FAILURE,
	payload: { error },
});

export const getUserStarted = () => ({
	type: actions.GET_USER_STARTED,
});

export const getUserSuccess = (data) => ({
	type: actions.GET_USER_SUCCESS,
	payload: { ...data },
});

export const getUserFailure = (error) => ({
	type: actions.GET_USER_FAILURE,
	payload: {
		error,
	},
});
