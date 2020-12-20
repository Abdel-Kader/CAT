import { FETCH_EXAMS_BEGIN, FETCH_EXAMS_SUCCESS, FETCH_EXAMS_FAILURE } from './actionTypes'


export const fetchBegin = () => ({
    type: FETCH_EXAMS_BEGIN
});

export const fetchSuccess = exams => ({
    type: FETCH_EXAMS_SUCCESS,
    payload: { exams }
});

export const fetchFailure = error => ({
    type: FETCH_EXAMS_FAILURE,
    payload: { error }
});
