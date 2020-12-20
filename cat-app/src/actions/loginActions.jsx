import {
	LOGIN_BEGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
} from "./actionTypes";

export const userLoginBegin = () => ({
	type: LOGIN_BEGIN,
});

export const userLoginSuccess = (userData) => ({
	type: LOGIN_SUCCESS,
	payload: { userData },
});

export const userLoginFailure = (error) => ({
	type: LOGIN_FAILURE,
	payload: { error },
});

export const userLogOutSuccess = () => ({
	type: LOGOUT_SUCCESS,
});

