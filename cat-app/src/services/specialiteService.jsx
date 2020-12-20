import axios from "axios";
import { getToken } from "../utils/jwtUtil";
import { API_URL } from "../config/config";
import {
	fetchSpecialiteBegin,
	fetchSpecialiteSuccess,
	fetchSpecialiteFailure,
	fetchSpecialiteServiceSuccess
} from "../actions/specialiteActions";


export function getMedecinsBySpecialite() {
	return (dispatch) => {
		dispatch(fetchSpecialiteBegin());
		axios
			.get(API_URL + "specialite", {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				dispatch(fetchSpecialiteSuccess(res.data.specialites));
				return res.data.specialites;
			})
			.catch((err) => {
				dispatch(fetchSpecialiteFailure(err.response.data.error));
			});
	};
}

export function getSpecialites() {
	const getSpecialite = axios.get(API_URL + "specialites",
		{ headers: { "Authorization": `Bearer ${getToken()}` } })

	const getService = axios.get(API_URL + "services",
		{ headers: { "Authorization": `Bearer ${getToken()}` } })
	return (dispatch) => {
		dispatch(fetchSpecialiteBegin());
		axios.all([getSpecialite, getService])
			.then(
				axios.spread((...allData) => {
					dispatch(fetchSpecialiteServiceSuccess(allData));
					return allData;
			})
		)
		.catch((err) => {
			if (err.response)
				dispatch(fetchSpecialiteFailure(err.response.data.error));
		});
	};
}
