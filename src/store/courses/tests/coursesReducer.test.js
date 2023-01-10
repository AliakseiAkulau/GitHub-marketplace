import coursesReducer, { coursesInitialState } from '../reducer';
import {
	addCourseFailure,
	addCourseStarted,
	addCourseSuccess,
	getCoursesFailure,
	getCoursesStarted,
	getCoursesSuccess,
} from '../actionCreators';
import { addNewCourse, getAllCourses } from '../../../servisces';
import { addCourseThunk, getAllCoursesThunk } from '../thunk';
import { mockCoursesData } from '../../../constants';

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(coursesInitialState);
	});
	it('should handle SAVE_COURSE and returns new state', () => {
		expect(coursesReducer(coursesInitialState, addCourseStarted())).toEqual({
			...coursesInitialState,
			loading: true,
		});
		expect(
			coursesReducer(coursesInitialState, addCourseFailure('test error'))
		).toEqual({ ...coursesInitialState, error: 'test error' });
		expect(
			coursesReducer(coursesInitialState, addCourseSuccess(mockCoursesData[1]))
		).toEqual({ ...coursesInitialState, courses: [mockCoursesData[1]] });
	});
	it('should handle GET_COURSES and returns new state', () => {
		expect(coursesReducer(coursesInitialState, getCoursesStarted())).toEqual({
			...coursesInitialState,
			loading: true,
		});
		expect(
			coursesReducer(coursesInitialState, getCoursesFailure('test error'))
		).toEqual({ ...coursesInitialState, error: 'test error' });
		expect(
			coursesReducer(coursesInitialState, getCoursesSuccess(mockCoursesData))
		).toEqual({ ...coursesInitialState, courses: [...mockCoursesData] });
	});
});

jest.mock('../../../servisces', () => ({
	getAllCourses: jest.fn(),
	logError: jest.fn(),
	addNewCourse: jest.fn(),
}));
describe('getAllCoursesThunk', () => {
	it('dispatches a request', async () => {
		const dispatch = jest.fn();
		await getAllCoursesThunk()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(getCoursesStarted());
	});
	describe('when getAllCourses succeeds', () => {
		beforeEach(() => {
			getAllCourses.mockResolvedValue({
				data: {
					result: mockCoursesData,
				},
				status: 201,
			});
		});
		it('dispatches success', async () => {
			const dispatch = jest.fn();
			await getAllCoursesThunk()(dispatch);
			expect(dispatch).toHaveBeenLastCalledWith(
				getCoursesSuccess(mockCoursesData)
			);
		});
	});
	describe('when getAllCourses fails', () => {
		const error = new Error('test FAIL!');
		beforeEach(() => {
			getAllCourses.mockRejectedValue(error);
		});
		it('dispatches failure', async () => {
			const dispatch = jest.fn();
			await getAllCoursesThunk()(dispatch);
			expect(dispatch).toHaveBeenLastCalledWith(
				getCoursesFailure(error.toString())
			);
		});
	});
});
describe('addCourseThunk', () => {
	it('dispatches a request', async () => {
		const dispatch = jest.fn();
		await addCourseThunk('test token', mockCoursesData[0])(dispatch);
		expect(dispatch).toHaveBeenCalledWith(addCourseStarted());
	});
	describe('when addNewCourse succeeds', () => {
		beforeEach(() => {
			addNewCourse.mockResolvedValue({
				data: {
					result: mockCoursesData,
				},
				status: 201,
			});
		});
		it('dispatches success', async () => {
			const dispatch = jest.fn();
			await addCourseThunk('test token', mockCoursesData[0])(dispatch);
			expect(dispatch).toHaveBeenLastCalledWith(
				addCourseSuccess(mockCoursesData)
			);
		});
	});
	describe('when addCourseThunk fails', () => {
		const error = new Error('test FAIL!');
		beforeEach(() => {
			addNewCourse.mockRejectedValue(error);
		});
		it('dispatches failure', async () => {
			const dispatch = jest.fn();
			await addCourseThunk('test token', mockCoursesData[0])(dispatch);
			expect(dispatch).toHaveBeenLastCalledWith(
				addCourseFailure(error.toString())
			);
		});
	});
});
