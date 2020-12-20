import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { detailMedecinStyles } from "../common/styles/detailMedecin";
import AdminHeader from "../common/header/MedecinHeader";
import { useReactToPrint } from "react-to-print";

function FicheConsultation(props) {
	const classes = detailMedecinStyles();
	const patient = props.location.state.patient;
	const medecin = props.location.state.medecin;
	const date_consultation = props.location.state.date_consultation;
	const exams = props.location.state.exams;
	const diagnostic = props.location.state.diagnostic;
	const constantes = props.location.state.constantes;
	const ref = React.createRef();

	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});

	return (
		<div id="wrapper">
			<AdminHeader type="consultation" />

			<div className="main">
				<div className="main-content">
					<Grid container className={classes.root} justify="center">
						<Grid item xs={7}>
							{/* <Pdf targetRef={ref} filename="code-example.pdf">
							{({ toPdf }) => <button onClick={toPdf} options={options}>Generate Pdf</button>}
						</Pdf> */}
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
													Avenue Cheikh Anta Diop Dakar Tel : + (221) 33
													869-18-78
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
												<h4>Prénom : {patient.User.last_name}</h4>
											</div>
											<div>
												<h4>Nom : {patient.User.first_name} </h4>
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
												<h4>Adresse : {patient.User.address}</h4>
											</div>
											<div>
												<h4>Téléphone : {patient.User.phone_number} </h4>
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
													{new Date(
														patient.date_naissance
													).toLocaleDateString()}
												</h4>
											</div>
											<div>
												<h4>Sexe : {patient.sexe} </h4>
											</div>
										</div>
									</div>
									<br />
									<div style={{ border: "2px solid", padding: 15 }}>
										<div>
											<h4>
												Médecin : Dr {medecin.first_name} {medecin.last_name}
											</h4>
										</div>
									</div>
									<br />
									<label>Résumé de la consultation</label>
									<br />
									<br />
									<div style={{ border: "2px solid", padding: 15 }}>
										<div>
											Date : {new Date(date_consultation).toLocaleDateString()}{" "}
											Médecin : Dr {medecin.first_name}
										</div>
										<br />
										<label>Anamnèse :</label>
										<div>{diagnostic}</div>
										<br />
										{exams ? (
											<>
												<label>Examens cliniques</label>
												<div>
													{exams.map((exam) => (
														<p>{exam}</p>
													))}
												</div>
											</>
										) : null}
										<br />
										<label>Hypothèse & Diagnostic :</label>
										<div>{diagnostic}</div>
										<br />
										<label>Constantes :</label>
										<div>
											<p>Poids : {constantes.poids}</p>
											<p>Taille : {constantes.taille}</p>
											<p>IMC : {constantes.imc}</p>
											<p>Tension : {constantes.tension}</p>
											<p>Pression : {constantes.pression}</p>
											<p>Température : {constantes.temperature}</p>
										</div>
									</div>
								</div>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default FicheConsultation;
