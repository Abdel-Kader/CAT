import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import Index from '../components';
import { PrivateRoute } from "./privateRoute";
import { RestrictRoute } from "./restrictRoute";
import LoginForm from '../components/auth/LoginForm'
import PatientHome from '../components/dashboard/patient'
import MedecinDashboard from '../components/dashboard/doctor'
import ListRdv from '../components/rendez-vous/listRendez-vous'
import DetailMedecin from '../components/rendez-vous/detailMedecin'
import UpdateRdv from '../components/rendez-vous/updateRendez-vous'
import DetailDemande from '../components/rendez-vous/detailDemande'
import DemandeAvis from '../components/tele-expertise/demandeAvis'
import DemandesRecues from '../components/tele-expertise/demandesRecues'
import DemandesEnvoye from '../components/tele-expertise/demandesEnvoye'
import DetailExpertise from "../components/tele-expertise/detailExpertise";
import DetailDemandeAvis from '../components/tele-expertise/detailDemande'
import MesConsultations from '../components/consultation/mesConsultation'   
import DemandesMedecins from '../components/consultation/demandesMedecin'   
import ConsultationRoom from '../components/consultation/consultationRoom'   
import ListConsultations from '../components/consultation/listConsultation'   
import TeleConsultation from '../components/dashboard/doctor/tele-consultation'
import TeleExpertise from '../components/dashboard/doctor/tele-expertise'
import DetailConsultation from '../components/consultation/detailConsultation'   
import HistoriqueMedecin from '../components/consultation/historiqueMedecin'   
// import DossierPatient from '../components/dashboard/patient/dossierPatient'
import HistoriqueConsultations from '../components/consultation/historiqueConsultation'
import FicheConsultation from '../components/consultation/fiche'
import PatientRoom from '../components/consultation/patientRoom'
import ListPatient from "../components/dashboard/doctor/patients/listPatient";
import DetailPatient from "../components/dashboard/doctor/patients/detail";

import AdminDashboard from "../components/dashboard/admin";
import ListUser from "../components/dashboard/admin/users/listUsers";
import ListRdvs from "../components/dashboard/admin/rdv/listRdv";
import DetailUser from "../components/dashboard/admin/users/detail";
import AjoutUser from "../components/dashboard/admin/users/ajoutUser";
import DossierPatient from '../components/common/dossierPatient';
import ProfilePatient from '../components/auth/profile';
import ProfileMedecin from '../components/auth/profileMedecin';


export default function MainRoute() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Index}/>
                <RestrictRoute exact path="/login" component={LoginForm}/>
                <PrivateRoute exact path="/profile-patient" component={ProfilePatient} />
                <PrivateRoute exact path="/profile-medecin" component={ProfileMedecin} />
                

                <PrivateRoute exact path="/home" component={PatientHome}/>
                <PrivateRoute exact path="/dashboard" component={MedecinDashboard}/>
                <PrivateRoute exact path="/tele-consultation" component={TeleConsultation}/>
                <PrivateRoute exact path="/tele-expertise" component={TeleExpertise}/>
                <PrivateRoute exact path="/detail-demande" component={DetailDemande}/>
                <PrivateRoute exact path="/detail-medecin" component={DetailMedecin}/>
                <PrivateRoute exact path="/mes-consultations" component={MesConsultations}/>
                <PrivateRoute exact path="/list-consultations" component={ListConsultations}/>
                <PrivateRoute exact path="/historique-consultations" component={HistoriqueConsultations}/>
                <PrivateRoute exact path="/detail-consultation" component={DetailConsultation}/>
                <PrivateRoute exact path="/visio-consultation" component={ConsultationRoom}/>
                <PrivateRoute exact path="/teleconsultation" component={PatientRoom}/>
                <PrivateRoute exact path="/mes-rendez-vous" component={ListRdv}/>
                <PrivateRoute exact path="/update-demande" component={UpdateRdv}/>
                <PrivateRoute exact path="/consutation-historique" component={HistoriqueMedecin}/>
                <PrivateRoute exact path="/demande-expertise" component={DemandeAvis}/>
                <PrivateRoute exact path="/detail-expertise" component={DetailExpertise}/>
                <PrivateRoute exact path="/expertise-received" component={DemandesRecues}/>
                <PrivateRoute exact path="/expertise-send" component={DemandesEnvoye}/>
                <PrivateRoute exact path="/detail-demande-expertise" component={DetailDemandeAvis}/>
                <PrivateRoute exact path="/dossier-patient" component={DossierPatient}/>
                <PrivateRoute exact path="/fiche-consultation" component={FicheConsultation}/>
                <PrivateRoute exact path="/patients" component={ListPatient}/>
                <PrivateRoute exact path="/detail-patient" component={DetailPatient}/>
                <PrivateRoute exact path="/mes-demandes" component={DemandesMedecins} />
                {/* <PrivateRoute exact path="/dossier-patient" component={DossierPatient} /> */}
                

                <PrivateRoute exact path="/admin" component={AdminDashboard}/>
                <PrivateRoute exact path="/users" component={ListUser}/>
                <PrivateRoute exact path="/rendez-vous" component={ListRdvs}/>
                <PrivateRoute exact path="/detail-user" component={DetailUser}/>
                <PrivateRoute exact path="/add-user" component={AjoutUser}/>



            </Switch>
        </Router>
    )
}
