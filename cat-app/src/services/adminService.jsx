import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import { fetchBegin, fetchFailure, fetchSuccess } from '../actions/adminActions'


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
                    axios.spread((...allData)=> {
                        dispatch(fetchSuccess(allData));
                        return allData;
                })
            )
            .catch(err=> {
                if(err.response) {
                    dispatch(fetchFailure(err.response.data))
                }
            })
    }
}
