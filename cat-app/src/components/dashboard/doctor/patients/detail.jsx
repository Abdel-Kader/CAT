import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { API_URL } from "../../../../config/config";
import { getToken } from "../../../../utils/jwtUtil";
import MedecinHeader from "../../../common/header/MedecinHeader";
import { getLocalStorage } from "../../../../utils/localStorageUtil";
function DetailPatient(props) {
	const user = props.location.state.res;
	const [consultations, setConsultations] = useState(null);
	const [rdv, setRdv] = useState(null);
	useEffect(() => {
		axios
			.get(
				API_URL +
					"consultations-patient?id_patient=" +
					user.Patient.id +
					"&id_medecin=" +
					getLocalStorage("user").id,
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			.then((res) => {
				setConsultations(res.data.consultations);
				// console.log(res)
			})
			.catch((err) => {
				setConsultations(null);
			});

		axios
			.get(
				API_URL +
					"rdv-patient?id_patient=" +
					user.Patient.id +
					"&id_medecin=" +
					getLocalStorage("user").id,
				{ headers: { Authorization: `Bearer ${getToken()}` } }
			)
			.then((res) => {
				setRdv(res.data.rdv);
				console.log(res.data.rdv);
			})
			.catch((err) => {
				setRdv(null);
			});
	}, []);
	console.log(rdv);
	return (
		<div id={"wrapper"}>
			<MedecinHeader type="consultation" />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Détail du patient</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-6">
								<div className="box">
									<div
										className="box-head"
										style={{
											backgroundColor: "cadetblue",
											height: 45,
											borderTopRightRadius: 10,
										}}
									>
										<span id="box-header">Informations personnelles</span>
									</div>
									<div className="item">
										<div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Nom et prénom :
											<strong>
												{user.Patient.User.first_name}{" "}
												{user.Patient.User.last_name}
											</strong>
										</div>
										<div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Téléphone :
											<strong>{user.Patient.User.phone_number}</strong>
										</div>
										<div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Adresse :<strong>{user.Patient.User.address}</strong>
										</div>
										<div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Sexe :<strong>{user.Patient.sexe}</strong>
										</div>
										<div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Date et lieu de naissance :
											<strong>
												Le{" "}
												{new Date(
													user.Patient.date_naissance
												).toLocaleDateString()}{" "}
												à {user.Patient.lieu_naissance}
											</strong>
										</div>
										{/* <div
											style={{
												display: "flex",
												width: "100%",
												marginTop: 10,
												justifyContent: "space-between",
											}}
										>
											Profession :
											<strong>{user.Patient.profession}</strong>
										</div> */}
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="box">
									<div
										className="box-head"
										style={{
											backgroundColor: "cadetblue",
											height: 45,
											borderTopRightRadius: 10,
										}}
									>
										<span id="box-header">
											Prochains rendez-vous avec le patient
										</span>
									</div>
									<div
										className="item"
										style={{ paddingLeft: 0, paddingRight: 0 }}
									>
										{rdv != null ? (
											<table
												className="table table-bordered"
												style={{ width: "100%" }}
											>
												<thead>
													<tr>
														<th>Date du rendez-vous</th>
														<th>Motif</th>
													</tr>
												</thead>
												<tbody>
													{rdv.map((res, index) => (
														<tr key={index}>
															<td>
																{new Date(res.start).toLocaleDateString()} à{" "}
																{new Date(res.start).toLocaleTimeString()}
															</td>
															<td>{res.motif}</td>
														</tr>
													))}
												</tbody>
											</table>
										) : (
											<div style={{textAlign: "center"}}>
												<br />
												<strong style={{ color: "green" }}>
													Aucun rendez-vous prévu !
												</strong>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className={"row"}>
							<div className="col-md-12">
								<div className="box">
									<div
										className="box-head"
										style={{
											backgroundColor: "cadetblue",
											height: 45,
											borderTopRightRadius: 10,
										}}
									>
										<span id="box-header">Consultations effectuées</span>
									</div>
									<div
										className="item"
										style={{ paddingLeft: 0, paddingRight: 0 }}
									>
										<table
											className="table table-bordered"
											style={{ width: "100%" }}
										>
											<thead>
												<tr>
													<th>Date</th>
													<th>Heure</th>
													<th>Constantes</th>
													<th>Diagnostic</th>
													<th>Examens prescrits</th>
												</tr>
											</thead>
											<tbody>
												{consultations != null
													? consultations.map((res, index) => (
															<tr key={index}>
																<td>{res.date_consultation}</td>
																<td>{res.heure_debut}</td>
																<td>
																	<table className="table table-bordered">
																		<thead>
																			<tr>
																				<th>Constante</th>
																				<th>Valeur</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>Poids</td>
																				<td>
																					{JSON.parse(res.constantes).poids}
																				</td>
																			</tr>
																			<tr>
																				<td>Taille</td>
																				<td>
																					{JSON.parse(res.constantes).taille}
																				</td>
																			</tr>
																			<tr>
																				<td>IMC</td>
																				<td>
																					{JSON.parse(res.constantes).imc}
																				</td>
																			</tr>
																			<tr>
																				<td>Saturation (SPO2)</td>
																				<td>
																					{
																						JSON.parse(res.constantes)
																							.saturation
																					}
																				</td>
																			</tr>
																			<tr>
																				<td>Tension (PA/PAD)</td>
																				<td>
																					{JSON.parse(res.constantes).pa_pad}
																				</td>
																			</tr>
																			<tr>
																				<td>Température</td>
																				<td>
																					{
																						JSON.parse(res.constantes)
																							.temperature
																					}
																				</td>
																			</tr>
																			<tr>
																				<td>Fréquence cardiaque</td>
																				<td>
																					{JSON.parse(res.constantes).frequence}
																				</td>
																			</tr>
																			<tr>
																				<td>Pouls</td>
																				<td>
																					{JSON.parse(res.constantes).pouls}
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td>{res.diagnostic}</td>
																<td>
																	{res.examens.length > 0 ? (
																		<table className="table table-bordered">
																			<thead>
																				<tr>
																					<th>Examen</th>
																					<th>Résultat</th>
																				</tr>
																			</thead>
																			<tbody>
																				{res.examens.map((res, index) => (
																					<tr key={index}>
																						<td>{res.nom}</td>
																						<td>
																							{res.resultat ? (
																								<span>{res.resultat}</span>
																							) : (
																								<input
																									type="text"
																									className="form-control"
																									name={""}
																									placeholder="saisir le résutlat"
																								/>
																							)}
																						</td>
																					</tr>
																				))}
																			</tbody>
																			<br />
																			<div style={{ width: "100%" }}>
																				<Button
																					variant={"contained"}
																					color={"primary"}
																					style={{
																						float: "right",
																						textTransform: "none",
																						width: "100%",
																					}}
																					onClick={() => {
																						props.history.push("add-user");
																					}}
																				>
																					Enregistrer
																				</Button>
																			</div>
																		</table>
																	) : (
																		<strong style={{ color: "green" }}>
																			Aucun examen prescrit !
																		</strong>
																	)}
																</td>
															</tr>
													  ))
													: null}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailPatient;
