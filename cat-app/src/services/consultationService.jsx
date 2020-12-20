import axios from 'axios';
import {getToken} from "../utils/jwtUtil";
import { API_URL } from '../config/config';
import { addConsultationBegin, addConsultationFailure, addConsultationSuccess, fetchConsultationBegin, fetchConsultationSuccess,fetchConsultationFailure } from '../actions/consultationActions'


export function add(consultation) {
    return dispatch => {
        dispatch(addConsultationBegin()); 
        axios
            .post(API_URL + "consultation",
                    {
                        patientId: consultation.patientId,
                        medecinId: consultation.medecinId,
                        cout: consultation.cout,
                        date_consultation: consultation.date_consultation,
                        heure_debut: consultation.heure_debut,
                        heure_fin: new Date().toLocaleTimeString(),
                        constantes: consultation.constantes,
                        diagnostic: consultation.diagnostic,
                        exams: consultation.exams,
                    }, {headers: {"Authorization": `Bearer ${getToken()}`}})
                .then(res => {
                    dispatch(addConsultationSuccess(res.data))
                })
                .catch(err => {
                    dispatch(addConsultationFailure(err.response.data.error))
                })
    }
}


export function getHistorique(id, model) {
    return dispatch => {
        dispatch(fetchConsultationBegin());
        axios
            .get(API_URL + "consultation?id=" + id + "&profile=" + model,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
                dispatch(fetchConsultationSuccess(res.data.consultation))
                return res.data.consultation
            }).catch((err) => {
                dispatch(fetchConsultationFailure(err.response.data))
            })
    }
}

export function allPatientConsults(id) {
    return dispatch => {
        axios.get(API_URL + "dossier-patient?id="+id,
            { headers: { "Authorization": `Bearer ${getToken()}` } })
            .then((res) => {
                dispatch(fetchConsultationSuccess(res.data.consultation))
                return res.data.consultation
            }).catch((err) => {
            dispatch(fetchConsultationFailure(err.response.data))
        })
    }
}
