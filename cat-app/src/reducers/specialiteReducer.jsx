import {
    FETCH_SPECIALITE_BEGIN,
    FETCH_SPECIALITE_SUCCESS,
    FETCH_SPECIALITE_FAILURE,
    FETCH_SPECIALITE_SERVICE_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    specialites: [],
    services: [],
    loading: false,
    error: null
}

export default function specialiteReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SPECIALITE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_SPECIALITE_SUCCESS:
            return {
                ...state,
                loading: false,
                specialites: action.payload.specialites
            };
        
        case FETCH_SPECIALITE_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                specialites: action.payload.res[0].data.specialites,
                services: action.payload.res[1].data,
            };
        
        case FETCH_SPECIALITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                specialites: null
            };
        
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}