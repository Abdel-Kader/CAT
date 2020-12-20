import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { detailMedecinStyles } from "./styles/detailMedecin";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { API_URL } from "../../config/config";
import { getToken } from "../../utils/jwtUtil";
import Header from "../common/header";
import MedecinHeader from "../common/header/MedecinHeader";

function DossierPatient(props) {
	const classes = detailMedecinStyles();
	const user = props.location.state.res;
	const type = props.location.state.type;
	const [consultations, setConsultations] = useState(null);

	useEffect(() => {
		axios
			.get(API_URL + "dossier-patient?id=" + user.id, {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				setConsultations(res.data.consultations);
				// console.log(res)
			})
			.catch((err) => {
				setConsultations(null);
			});
	}, []);

	console.log(consultations);
	const ref = React.createRef();

	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});

	return type == "medecin" ? (
		<div id="wrapper">
			<MedecinHeader type="consultation" />
			<div className="main">
				<Grid container className={classes.root} justify="center">
					<Grid item xs={7}>
						<button onClick={handlePrint}>Imprimer</button>
						<Paper className={classes.paper2}>
							<div className={classes.paper} ref={ref}>
								<div style={{ border: "3px solid", padding: 15 }}>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<img
											src="assets/images/logo_fann.png"
											alt="logo fann"
											style={{ width: 70 }}
										/>

										<div style={{ borderTop: "2px solid", marginTop: 5 }}>
											<h3>Centre Hospitalier National de FANN </h3>
										</div>
										<div style={{ borderTop: "2px solid", marginTop: 5 }}>
											<h5>
												Avenue Cheikh Anta Diop Dakar Tel : + (221) 33 869-18-78
											</h5>
										</div>
									</div>
								</div>

								<div style={{ border: "3px solid", padding: 15 }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: 5,
										}}
									>
										<div>
											<h4>Prénom : {user.User.last_name}</h4>
										</div>
										<div>
											<h4>Nom : {user.User.first_name} </h4>
										</div>
									</div>

									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: 5,
										}}
									>
										<div>
											<h4>Adresse : {user.User.address}</h4>
										</div>
										<div>
											<h4>Téléphone : {user.User.phone_number} </h4>
										</div>
									</div>

									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: 5,
										}}
									>
										<div>
											<h4>
												Date de naissance :{" "}
												{new Date(user.date_naissance).toLocaleDateString()}
											</h4>
										</div>
										<div>
											<h4>Sexe : {user.sexe} </h4>
										</div>
									</div>
								</div>
								<br />
								<label>Dossier du patient</label>
								<br />
								<br />
								{consultations != null
									? consultations.map((res, index) => (
											<div key={index}>
												<br />
												<div style={{ border: "2px solid", padding: 15 }}>
													<div>
														<label>Date consultation:</label>{" "}
														{new Date(
															res.date_consultation
														).toLocaleDateString()}{" "}
														<h4>
															Médecin : Dr {res.Medecin.User.first_name}{" "}
															{res.Medecin.User.last_name}
														</h4>
													</div>
													<br />
													<label>Hypothèse :</label>
													<div>
														{res.diagnostic ? (
															<span>{res.diagnostic}</span>
														) : (
															"RAS"
														)}
													</div>
													<br />
													<label>Examens</label>
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
																		<td>{res.resultat}</td>
																	</tr>
																))}
															</tbody>
														</table>
													) : (
														<p>RAS</p>
													)}
													<br />

													<label>Constantes :</label>
													<table className="table table-bordered table-responsive">
														<thead>
															<tr>
																<th>Constante</th>
																<th>Valeur</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>Poids</td>
																<td>{JSON.parse(res.constantes).poids}</td>
															</tr>
															<tr>
																<td>Taille</td>
																<td>{JSON.parse(res.constantes).taille}</td>
															</tr>
															<tr>
																<td>IMC</td>
																<td>{JSON.parse(res.constantes).imc}</td>
															</tr>
															<tr>
																<td>Saturation (SPO2)</td>
																<td>{JSON.parse(res.constantes).saturation}</td>
															</tr>
															<tr>
																<td>Tension (PA/PAD)</td>
																<td>{JSON.parse(res.constantes).pa_pad}</td>
															</tr>
															<tr>
																<td>Température</td>
																<td>
																	{JSON.parse(res.constantes).temperature}
																</td>
															</tr>
															<tr>
																<td>Fréquence cardiaque</td>
																<td>{JSON.parse(res.constantes).frequence}</td>
															</tr>
															<tr>
																<td>Pouls</td>
																<td>{JSON.parse(res.constantes).pouls}</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
									  ))
									: null}
							</div>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	) : type== 'patient' ?(
		<>
			<Header />
			<Grid container className={classes.root} justify="center" style={{marginTop:30}}>
				<Grid item xs={7}>
					<button onClick={handlePrint}>Imprimer</button>
					<Paper className={classes.paper2}>
						<div className={classes.paper} ref={ref}>
							<div style={{ border: "3px solid", padding: 15 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<img
										src="assets/images/logo_fann.png"
										alt="logo fann"
										style={{ width: 70 }}
									/>

									<div style={{ borderTop: "2px solid", marginTop: 5 }}>
										<h3>Centre Hospitalier National de FANN </h3>
									</div>
									<div style={{ borderTop: "2px solid", marginTop: 5 }}>
										<h5>
											Avenue Cheikh Anta Diop Dakar Tel : + (221) 33 869-18-78
										</h5>
									</div>
								</div>
							</div>

							<div style={{ border: "3px solid", padding: 15 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginTop: 5,
									}}
								>
									<div>
										<h4>Prénom : {user.User.last_name}</h4>
									</div>
									<div>
										<h4>Nom : {user.User.first_name} </h4>
									</div>
								</div>

								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginTop: 5,
									}}
								>
									<div>
										<h4>Adresse : {user.User.address}</h4>
									</div>
									<div>
										<h4>Téléphone : {user.User.phone_number} </h4>
									</div>
								</div>

								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginTop: 5,
									}}
								>
									<div>
										<h4>
											Date de naissance :{" "}
											{new Date(user.date_naissance).toLocaleDateString()}
										</h4>
									</div>
									<div>
										<h4>Sexe : {user.sexe} </h4>
									</div>
								</div>
							</div>
							<br />
							<label>Dossier du patient</label>
							<br />
							<br />
							{consultations != null
								? consultations.map((res, index) => (
										<div key={index}>
											<br />
											<div style={{ border: "2px solid", padding: 15 }}>
												<div>
													<label>Date consultation:</label>{" "}
													{new Date(res.date_consultation).toLocaleDateString()}{" "}
													<h4>
														Médecin : Dr {res.Medecin.User.first_name}{" "}
														{res.Medecin.User.last_name}
													</h4>
												</div>
												<br />
												<label>Hypothèse :</label>
												<div>
													{res.diagnostic ? (
														<span>{res.diagnostic}</span>
													) : (
														"RAS"
													)}
												</div>
												<br />
												<label>Examens</label>
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
																	<td>{res.resultat}</td>
																</tr>
															))}
														</tbody>
													</table>
												) : (
													<p>RAS</p>
												)}
												<br />

												<label>Constantes :</label>
												<table className="table table-bordered table-responsive">
													<thead>
														<tr>
															<th>Constante</th>
															<th>Valeur</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Poids</td>
															<td>{JSON.parse(res.constantes).poids}</td>
														</tr>
														<tr>
															<td>Taille</td>
															<td>{JSON.parse(res.constantes).taille}</td>
														</tr>
														<tr>
															<td>IMC</td>
															<td>{JSON.parse(res.constantes).imc}</td>
														</tr>
														<tr>
															<td>Saturation (SPO2)</td>
															<td>{JSON.parse(res.constantes).saturation}</td>
														</tr>
														<tr>
															<td>Tension (PA/PAD)</td>
															<td>{JSON.parse(res.constantes).pa_pad}</td>
														</tr>
														<tr>
															<td>Température</td>
															<td>{JSON.parse(res.constantes).temperature}</td>
														</tr>
														<tr>
															<td>Fréquence cardiaque</td>
															<td>{JSON.parse(res.constantes).frequence}</td>
														</tr>
														<tr>
															<td>Pouls</td>
															<td>{JSON.parse(res.constantes).pouls}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
								  ))
								: null}
						</div>
					</Paper>
				</Grid>
			</Grid>
		</>
	): null
}

export default DossierPatient;
