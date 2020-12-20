import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import { fetchBegin, fetchSuccess, fetchFailure } from '../actions/examActions'

export function getAll() {
    return dispatch => {
        dispatch(fetchBegin());
        axios.get(API_URL + "exams",
        { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
            dispatch(fetchSuccess(res.data.exams))
            return res.data
        }).catch((err) => {
            if (err.response)
                dispatch(fetchFailure(err.response.data.error))
        })
    }
}