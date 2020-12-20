import { DEMANDE_AVIS_BEGIN, DEMANDE_AVIS_SUCCESS, DEMANDE_AVIS_FAILURE,
    FETCH_AVIS_SUCCESS, FETCH_AVIS_FAILURE, UPDATE_AVIS_BEGIN, UPDATE_AVIS_SUCCESS, UPDATE_AVIS_FAILURE} from "./actionTypes";

export const demandeAvisBegin = () => ({
    type: DEMANDE_AVIS_BEGIN
});

export const demandeAvisSuccess = avis => ({
    type: DEMANDE_AVIS_SUCCESS,
    payload: { avis }
});

export const demandeAvisFailure = error => ({
    type: DEMANDE_AVIS_FAILURE,
    payload: { error }
});

export const fetchAvisSuccess = avis => ({
    type: FETCH_AVIS_SUCCESS,
    payload: { avis }
});

export const fetchAvisFailure = error => ({
    type: FETCH_AVIS_FAILURE,
    payload: { error }
});

export const updateAvisBegin = () => ({
    type: UPDATE_AVIS_BEGIN
});

export const updateAvisSuccess = avis => ({
    type: UPDATE_AVIS_SUCCESS,
    payload: { avis }
});

export const updateAvisFailure = error => ({
    type: UPDATE_AVIS_FAILURE,
    payload: { error }
});
