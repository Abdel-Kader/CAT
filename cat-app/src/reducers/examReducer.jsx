import {
    FETCH_EXAMS_BEGIN, FETCH_EXAMS_FAILURE, FETCH_EXAMS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    exams: [],
    loading: false,
    error: null
}

export default function examReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_EXAMS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_EXAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                exams: action.payload.exams
            };
        
        case FETCH_EXAMS_FAILURE:
            return {
                ...state,
                loading: false,
                exams: null,
                error: action.payload.error
            };
    
        default:
            return state;
    }
}
