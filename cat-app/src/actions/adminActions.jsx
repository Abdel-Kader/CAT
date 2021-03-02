import {
    FETCH_ALL_BEGIN,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,
    FETCH_RDV_SUCCESS,
    FETCH_USERS_SUCCESS
} from './actionTypes'


export const fetchBegin = () => ({
    type: FETCH_ALL_BEGIN
});

export const fetchSuccess = res => ({
    type: FETCH_ALL_SUCCESS,
    payload: { res }
});

export const fetchFailure = error => ({
    type: FETCH_ALL_FAILURE,
    payload: { error }
});

export const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users }
})

export const fetchRdvsSuccess = rdvs => ({
    type: FETCH_RDV_SUCCESS,
    payload: { rdvs }
})
