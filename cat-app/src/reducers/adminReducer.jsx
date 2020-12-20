import {FETCH_ALL_SUCCESS, FETCH_ALL_BEGIN, FETCH_ALL_FAILURE} from  '../actions/actionTypes'

const initialState = {
    consultation: null,
    users: null,
    rdv: null,
    rdvT: null,
    expertises: null,
    loading: false,
    error: null
};


export default function adminReducer(
    state = initialState,
    action
) {
    switch (action.type) {

        case FETCH_ALL_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_ALL_SUCCESS:
            return { 
                ...state,
                loading: false,
                users: action.payload.res[0].data.users,
                rdv: action.payload.res[1].data.rdv,
                rdvT: action.payload.res[2].data.rdv,
            };

        case FETCH_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                users: null,
                rdv: null,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}
