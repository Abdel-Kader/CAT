var jwtUtils = require("../utils/jwt.utils");
var models = require("../models");
const { Op } = require("sequelize");

//Routes
module.exports = {
	getMyRdv: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;
		var model = req.query.model;
		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			if (model === "Medecin") {
				models.Rendezvous.findAll({
					include: [
						{
							model: models.Patient,
							attributes: ["id", "date_naissance", "sexe"],
							include: [
								{
									model: models.User,
									attributes: [
										"id",
										"first_name",
										"last_name",
										"phone_number",
										"address",
										"email",
									],
								},
							],
						},
					],
					where: {
						MedecinId: id,
						status: 0,
						start: {
							[Op.gte]: new Date(),
						},
					},
				})
					.then((rdv) => {
						if (rdv) res.status(200).json(rdv);
						else
							res
								.status(404)
								.json({
									error:
										"Vous n'avez aucucne demande de rendez-vous en cours !",
								});
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			} else {
				models.Rendezvous.findAll({
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
										"email",
									],
								},
							],
						},
					],
					where: { PatientId: id },
				})
					.then((rdv) => {
						if (rdv) res.status(200).json(rdv);
						else
							res
								.status(404)
								.json({
									error: "Vous n'avez fait aucune demande de rendez-vous !",
								});
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			}
		}
	},

	getMyConsultation: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;
		var model = req.query.model;
		var date = req.query.date;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			if (model === "Medecin") {
				if (date == "now") {
					models.Rendezvous.findAll({
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
											"email",
										],
									},
								],
							},
						],
						where: {
							MedecinId: id,
							status: 1,
							date: {
								[Op.eq]: new Date().toLocaleDateString(),
							},
						},
						//, date_rdv: moment().format("YYYY-MM-DD")
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error:
											"Vous n'avez aucucne demande de rendez-vous en cours !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				} else {
					models.Rendezvous.findAll({
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
											"email",
										],
									},
								],
							},
						],
						where: { MedecinId: id, status: 1 },
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error:
											"Vous n'avez aucucne demande de rendez-vous en cours !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				}
			} else {
				if (date == "now") {
					models.Rendezvous.findAll({
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
											"email",
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
						],
						where: {
							PatientId: id,
							status: 1,
							date: {
								[Op.eq]: new Date().toLocaleDateString(),
							},
						},
						// where: { PatientId: id, status: 2, date_rdv: moment().format("YYYY-MM-DD") }
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error: "Vous n'avez fait aucune demande de rendez-vous !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				} else {
					models.Rendezvous.findAll({
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
											"email",
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
						],
						where: {
							PatientId: id,
							status: 1,
							date: {
								[Op.gt]: new Date().toLocaleDateString(),
							},
						},
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error: "Vous n'avez fait aucune demande de rendez-vous !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				}
			}
		}
	},

	add: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var MedecinId = req.body.medecinId;
		var PatientId = req.body.patientId;
		var motif = req.body.motif;
		var start = req.body.start;
		// var    = req.body.heureRdv;
		console.log(start);

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.create({
				MedecinId,
				PatientId,
				motif,
				start,
				date: new Date(start).toLocaleDateString(),
				status: 0,
			})
				.then((newRdv) => {
					res.status(201).json({ rdvId: newRdv.id });
				})
				.catch((err) => {
					res.status(500).json({ error: "Erreur survenue", err });
				});
		}
	},

	updateStatus: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.body.id;
		var status = req.body.status;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findOne({
				attributes: ["id", "status"],
				where: { id: id },
			})
				.then(function (rdvFound) {
					if (rdvFound) {
						rdvFound
							.update({
								status,
							})
							.then(res.status(201).json(rdvFound))
							.catch((err) => {
								res
									.status(500)
									.json({
										error: "Erreur lors de la modification du profil",
										err,
									});
							});
					}
				})
				.catch(function (err) {
					res.status(404).json({ error: "Rendez-vous non trouvé ", err });
				});
		}
	},

	getRdvHistory: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;
		var model = req.query.model;
		var type = req.query.type;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			if (model === "Medecin") {
				models.Rendezvous.findAll({
					include: [
						{
							model: models.Patient,
							attributes: ["id", "date_naissance", "sexe"],
							include: [
								{
									model: models.User,
									attributes: [
										"id",
										"first_name",
										"last_name",
										"phone_number",
										"address",
										"email",
									],
								},
							],
						},
					],
					where: {
						MedecinId: id,
					},
				})
					.then((rdv) => {
						if (rdv) res.status(200).json(rdv);
						else
							res
								.status(404)
								.json({
									error:
										"Vous n'avez aucucne demande de rendez-vous en cours !",
								});
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			} else {
				if (type == "attente") {
					models.Rendezvous.findAll({
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
											"email",
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
						],
						where: {
							PatientId: id,
							status: [0, 1, 2],
							date: {
								[Op.gte]: new Date().toLocaleDateString(),
							},
						},
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error: "Vous n'avez fait aucune demande de rendez-vous !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				} else {
					models.Rendezvous.findAll({
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
											"email",
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
						],
						where: { PatientId: id, status: 4 },
					})
						.then((rdv) => {
							if (rdv) res.status(200).json(rdv);
							else
								res
									.status(404)
									.json({
										error: "Vous n'avez fait aucune demande de rendez-vous !",
									});
						})
						.catch((err) => {
							res.status(500).json({ error: err });
						});
				}
			}
		}
	},

	updateDemande: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.body.id;
		var motif = req.body.motif;
		var start = req.body.start;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findOne({
				attributes: ["id", "motif", "start"],
				where: { id },
			})
				.then(function (rdvFound) {
					if (rdvFound) {
						rdvFound
							.update({
								motif,
								start,
							})
							.then(res.status(201).json(rdvFound))
							.catch((err) => {
								res
									.status(500)
									.json({
										error: "Erreur lors de la modification du profil",
										err,
									});
							});
					}
				})
				.catch(function (err) {
					res.status(404).json({ error: "Rendez-vous non trouvé ", err });
				});
		}
	},

	//.................................................Medecin............................................//

	//.................................................Admin............................................//
	getAllDemandes: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findAll({
				include: [
					{
						model: models.Patient,
						attributes: ["id", "date_naissance", "sexe"],
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
									"email",
								],
							},
						],
					},
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
									"email",
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
				],
			})
				.then((rdv) => {
					if (rdv) res.status(200).json({ rdv });
					else res.status(200).json({ rdv: null });
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	},
	getPatientDemandes: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id = req.query.id;
		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findAll({
				where: { PatientId: id },
				order: [["date", "DESC"]],
				include: [
					{
						model: models.Patient,
						attributes: ["id", "date_naissance", "sexe"],
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
									"email",
								],
							},
						],
					},
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
									"email",
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
				],
			})
				.then((rdv) => {
					if (rdv) res.status(200).json({ rdv });
					else res.status(200).json({ rdv: null });
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	},
	getTodayConsultations: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findAll({
				where: {
					status: 1,
					date: {
						[Op.eq]: new Date().toLocaleDateString(),
					},
				},
				include: [
					{
						model: models.Patient,
						attributes: ["id", "date_naissance", "sexe"],
						include: [
							{
								model: models.User,
								attributes: [
									"id",
									"first_name",
									"last_name",
									"phone_number",
									"address",
									"email",
								],
							},
						],
					},
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
									"email",
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
				],
			})
				.then((rdv) => {
					if (rdv) res.status(200).json({ rdv });
					else res.status(200).json({ rdv: null });
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	},

	getPatientRdv: function (req, res) {
		var headerAuth = req.headers["authorization"];
		var userId = jwtUtils.getUserId(headerAuth);
		var id_patient = req.query.id_patient;
		var id_medecin = req.query.id_medecin;

		if (userId < 0) return res.status(400).json({ error: "Token invalide !" });
		else {
			models.Rendezvous.findAll({
				where: {
					PatientId: id_patient,
					MedecinId: id_medecin,
					status: 1,
					date: {
						[Op.gte]: new Date().toLocaleDateString(),
					},
				},
				order: [["start", "DESC"]],
			})
				.then((rdv) => {
					if (rdv) res.status(200).json({ rdv });
					else res.status(200).json({ rdv: null });
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	},
};
