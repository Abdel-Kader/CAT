import {ADD_CONSULTATION_BEGIN, ADD_CONSULTATION_FAILURE, ADD_CONSULTATION_SUCCESS, FETCH_CONSULTATION_BEGIN, FETCH_CONSULTATION_FAILURE, FETCH_CONSULTATION_SUCCESS} from  '../actions/actionTypes'

const initialState = {
    consultation: null,
    consultationAdded: false,
    loading: false,
    error: null
};
  

export default function consultationReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case ADD_CONSULTATION_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
      
        case ADD_CONSULTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                consultationAdded: true,
                consultation: action.payload.consultation
            };
      
        case ADD_CONSULTATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                consultationAdded: false,
                consultation: null
            };
        
        case FETCH_CONSULTATION_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_CONSULTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                consultation: action.payload.consultations
            };
        
        case FETCH_CONSULTATION_FAILURE:
            return {
                ...state,
                loading: false,
                consultation: null,
                error: action.payload.error
            };
        
        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}