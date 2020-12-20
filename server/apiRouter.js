//Imports
var express = require("express");
var usersCtrl = require("./routes/usersCtrl");
var specialitesCtrl = require("./routes/specialitesCtrl");
var servicesCtrl = require("./routes/servicesCtrl");
var medecinsCtrl = require("./routes/medecinsCtrl");
var rdvCtrl = require("./routes/rdvCtrl");
var consultationCtrl = require("./routes/consultationCtrl");
var horaireCtrl = require("./routes/horaireCtrl");
var patientCtrl = require("./routes/patientCtrl");
var demandeAvisCtrl = require("./routes/demandeAvisCtrl");
var examCtrl = require("./routes/examCtrl");

//Router
exports.router = (function () {
	var apiRouter = express.Router();

	//Admins managements
	//Users
	apiRouter.route("/users/").get(usersCtrl.getUsers);
	apiRouter.route("/rendez-vous/today").get(rdvCtrl.getTodayConsultations);

	//Rendez-vous
	apiRouter.route("/rendez-vous/").get(rdvCtrl.getAllDemandes);
	apiRouter.route("/rendez-vous/patient").get(rdvCtrl.getPatientDemandes);

	//Users routes
	apiRouter.route("/users/register/").post(usersCtrl.register);
	apiRouter.route("/users/register/patient").post(usersCtrl.registerPatient);
	apiRouter.route("/users/login/").post(usersCtrl.login);
	apiRouter.route("/users/me/").get(usersCtrl.getUserProfile);
	apiRouter.route("/users/me/").put(usersCtrl.updateUserProfile);

	//Specialités routes
	apiRouter.route("/specialite/").post(specialitesCtrl.add);
	apiRouter.route("/specialite/").get(specialitesCtrl.getAll);
	apiRouter.route("/specialites/").get(specialitesCtrl.getSpecialites);

	//Services routes
	apiRouter.route("/service/").post(servicesCtrl.add);
	apiRouter.route("/services/").get(servicesCtrl.getAll);

	//Médecin routes
	apiRouter.route("/medecins/").get(medecinsCtrl.getAll);
	apiRouter
		.route("/medecins/by-specialities")
		.get(medecinsCtrl.getBySpecialite);
	apiRouter.route("/medecin/").get(medecinsCtrl.getById);

	//Patient routes
	apiRouter.route("/patient/").get(patientCtrl.getById);

	//Rdv routes
	apiRouter.route("/rendez-vous/").post(rdvCtrl.add);
	apiRouter.route("/mes-rendez-vous/").get(rdvCtrl.getMyRdv);
	apiRouter.route("/rendez-vous/status/").put(rdvCtrl.updateStatus);
	apiRouter.route("/rendez-vous/update").put(rdvCtrl.updateDemande);
	apiRouter.route("/mes-rendez-vous/history").get(rdvCtrl.getRdvHistory);
	apiRouter.route("/consultation/attente").get(rdvCtrl.getMyConsultation);

	//Consultations routes
	apiRouter.route("/consultation").post(consultationCtrl.new);
	apiRouter.route("/consultation").get(consultationCtrl.getByUser);
	apiRouter.route("/consultation/detail").get(consultationCtrl.detail);
	apiRouter.route("/consultations").get(consultationCtrl.allConsultationsByUser);
	apiRouter.route("/dossier-patient").get(consultationCtrl.consultationsPatient);
	apiRouter.route("/consultations-patient").get(consultationCtrl.consultationsPatientMedecin);
	apiRouter.route("/rdv-patient").get(rdvCtrl.getPatientRdv);

	//Horaire routes
	apiRouter.route("/disponibility/").post(horaireCtrl.add);
	apiRouter.route("/disponibility/").get(horaireCtrl.getByUser);

	//Demande expertise
	apiRouter.route("/demande-avis").post(demandeAvisCtrl.add);
	apiRouter.route("/demande-avis").put(demandeAvisCtrl.sendReponse);
	apiRouter.route("/demande-avis").get(demandeAvisCtrl.getDemandes);
  apiRouter.route("/demande-avis/status").put(demandeAvisCtrl.updateStatut);
  
  //exams
  apiRouter.route("/exams").get(examCtrl.getAll)

	return apiRouter;
})();
