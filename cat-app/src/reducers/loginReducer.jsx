import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/actionTypes'

const initialState = {
    user: null,
    token: null,
    isLogged: false,
    loading: false,
    error: null
};
  

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.userData,
            };
        
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload.error
            };
        
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null
            }
        
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}