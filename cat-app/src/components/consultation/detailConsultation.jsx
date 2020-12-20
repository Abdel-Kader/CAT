import React from "react";

import Header from "../common/header";
import { detailMedecinStyles } from "../common/styles/detailMedecin";
import { Grid, Paper, Breadcrumbs, Typography, Link } from "@material-ui/core";
import { getLocalStorage } from "../../utils/localStorageUtil";
import { useReactToPrint } from "react-to-print";


function DetailConsultation(props) {
	const classes = detailMedecinStyles();
	const consultation = props.location.state;
	const constantes = JSON.parse(consultation.constantes);
	
	const patient = getLocalStorage("user");
	const ref = React.createRef();

	const handlePrint = useReactToPrint({
		content: () => ref.current,
	});
	return (
		<div>
			<Header />
			<div style={{ marginTop: 67, backgroundColor:'#ccd', height:40, paddingTop:7, paddingLeft: 50 }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" style={{cursor: 'pointer'}} onClick={()=>props.history.push('home')}>
						Acceuil
					</Link>
					<Link color="inherit" style={{cursor: 'pointer'}} onClick={()=>props.history.goBack()}>
						Mes consultations
					</Link>
					<Typography color="textPrimary">Détail</Typography>
				</Breadcrumbs>
			</div>
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
										<h4>Prénom : {patient.last_name}</h4>
									</div>
									<div>
										<h4>Nom : {patient.first_name} </h4>
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
									{/* <div>
												<h4>Adresse : {patient.User.address}</h4>
											</div>
											<div>
												<h4>Téléphone : {patient.User.phone_number} </h4>
											</div> */}
								</div>

								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginTop: 5,
									}}
								>
									{/* <div>
												<h4>
													Date de naissance :{" "}
													{new Date(
														patient.date_naissance
													).toLocaleDateString()}
												</h4>
											</div>
											<div>
												<h4>Sexe : {patient.sexe} </h4>
											</div> */}
								</div>
							</div>
							<br />
							<div style={{ border: "2px solid", padding: 15 }}>
								<div>
									<h4>
										Médecin : Dr {consultation.Medecin.User.first_name}{" "}
										{consultation.Medecin.User.last_name}
									</h4>
								</div>
							</div>
							<br />
							<label>Résumé de la consultation</label>
							<br />
							<br />
							<div style={{ border: "2px solid", padding: 15 }}>
								<div>
									Date :{" "}
									{new Date(
										consultation.date_consultation
									).toLocaleDateString()}
									{"  "}
									Médecin : Dr {consultation.Medecin.User.first_name}
								</div>
								<br />
								{consultation.examens != null ? (
									<>
										<label>Examens cliniques demandés</label>
										<div>
											{consultation.examens.map((exam) => (
												<p>
													{exam.nom}
													<br />
												</p>
											))}
										</div>
									</>
								) : null}
								<br />
								<label>Hypothèse & Diagnostic </label>
								<div>{consultation.diagnostic}</div>
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
	);
}

export default DetailConsultation;
