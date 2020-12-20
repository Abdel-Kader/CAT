import axios from "axios";
import { getToken } from "../utils/jwtUtil";
import { API_URL } from "../config/config";
import {
	addUserBegin,
	addUserFailure,
	addUserSuccess,
	fetchProfileFailure,
	fetchProfileSuccess,
} from "../actions/userActions";

export function addUser(user) {
	return (dispatch) => {
		dispatch(addUserBegin());
		axios
			.post(
				API_URL + "users/register",
				{
					first_name: user.firstName,
					last_name: user.lastName,
					phone_number: user.phoneNumber,
					address: user.address,
					password: user.password,
					email: user.email,
					specialite: user.specialite,
					service: user.service,
				},
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			.then(function (res) {
				dispatch(addUserSuccess(res.data.userId));
			})
			.catch(function (err) {
				if (err.response) dispatch(addUserFailure(err.response.data.error));
			});
	};
}

export const me = (profile) => {
	return (dispatch) => {
		dispatch(addUserBegin());
		axios
			.get(API_URL + "users/me?profile=" + profile, {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				dispatch(fetchProfileSuccess(res.data.user));
				return res.data.user;
			})
			.catch((err) => {
				dispatch(fetchProfileFailure(err.response.data.error));
			});
	};
};

export const updateProfile = (user) => {
	return (dispatch) => {
		dispatch(addUserBegin());
		axios
			.put(
				API_URL + "users/me",
				{
					first_name: user.first,
					last_name: user.last,
					phone_number: user.phone,
					address: user.adress,
					email: user.mail,
				},
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			.then(function (res) {
				dispatch(addUserSuccess(res.data.userUpdate));
			})
			.catch(function (err) {
				if (err.response) dispatch(addUserFailure(err.response.data.error));
			});
	};
};
