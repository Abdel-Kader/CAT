import React, { useEffect } from "react";
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
import { getConsultation } from "../../services/rdvService";
import { getLocalStorage } from "../../utils/localStorageUtil";
import {
	StyledTableCell,
	StyledTableRow,
	consultationStyles,
} from "../common/styles/consultationStyle";

function MesConsultations(props) {
	const user = getLocalStorage("user");
	const classes = consultationStyles();

	useEffect(() => {
		props.dispatch(getConsultation(user.id, "Medecin", "now"));
	}, []);

	const handleDemarrer = (patient, id) => {
		props.history.push("visio-consultation", {
			patient,
			id,
		});
	};

	const { demandes, loader, errorMessage } = props;

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
						{demandes.length > 0 ? (
							<div className="col-md-11" style={{marginLeft:30}}>
								<br />
								<br />
								<h3>Vos téléconsultations programmées pour aujourd'hui</h3>
								<br />
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
						) : (
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
									style={{ width: 100 }}
								/>
								<br />
								<br />
								<h4>
									Vous n'avez aucune téléconsultation prévue aujourd'hui !
								</h4>
								<br />
								{/* <h6>
                                                <Button color="primary" style={{ fontWeight: 'bold', fontSize: 13 }} onClick={() => { setShowNext(true) }}>VOIR MES PROCHAINES CONSULTATIONS</Button>
                                            </h6> */}
							</Grid>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		demandes: state.rdv.consultations,
		errorMessage: state.rdv.error,
		loader: state.rdv.loader,
	};
};

export default connect(mapStateToProps)(MesConsultations);
