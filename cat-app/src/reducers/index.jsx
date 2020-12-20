import { combineReducers } from 'redux'
import login from './loginReducer'
import rdv from './rdvReducer'
import medecin from './medecinReducer'
import consultation from './consultationReducer'
import specialite from './specialiteReducer'
import avis from './demandeAvisReducer'
import admin from "./adminReducer";
import user from './userReducer'
import exam from './examReducer'

export default combineReducers({
    login,
    rdv,
    medecin,
    consultation,
    specialite,
    avis,
    admin,
    user,
    exam
})
