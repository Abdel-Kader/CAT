import {
  FETCH_RDV_BEGIN, FETCH_RDV_SUCCESS, FETCH_RDV_FAILURE,
  ADD_RDV_BEGIN, ADD_RDV_SUCCESS, ADD_RDV_FAILURE,
  UPDATE_RDV_SUCCESS, UPDATE_RDV_FAILURE, FETCH_CONSULTATION_SUCCESS, FETCH_CONSULTATION_FAILURE, FETCH_NEXT_CONSULTATION_SUCCESS} from '../actions/actionTypes'

const initialState = {
  demandes: [],
  consultations: [],
  nextConsultations: [],
  rdv: null,
  rdvAdded: false,
  rdvUpdated: false,
  newRdv: null,
  loading: false,
  loader: false,
  error: null
};
  
  export default function rdvReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case FETCH_RDV_BEGIN:
       return {
          ...state,
          loading: true,
          loader: true,
          error: null
        };
  
      case FETCH_RDV_SUCCESS:
        return {
          ...state,
          loading: false,
          demandes: action.payload.demandes
        };
  
      case FETCH_RDV_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          demandes: []
        };
      
      case ADD_RDV_BEGIN:
        return {
          ...state,
          loader: true,
          error: null
        };
      
      case ADD_RDV_SUCCESS:
        return {
          ...state,
          loader: false,
          rdvAdded: true,
          newRdv: action.payload.newRdv
        };
      
      case ADD_RDV_FAILURE:
        return {
          ...state,
          loader: false,
          error: action.payload.error,
          rdvAdded: false,
          newRdv: null
        };
      
      case UPDATE_RDV_SUCCESS:
        return {
          ...state,
          loader: false,
          rdv: action.payload.rdv,
          rdvUpdated: true
        };
      
      case UPDATE_RDV_FAILURE:
        return {
          ...state,
          loader: false,
          error: action.payload.error,
          rdv: null,
          rdvUpdated: false
        };
  
      case FETCH_CONSULTATION_SUCCESS:
        return {
          ...state,
          loader: false,
          consultations: action.payload.consultations
        };
      
      case FETCH_NEXT_CONSULTATION_SUCCESS:
        return {
          ...state,
          loader: false,
          nextConsultations: action.payload.nextConsultations
        };
      
      case FETCH_CONSULTATION_FAILURE:
        return {
          ...state,
          loader: false,
          error: action.payload.error,
          consultations: null
      };
      
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
