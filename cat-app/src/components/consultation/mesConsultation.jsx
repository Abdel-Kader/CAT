import React, { useEffect, useState } from "react";
import AdminHeader from "../common/header/MedecinHeader";
import {
	Grid,
	Table,
	TableBody,
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	Button,
	CircularProgress,
	Backdrop,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getConsultation, getNextConsultations } from "../../services/rdvService";
import { getLocalStorage } from "../../utils/localStorageUtil";
import {
	StyledTableCell,
	StyledTableRow,
	consultationStyles,
} from "../common/styles/consultationStyle";
import {Alert} from "@material-ui/lab";

function MesConsultations(props) {
	const user = getLocalStorage("user");
	const classes = consultationStyles();
	const [showNext, setShowNext] = useState(false)
	useEffect(() => {
		props.dispatch(getConsultation(user.id, "Medecin", "now"));
		props.dispatch(getNextConsultations(user.id,'Medecin','later'))

	}, []);

	const handleDemarrer = (patient, id) => {
		props.history.push("visio-consultation", {
			patient,
			id,
		});
	};

	const { demandes, loader, nextConsultations } = props;

	// console.log(demandes)

	return (
		<div id="wrapper">
			<AdminHeader type="consultation" />
			<div className="main">
				<div className="main-content">
					<div className="row">
						<Backdrop className={classes.backdrop} open={loader}>
							<CircularProgress color="inherit" />
						</Backdrop>
						{
							!showNext ?
								<>

									{demandes.length > 0 ?
										<div className="col-md-11" style={{marginLeft: 30}}>
											<br/>
											<br/>
											<h3>Vos téléconsultations programmées pour aujourd'hui</h3>
											<br/>
											<TableContainer component={Paper}>
												<Table
													className={classes.table}
													aria-label="customized table"
												>
													<TableHead>
														<TableRow>
															<StyledTableCell>
																Nom et prénom du patient
															</StyledTableCell>
															<StyledTableCell>Numéro de téléphone</StyledTableCell>
															<StyledTableCell>Date de naissance</StyledTableCell>
															<StyledTableCell>
																Heure de la téléconsultation
															</StyledTableCell>
															<StyledTableCell>Actions</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{demandes.map((demande) => (
															<StyledTableRow key={demande.id}>
																<StyledTableCell>
																	{demande.Patient.User.first_name}{" "}
																	{demande.Patient.User.last_name}
																</StyledTableCell>
																<StyledTableCell>
																	{demande.Patient.User.phone_number}
																</StyledTableCell>
																<StyledTableCell>
																	{new Date(
																		demande.Patient.date_naissance
																	).toLocaleDateString()}
																</StyledTableCell>
																<StyledTableCell>
																	{new Date(demande.start).toLocaleTimeString([], {
																		hour: "2-digit",
																		minute: "2-digit",
																	})}
																</StyledTableCell>
																<StyledTableCell>
																	<Button
																		onClick={() =>
																			handleDemarrer(demande.Patient, demande.id)
																		}
																		variant="contained"
																		style={{
																			backgroundColor: "green",
																			color: "#fff",
																			textTransform: "none",
																			fontSize: 13,
																		}}
																	>
																		Démarrer
																	</Button>
																</StyledTableCell>
															</StyledTableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
										:
										<Grid
											justify="center"
											container
											style={{
												display: "flow-root",
												textAlign: "center",
												marginTop: 50,
											}}
											alignContent="center"
											align="center"
										>
											<img
												src="assets/images/notFound.png"
												alt="not found"
												style={{width: 100}}
											/>
											<br/>
											<br/>
											<h3>
												Vous n'avez aucune téléconsultation prévue aujourd'hui !
											</h3>
											<br/>
											<h6>
												<Button color="primary" style={{fontWeight: 'bold', fontSize: 13}}
														onClick={() => {
															setShowNext(true)
														}}>VOIR MES PROCHAINES CONSULTATIONS</Button>
											</h6>
										</Grid>}
								</> :
								<>
									{nextConsultations.length > 0 ?
										<div className="col-md-11" style={{marginLeft: 30}}>
											<br/>
											<br/>
											<h3>Vos téléconsultations à venir</h3>
											<br/>
											<TableContainer component={Paper}>
												<Table
													className={classes.table}
													aria-label="customized table"
												>
													<TableHead>
														<TableRow>
															<StyledTableCell>
																Nom et prénom du patient
															</StyledTableCell>
															<StyledTableCell>Numéro de téléphone</StyledTableCell>
															<StyledTableCell>Date de naissance</StyledTableCell>
															<StyledTableCell>
																Date de la téléconsultation
															</StyledTableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{nextConsultations.map((demande) => (
															<StyledTableRow key={demande.id}>
																<StyledTableCell>
																	{demande.Patient.User.first_name}{" "}
																	{demande.Patient.User.last_name}
																</StyledTableCell>
																<StyledTableCell>
																	{demande.Patient.User.phone_number}
																</StyledTableCell>
																<StyledTableCell>
																	{new Date(
																		demande.Patient.date_naissance
																	).toLocaleDateString()}
																</StyledTableCell>
																<StyledTableCell>
																	{new Date(demande.start).toLocaleDateString()} à {new Date(demande.start).toLocaleTimeString([], {
																		hour: "2-digit",
																		minute: "2-digit",
																	})}
																</StyledTableCell>

															</StyledTableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
										:
										<Grid justify='center' container style={{ textAlign: 'center', marginTop: 150 }} alignContent='center' align='center'>
											{!loader ? <Grid item xs={4}>
												<img src="assets/images/notFound.png" alt="not found" style={{ width: 80 }} />
												<br />
												<br />
												<Alert severity="info">
													<strong>Vous n'avez pas aucune téléconsultation à venir pour l'instant !</strong>
												</Alert>
												<br />
												<h6>
													<Button color="primary" style={{ fontWeight: 'bold', fontSize: 13 }} onClick={() => { props.history.push('home')}}>Prendre un rendez-vous</Button>
												</h6>
											</Grid>:null}
										</Grid>
									}
								</>
						}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		demandes: state.rdv.consultations,
		nextConsultations: state.rdv.nextConsultations,
		errorMessage: state.rdv.error,
		loader: state.rdv.loader,
	};
};

export default connect(mapStateToProps)(MesConsultations);
