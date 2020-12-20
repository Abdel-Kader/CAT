import { FETCH_ALL_SUCCESS, FETCH_ALL_BEGIN, FETCH_ALL_FAILURE } from './actionTypes'


export const fetchBegin = () => ({
    type: FETCH_ALL_BEGIN
});

export const fetchSuccess = res => ({
    type: FETCH_ALL_SUCCESS,
    payload: { res }
});

export const fetchFailure = error => ({
    type: FETCH_ALL_FAILURE,
    payload: { error }
});
