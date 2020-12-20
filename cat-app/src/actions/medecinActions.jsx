import {
  FETCH_MEDECIN_BEGIN,
  FETCH_MEDECIN_SUCCESS,
  FETCH_MEDECIN_FAILURE,
  GET_DETAIL_MEDECIN_BEGIN,
  GET_DETAIL_MEDECIN_FAILURE,
  GET_DETAIL_MEDECIN_SUCCESS, FETCH_MED_STAT_BEGIN, FETCH_MED_STAT_SUCCESS, FETCH_MED_STAT_FAILURE
} from './actionTypes'

export const fetchMedecinBegin = () => ({
    type: FETCH_MEDECIN_BEGIN
  });
  
export const fetchMedecinSuccess = medecins => ({
  type: FETCH_MEDECIN_SUCCESS,
  payload: { medecins }
});
  
export const fetchMedecinFailure = error => ({
  type: FETCH_MEDECIN_FAILURE,
  payload: { error }
});
  


export const getMedecinDetailBegin = () => ({
  type: GET_DETAIL_MEDECIN_BEGIN
});

export const getMedecinDetailSuccess = medecin => ({
  type: GET_DETAIL_MEDECIN_SUCCESS,
  payload: { medecin }
});

export const getMedecinDetailFailure = error => ({
  type: GET_DETAIL_MEDECIN_FAILURE,
  payload: { error }
});

export const fetchStatBegin = () => ({
  type: FETCH_MED_STAT_BEGIN
});

export const fetchStatSuccess = res => ({
  type: FETCH_MED_STAT_SUCCESS,
  payload: { res }
});

export const fetchStatFailure = error => ({
  type: FETCH_MED_STAT_FAILURE,
  payload: { error }
})
