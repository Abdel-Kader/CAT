import {
    FETCH_SPECIALITE_BEGIN,
    FETCH_SPECIALITE_SUCCESS,
    FETCH_SPECIALITE_FAILURE,
    FETCH_SPECIALITE_SERVICE_SUCCESS
} from './actionTypes'


export const fetchSpecialiteBegin = () => ({
    type: FETCH_SPECIALITE_BEGIN
});

export const fetchSpecialiteSuccess = specialites => ({
    type: FETCH_SPECIALITE_SUCCESS,
    payload: { specialites }
});

export const fetchSpecialiteServiceSuccess = res => ({
    type: FETCH_SPECIALITE_SERVICE_SUCCESS,
    payload: { res }
});

export const fetchSpecialiteFailure = error => ({
    type: FETCH_SPECIALITE_FAILURE,
    payload: { error }
})