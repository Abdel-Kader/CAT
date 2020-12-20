import { DEMANDE_AVIS_BEGIN, DEMANDE_AVIS_SUCCESS, DEMANDE_AVIS_FAILURE,
    FETCH_AVIS_SUCCESS, FETCH_AVIS_FAILURE, UPDATE_AVIS_FAILURE,UPDATE_AVIS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    avisAdded: false,
    avis: null,
    loading: false,
    error: null
}

export default function demandeAvisReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case DEMANDE_AVIS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case DEMANDE_AVIS_SUCCESS:
            return {
                ...state,
                loading: false,
                avisAdded: true,
                avis: action.payload.avis
            };

        case DEMANDE_AVIS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                avis: null,
                avisAdded: false
            };

        case FETCH_AVIS_SUCCESS:
            return {
                ...state,
                loading: false,
                avis: action.payload.avis
            };

        case FETCH_AVIS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                avis: null
            };


        
        default:
            // ALWAYS have a default case in a reducer
            return state;

    }
}
