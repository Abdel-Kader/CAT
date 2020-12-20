import {
  FETCH_MEDECIN_BEGIN,
  FETCH_MEDECIN_SUCCESS,
  FETCH_MEDECIN_FAILURE,
  GET_DETAIL_MEDECIN_BEGIN,
  GET_DETAIL_MEDECIN_SUCCESS,
  GET_DETAIL_MEDECIN_FAILURE,
  FETCH_MED_STAT_BEGIN,
  FETCH_MED_STAT_SUCCESS, FETCH_MED_STAT_FAILURE
} from '../actions/actionTypes'

const initialState = {
  medecins: [],
  medecin: null,
  loading: false,
  error: null,
  patient: null,
  rdv: null,
  consultations: null,
  nextConsultations: null,
  currentConsultations: null,
};
  
  export default function medecinReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_MEDECIN_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_MEDECIN_SUCCESS:
        return {
          ...state,
          loading: false,
          medecins: action.payload.medecins
        };
  
      case FETCH_MEDECIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          medecins: []
        };
      
      case GET_DETAIL_MEDECIN_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case GET_DETAIL_MEDECIN_SUCCESS:
        return {
          ...state,
          loading: false,
          medecin: action.payload.medecin
        };
      
      case GET_DETAIL_MEDECIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          medecin: null
        };

      case FETCH_MED_STAT_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };

      case FETCH_MED_STAT_SUCCESS:
        return {
          ...state,
          loading: false,
          patient: action.payload.res[0].data.consultation,
          rdv: action.payload.res[1].data,
          consultations: action.payload.res[2].data.consultations,
          currentConsultations: action.payload.res[3].data,
        };

      case FETCH_MED_STAT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          patient: null,
          rdv: null,
          consultations: null,
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
