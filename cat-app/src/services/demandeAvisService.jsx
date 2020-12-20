import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import { demandeAvisBegin, demandeAvisSuccess, demandeAvisFailure, fetchAvisSuccess, fetchAvisFailure } from '../actions/demandeAvisActions'

export function add(avis) {
    return dispatch => {
        dispatch(demandeAvisBegin());
        axios
            .post(API_URL + "demande-avis",
                {
                    requis: avis.requis,
                    requerant: avis.requerant,
                    commentaire: avis.commentaire,
                    files: avis.files
                }, {headers: {"Authorization": `Bearer ${getToken()}`}})
            .then(res => {
                dispatch(demandeAvisSuccess(res.data))
            })
            .catch(function (err) {
                if(err.response) {
                    dispatch(demandeAvisFailure(err.response.data))
                }
            })
    }
}

export function addResponse(id, reponse) {
    return dispatch => {
        dispatch(demandeAvisBegin());
        axios
            .put(API_URL + "demande-avis", {
                id,
                reponse
            },{headers: {"Authorization": `Bearer ${getToken()}`}})
            .then(res => {
                dispatch(demandeAvisSuccess(res.data));
            })
            .catch(function (err) {
                if(err.response) {
                    dispatch(demandeAvisFailure(err.response.data))
                }
            })
    }
}

export function getDemandes(id,type) {
    console.log(type)
    return dispatch => {
        dispatch(demandeAvisBegin());
        axios
        .get(API_URL + "demande-avis?id=" + id+"&type="+type,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
        .then((res) => {
            dispatch(fetchAvisSuccess(res.data.avis))
            return res.data.avis
        })
            .catch(function (err) {
                if(err.response) {
                    dispatch(fetchAvisFailure(err.response.data))
                }
            })
    }
}

export function updateStatut(id, status) {
    return dispatch => {
        dispatch(demandeAvisBegin());
        axios
            .put(API_URL + "demande-avis/status", {
                id,
                status
            },{headers: {"Authorization": `Bearer ${getToken()}`}})
            .then(res => {
                dispatch(demandeAvisSuccess(res))
            })
            .catch(err => {
                if(err.response) {
                    dispatch(demandeAvisFailure(err.response.data))
                }
            })
    }
}
