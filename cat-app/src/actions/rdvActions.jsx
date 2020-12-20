import {
  FETCH_RDV_BEGIN, FETCH_RDV_SUCCESS, FETCH_RDV_FAILURE,
  ADD_RDV_BEGIN, ADD_RDV_SUCCESS, ADD_RDV_FAILURE,
  UPDATE_RDV_SUCCESS, UPDATE_RDV_FAILURE, 
  FETCH_CONSULTATION_SUCCESS,
  FETCH_CONSULTATION_FAILURE,FETCH_NEXT_CONSULTATION_SUCCESS
} from './actionTypes'

export const fetchRdvBegin = () => ({
    type: FETCH_RDV_BEGIN
  });
  
export const fetchRdvSuccess = demandes => ({
  type: FETCH_RDV_SUCCESS,
  payload: { demandes }
});

export const fetchRdvFailure = error => ({
  type: FETCH_RDV_FAILURE,
  payload: { error }
});

export const addRdvBegin = () => ({
  type: ADD_RDV_BEGIN
});

export const addRdvSuccess = newRdv => ({
type: ADD_RDV_SUCCESS,
payload: { newRdv }
}); 

export const addRdvFailure = error => ({
type: ADD_RDV_FAILURE,
payload: { error }
});

export const updateRdvBegin = () => ({
  type: ADD_RDV_BEGIN
});

export const updateRdvSuccess = rdv => ({
type: UPDATE_RDV_SUCCESS,
payload: { rdv }
});

export const updateRdvFailure = error => ({
type: UPDATE_RDV_FAILURE,
payload: { error }
});


export const getConsultationBegin = () => ({
  type: ADD_RDV_BEGIN
});

export const getConsultationSuccess = consultations => ({
type: FETCH_CONSULTATION_SUCCESS,
payload: { consultations }
});

export const getConsultationFailure = error => ({
type: FETCH_CONSULTATION_FAILURE,
payload: { error }
});

export const getNextConsultationSuccess = nextConsultations => ({
  type: FETCH_NEXT_CONSULTATION_SUCCESS,
  payload: { nextConsultations }
  });
