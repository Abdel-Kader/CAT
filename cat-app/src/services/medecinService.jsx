import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import {
    fetchMedecinBegin,
    fetchMedecinSuccess,
    fetchMedecinFailure,
    getMedecinDetailBegin,
    getMedecinDetailSuccess,
    getMedecinDetailFailure, fetchStatBegin, fetchStatSuccess, fetchStatFailure
} from '../actions/medecinActions'


export function getMedecins() {
    return dispatch => {
        dispatch(fetchMedecinBegin());
        axios
            .get(API_URL + "medecins",
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then(res => {
                dispatch(fetchMedecinSuccess(res.data))
                return res.data
            }).catch((err) => {
                dispatch(fetchMedecinFailure(err.response.data))
            })
    }
}

export function detailMedecin(id) {
    return dispatch => {
        dispatch(getMedecinDetailBegin());
        axios
            .get(API_URL + "medecin?id="+id,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then(res => {
                dispatch(getMedecinDetailSuccess(res.data))
                return res.data
            }).catch((err) => {
                dispatch(getMedecinDetailFailure(err.response.data))
            })
    }
}

export function getStats(id) {
    const getPatients = axios
        .get(API_URL + "consultation?id=" + id+ "&profile=1",
            { headers: { "Authorization": `Bearer ${getToken()}` } });
    const getRdv = axios.get(API_URL + "mes-rendez-vous?id=" + id + "&model=Medecin",
        { headers: { "Authorization": `Bearer ${getToken()}` } });
    const getConsults = axios.get(API_URL + "consultations?id=" + id ,
        { headers: { "Authorization": `Bearer ${getToken()}` } });
    const getCurrentConsts =  axios
        .get(API_URL + "consultation/attente?id=" + id + "&model=Medecin&date=now",
            { headers: { "Authorization": `Bearer ${getToken()}` } });

    return dispatch => {
        dispatch (fetchStatBegin());
        axios.all([getPatients, getRdv, getConsults, getCurrentConsts])
            .then(
                axios.spread((...allData)=> {
                    dispatch(fetchStatSuccess(allData));
                    console.log(allData)
                    return allData;
                })
            )
            .catch(err=> {
                if(err.response) {
                    dispatch(fetchStatFailure(err.response.data))
                }
            })
    }
}
