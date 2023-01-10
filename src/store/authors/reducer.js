import * as actions from './actionTypes';
const authorsInitialState = {
	loading: false,
	error: null,
	authors: [],
};

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.GET_ALL_AUTHORS_STARTED:
			return {
				...state,
				loading: true,
				authors: [...state.authors],
			};
		case actions.GET_ALL_AUTHORS_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				authors: action.payload.data,
			};
		case actions.GET_ALL_AUTHORS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		case actions.ADD_AUTHOR_STARTED:
			return {
				...state,
				loading: true,
				authors: [...state.authors],
			};
		case actions.ADD_AUTHOR_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				authors: [...state.authors, action.payload.data],
			};
		case actions.ADD_AUTHOR_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

export default authorsReducer;
