import axios from 'axios';
import { getToken } from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import { fetchBegin, fetchFailure, fetchSuccess, fetchUsersSuccess, fetchRdvsSuccess } from '../actions/adminActions'


export function fetchUsers() {
    return dispatch => {
        dispatch(fetchBegin());
        axios.get(API_URL + 'users',
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then(res => {
                dispatch(fetchUsersSuccess(res.data.users))
                console.log(res.data.users)
                return res.data.users
            }).catch(err => {
                dispatch(fetchFailure(err.response.data.error))
            })

    }
}

export function fetchRdvs() {
    return dispatch => {
        dispatch(fetchBegin());
        axios.get(API_URL + 'rendez-vous',
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then(res => {
                dispatch(fetchRdvsSuccess(res.data.rdv))
                console.log(res.data.rdv)
                return res.data.rdv
            }).catch(err => {
                dispatch(fetchFailure(err.response.data.error))
            })

    }
}

export function fetchAll() {
    const getUsers = axios.get(API_URL + 'users',
        { headers: { "Authorization": `Bearer ${getToken()}` } })
    const getRdv = axios.get(API_URL + 'rendez-vous',
        { headers: { "Authorization": `Bearer ${getToken()}` } })

    const getRdvToday = axios.get(API_URL + 'rendez-vous/today',
        { headers: { "Authorization": `Bearer ${getToken()}` } })

    return dispatch => {
        dispatch(fetchBegin());
        axios.all([getUsers, getRdv, getRdvToday])
            .then(
                axios.spread((...allData) => {
                    dispatch(fetchSuccess(allData));
                    return allData;
                })
            )
            .catch(err => {
                if (err.response) {
                    dispatch(fetchFailure(err.response.data))
                }
            })
    }
}
