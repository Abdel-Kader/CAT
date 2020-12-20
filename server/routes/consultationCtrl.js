var models = require("../models");
var jwtUtils = require("../utils/jwt.utils");
async function addExam(ConsultationId, nom) {
	await models.Examen.create({
		ConsultationId,
		nom,
	});
}
//Routes
module.exports = {
	new: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);

		//Params
		var MedecinId = req.body.medecinId;
		var PatientId = req.body.patientId;
		var cout = req.body.cout;
		var date_consultation = req.body.date_consultation;
		var heure_debut = req.body.heure_debut;
		var heure_fin = req.body.heure_fin;
		var constantes = req.body.constantes;
		var diagnostic = req.body.diagnostic;
		var exams = req.body.exams;

		// console.log(exams);
		// console.log(constantes);

		// var obj = JSON.parse(constantes)
		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Consultation.create({
				MedecinId,
				PatientId,
				cout,
				constantes: JSON.stringify(constantes),
				date_consultation,
				heure_debut,
				heure_fin,
			})
				.then((consultation) => {
					exams.forEach((exam) => {
						addExam(consultation.id, exam);
					});
					if (diagnostic != null) {
						models.Diagnostic.create({
							ConsultationId: consultation.id,
							libelle: diagnostic,
						})
							.then((diagnostic) => {
								// console.log(diagnostic)
							})
							.catch((err) => {
								// console.log(err)
							});
					}
					return res.status(201).json({ consultationId: consultation.id });
				})
				.catch((err) => {
					return res.status(500).json({ error: err });
				});
		}
	},

	getByUser: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;
		var profile = req.query.profile;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			if (profile == 1) {
				models.Consultation.findAll({
					where: { MedecinId: id },
					order: [["date_consultation", "DESC"]],
					group: "PatientId",
					include: [
						{
							model: models.Patient,
							include: [
								{
									model: models.User,
									attributes: [
										"id",
										"first_name",
										"last_name",
										"phone_number",
										"address",
									],
								},
							],
						},
						{
							model: models.Examen,
							as: "examens",
						},
					],
				})
					.then((consultation) => {
						res.status(201).json({ consultation });
					})
					.catch((err) => {
						res
							.status(500)
							.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
					});
			} else if (profile == 2) {
				models.Consultation.findAll({
					where: { PatientId: id },
					order: [["date_consultation", "DESC"]],
					include: [
						{
							model: models.Medecin,
							include: [
								{
									model: models.User,
									attributes: [
										"id",
										"first_name",
										"last_name",
										"phone_number",
										"address",
									],
								},
								{
									model: models.Specialite,
									as: "specialite",
									attributes: ["libelle"],
								},
								{
									model: models.Service,
									as: "service",
									attributes: ["libelle"],
								},
							],
						},
						{
							model: models.Examen,
							as: "examens",
						},
					],
				})
					.then((consultation) => {
						res.status(201).json({ consultation });
					})
					.catch((err) => {
						res
							.status(500)
							.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
					});
			} else res.status(404).json({ error: "Page introuvable " });
		}
	},

	detail: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);

		var id = req.query.id;
		var idUser = req.query.iduser;
		var profile = req.query.profile;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });

		if (profile == 1) {
			models.Consultation.findAll({
				where: { MedecinId: id, PatientId: idUser },
				order: [["date_consultation", "DESC"]],
				include: [
					{
						model: models.Patient,
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
								],
							},
						],
					},
				],
			})
				.then((consultation) => {
					res.status(201).json({ consultation });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
				});
		} else if (profile == 2) {
			models.Consultation.findAll({
				where: { PatientId: id, MedecinId: idUser },
				order: [["date_consultation", "DESC"]],
				include: [
					{
						model: models.Medecin,
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
								],
							},
						],
					},
				],
			})
				.then((consultation) => {
					res.status(201).json({ consultation });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
				});
		} else {
			res.status(404).json({ error: "Page introuvable" });
		}
	},

	allConsultationsByUser: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Consultation.findAll({
				where: { MedecinId: id },
				order: [["date_consultation", "DESC"]],
			})
				.then((consultations) => {
					res.status(201).json({ consultations });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
				});
		}
	},

	consultationsPatient: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Consultation.findAll({
				where: { PatientId: id },
				order: [["date_consultation", "DESC"]],
				include: [
					{
						model: models.Medecin,
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
								],
							},
							
						],
					},
					{
						model: models.Examen,
						as: "examens"
					}
				],
			})
				.then((consultations) => {
					res.status(201).json({ consultations });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
				});
		}
	},

	consultationsPatientMedecin: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id_patient = req.query.id_patient;
		var id_medecin = req.query.id_medecin;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Consultation.findAll({
				where: { PatientId: id_patient, MedecinId: id_medecin },
				order: [["date_consultation", "DESC"]],
				include: [
					{
						model: models.Examen,
						as: "examens"
					},
				]
			})
				.then((consultations) => {
					res.status(201).json({ consultations });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ error: "Une erreur est survenue ! Veuillez reessayer " });
				});
		}
	},
};
