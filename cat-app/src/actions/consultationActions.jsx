import { ADD_CONSULTATION_BEGIN, ADD_CONSULTATION_SUCCESS, ADD_CONSULTATION_FAILURE, FETCH_CONSULTATION_BEGIN, FETCH_CONSULTATION_SUCCESS, FETCH_CONSULTATION_FAILURE } from './actionTypes'


export const addConsultationBegin = () => ({
    type: ADD_CONSULTATION_BEGIN
});

export const addConsultationSuccess = consultation => ({
    type: ADD_CONSULTATION_SUCCESS,
    payload: { consultation }
});

export const addConsultationFailure = error => ({
    type: ADD_CONSULTATION_FAILURE,
    payload: { error }
});

export const fetchConsultationBegin = () => ({
    type: FETCH_CONSULTATION_BEGIN
});

export const fetchConsultationSuccess = consultations => ({
    type: FETCH_CONSULTATION_SUCCESS,
    payload: { consultations }
});

export const fetchConsultationFailure = error => ({
    type: FETCH_CONSULTATION_FAILURE,
    payload: { error }
});