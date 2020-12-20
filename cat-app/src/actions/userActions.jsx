import {
	ADD_USER_BEGIN,
	ADD_USER_SUCCESS,
	ADD_USER_FAILURE,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_FAILURE,
} from "./actionTypes";

export const addUserBegin = () => ({
	type: ADD_USER_BEGIN
});

export const addUserSuccess = user => ({
	type: ADD_USER_SUCCESS,
	payload: { user }
});

export const addUserFailure = (error) => ({
	type: ADD_USER_FAILURE,
	payload: { error }
});


export const fetchProfileSuccess = (user) => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: user
});

export const fetchProfileFailure = error => ({
    type: FETCH_PROFILE_FAILURE,
    payload: error
})