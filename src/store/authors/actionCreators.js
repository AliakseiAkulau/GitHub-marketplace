import * as actions from './actionTypes';

export const addAuthorStarted = () => ({
	type: actions.ADD_AUTHOR_STARTED,
});

export const addAuthorSuccess = (data) => ({
	type: actions.ADD_AUTHOR_SUCCESS,
	payload: { data },
});

export const addAuthorFailure = (error) => ({
	type: actions.ADD_AUTHOR_FAILURE,
	payload: { error },
});

export const getAllAuthorsStarted = () => ({
	type: actions.GET_ALL_AUTHORS_STARTED,
});

export const getAllAuthorsSuccess = (data) => ({
	type: actions.GET_ALL_AUTHORS_SUCCESS,
	payload: { data },
});

export const getAllAuthorsFailure = (error) => ({
	type: actions.GET_ALL_AUTHORS_FAILURE,
	payload: { error },
});
