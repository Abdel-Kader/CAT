import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import {
    addRdvBegin,
    addRdvSuccess,
    addRdvFailure,
    fetchRdvBegin,
    fetchRdvSuccess,
    fetchRdvFailure,
    updateRdvBegin,
    updateRdvSuccess,
    updateRdvFailure,
    getConsultationSuccess,
    getConsultationFailure,
    getNextConsultationSuccess
} from '../actions/rdvActions'


export function add(rdv) {
    return dispatch => {
        dispatch(addRdvBegin());
        axios
            .post(API_URL + "rendez-vous",
                {
                    patientId: rdv.patientId,
                    medecinId: rdv.medecinId,
                    motif: rdv.motif,
                    start: rdv.start
                }, {headers: {"Authorization": `Bearer ${getToken()}`}})
            .then(res => {
                dispatch(addRdvSuccess(res.data))
            })
            .catch(err => {
                dispatch(addRdvFailure(err.response.data.error))
            })
    }
}
// Fetch les demandes envoyées au médecin
export function getDemandes(id, model) {
    return dispatch => {
        dispatch(fetchRdvBegin());
        axios
            .get(API_URL + "mes-rendez-vous?id=" + id + "&model="+ model,
                { headers: { "Authorization": `Bearer ${getToken()}` } })
                .then((res) => {
                    dispatch(fetchRdvSuccess(res.data))
                    return res.data
                }).catch((err) => {
                    dispatch(fetchRdvFailure(err.response.data.error))
                })
    }
}


export function getConsultation(id, model, date) {
    return dispatch => {
        dispatch(fetchRdvBegin());
        axios
            .get(API_URL + "consultation/attente?id=" + id + "&model=" + model + "&date="+date,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
                dispatch(getConsultationSuccess(res.data))
                return res.data
            }).catch((err) => {
                dispatch(getConsultationFailure(err.response.data))
            })
    }
}

export function getNextConsultations(id, model, date) {
    return dispatch => {
        dispatch(fetchRdvBegin());
        axios
            .get(API_URL + "consultation/attente?id=" + id + "&model=" + model + "&date="+date,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
                dispatch(getNextConsultationSuccess(res.data))
                return res.data
            }).catch((err) => {
                dispatch(getConsultationFailure(err.response.data))
            })
    }
}

export function updateStatus(id, status) {
    return dispatch => {
        dispatch(updateRdvBegin());
        axios
        .put(API_URL + "rendez-vous/status",
        {
            id,
            status
        }, {headers: {"Authorization": `Bearer ${getToken()}`}})
    .then(res => {
        dispatch(updateRdvSuccess(res))
    })
    .catch(err => {
        dispatch(updateRdvFailure(err.response.data.error))
    })
    }
}

export function getRdvHistory(id, model, type) {
    return dispatch => {
        dispatch(fetchRdvBegin());
        axios
            .get(API_URL + "mes-rendez-vous/history?id=" + id + "&model="+ model+ "&type="+ type,
                { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
                    dispatch(fetchRdvSuccess(res.data))
                    return res.data
                }).catch((err) => {
                    dispatch(fetchRdvFailure(err.response.data.error))
                })
    }
}


export function updateDemande(id, motif, start) {
    return dispatch => {
        dispatch(updateRdvBegin());
        axios
        .put(API_URL + "rendez-vous/update",
        {
            id,
            motif,
            start,
        }, {headers: {"Authorization": `Bearer ${getToken()}`}})
    .then(res => {
        dispatch(updateRdvSuccess(res))
    })
    .catch(err => {
        dispatch(updateRdvFailure(err.response.data.error))
    })
    }
}
