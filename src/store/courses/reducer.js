import * as actions from './actionTypes';
export const coursesInitialState = {
	loading: false,
	error: null,
	courses: [],
};

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.ADD_COURSE_STARTED:
			return {
				...state,
				loading: true,
				courses: [...state.courses],
			};
		case actions.ADD_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				courses: [...state.courses, { ...action.payload.data }],
			};
		case actions.ADD_COURSE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				courses: [...state.courses],
			};
		case actions.GET_COURSES_STARTED:
			return { ...state, loading: true, courses: [...state.courses] };
		case actions.GET_COURSES_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				courses: [...action.payload.data],
			};
		case actions.GET_COURSES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				courses: [...state.courses],
			};
		case actions.DELETE_COURSE_STARTED:
			return {
				...state,
				loading: true,
				courses: [...state.courses],
			};
		case actions.DELETE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				courses: [...state.courses].filter(
					(item) => item.id !== action.payload.id
				),
			};
		case actions.DELETE_COURSE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				courses: [...state.courses],
			};
		case actions.UPDATE_COURSE_STARTED:
			return {
				...state,
				loading: true,
				courses: state.courses,
			};
		case actions.UPDATE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				courses: state.courses.map((item) =>
					item.id === action.payload.data.id
						? {
								...item,
								...action.payload.data,
						  }
						: item
				),
			};
		case actions.UPDATE_COURSE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				courses: state.courses,
			};
		default:
			return state;
	}
};

export default coursesReducer;
