import * as actions from './actionTypes';
const userInitialState = {
	name: '',
	token: '',
	email: '',
	isAuth: false,
	role: '',
	loading: false,
	error: null,
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.SAVE_USER:
			return {
				...state,
				name: action.payload.name,
				token: action.payload.token,
				email: action.payload.email,
				isAuth: true,
				role: action.payload.role,
			};
		case actions.DELETE_USER_STARTED:
			return {
				...state,
				loading: true,
			};
		case actions.DELETE_USER_SUCCESS:
			return userInitialState;
		case actions.DELETE_USER_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case actions.LOG_IN_STARTED:
			return {
				...state,
				loading: true,
			};
		case actions.LOG_IN_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				error: null,
				loading: false,
			};
		case actions.LOG_IN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		case actions.GET_USER_STARTED:
			return {
				...state,
				loading: true,
			};
		case actions.GET_USER_SUCCESS:
			return {
				...state,
				name: action.payload.name,
				token: action.payload.token,
				email: action.payload.email,
				isAuth: true,
				role: action.payload.role,
				error: null,
				loading: false,
			};
		case actions.GET_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

export default userReducer;
