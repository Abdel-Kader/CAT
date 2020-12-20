import React, { useState, useEffect } from "react";
import AdminHeader from "../common/header/MedecinHeader";
import { connect } from "react-redux";
import { patientHomeStyle } from "../common/styles/patientHomeStyle";
import {
	AccordionSummary,
	Accordion,
	AccordionDetails,
	CircularProgress,
	Backdrop,
	Button,
} from "@material-ui/core";
import { base64MimeType } from "../../utils/base64Type";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { addResponse, updateStatut } from "../../services/demandeAvisService";
import Swal from "sweetalert2";

function DetailExpertise(props) {
	const classes = patientHomeStyle();
	const detail = props.location.state.res;
	const type = props.location.state.type;
	const [img, setImg] = useState("");
	const [pdf, setPdf] = useState("");
	const [reponse, setReponse] = useState("");
	const [statut, setStatut] = useState("");

	const { avisAdded, loading, errorMessage } = props;

	useEffect(() => {
		if (avisAdded && statut == 2) {
			Swal.fire({
				icon: "success",
				title: "Votre avis a été envoyé avec succès",
				showConfirmButton: true,
			}).then((res) => {
				// props.history.push("list-expertise");
				window.location.reload()
			});
		} else if (errorMessage) {
			Swal.fire({
				icon: "error",
				title: errorMessage,
				showConfirmButton: true,
			});
		}
	}, [avisAdded]);

	function changeImg(img) {
		setImg(img);
	}

	function reponseChange(e) {
		setReponse(e.target.value);
	}

	function changePdf(img) {
		setPdf(img);
	}

	const sendAvis = () => {
		setStatut(2);
		if (reponse) props.dispatch(addResponse(detail.id, reponse));
		else alert("Vous n'avez pas saisi de réponse !");
	};

	const updateStatus = (status) => {
		if (status == 3) {
			Swal.fire({
				title: "Attention !",
				text: "Voulez-vous vraiment rejeter cette demande ?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Oui, supprimer !",
				cancelButtonText: "Non, fermer !",
			}).then((result) => {
				if (result.value) {
					props.dispatch(updateStatut(detail.id, status));
					Swal.fire("Succès!", "Demande rejetée avec succès", "success").then(
						props.history.push("expertise-received")
					);
				}
			});
		} else {
			Swal.fire({
				title: "Attention !",
				text: "Voulez-vous vraiment annuler cette demande ?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Oui, supprimer !",
				cancelButtonText: "Non, fermer !",
			}).then((result) => {
				if (result.value) {
					props.dispatch(updateStatut(detail.id, status));
					Swal.fire("Succès!", "Demande annulée avec succès", "success").then(
						props.history.push("expertise-send")
					);
				}
			});
		}
	};

	return (
		<div id="wrapper">
			<AdminHeader type="expertise" />
			<div className="main">
				<div className="main-content">
					<div className="row" style={{ margin: 30 }}>
						<Backdrop className={classes.backdrop} open={loading}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<h3>Détail de la demande d'expertise</h3>
						<div className="row">
							<div className="col-md-6">
								<div className="profile-state">
									{type === "requis" ? (
										<legend>Médecin requerant</legend>
									) : (
										<legend>Médecin requis</legend>
									)}
									<div className="icon-box">
										<img
											src="assets/images/users/doctor.webp"
											style={{ width: 60, borderRadius: 50, height: 60 }}
											alt="user-icon"
										/>
										<div>
											{type === "requis" ? (
												<>
													<h2>
														Dr {detail.medRequerant.User.first_name}{" "}
														{detail.medRequerant.User.last_name}
													</h2>
													<h4>{detail.medRequerant.service.libelle}</h4>
												</>
											) : (
												<>
													<h2>
														Dr {detail.medRequis.User.first_name}{" "}
														{detail.medRequis.User.last_name}
													</h2>
													<h4>{detail.medRequis.service.libelle}</h4>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="profile-state">
									<legend>Spécialité</legend>
									<div className="icon-box">
										{type === "requis" ? (
											<h3>{detail.medRequerant.specialite.libelle} </h3>
										) : (
											<h3>{detail.medRequis.specialite.libelle} </h3>
										)}
									</div>
									<br />
								</div>
							</div>
						</div>
                        <br />
                        
						<div className="row profile-state">
                        <div className="col-md-12">
								<legend>Fichier(s)</legend>
							</div>
							<br />
							{detail.file1 ? (
								<div className="col-md-3">
									{base64MimeType(detail.file1) == "application/pdf" ? (
										<img
											src="assets/images/pdf.jpg"
											className="img-responsive"
											style={{ cursor: "pointer" }}
											onClick={() => changePdf(detail.file1)}
											data-toggle="modal"
											data-target="#filemodal"
										/>
									) : (
										<img
											alt="img"
											data-toggle="modal"
											data-target="#imagemodal"
											src={detail.file1}
											onClick={() => changeImg(detail.file1)}
											className="img-responsive"
											style={{ cursor: "pointer" }}
										/>
									)}
								</div>
							) : null}

							{detail.file2 ? (
								<div className="col-md-3">
									{base64MimeType(detail.file2) == "application/pdf" ? (
										<img
											src="assets/images/pdf.jpg"
											className="img-responsive"
											style={{ cursor: "pointer" }}
											onClick={() => changePdf(detail.file2)}
											data-toggle="modal"
											data-target="#filemodal"
										/>
									) : (
										<img
											alt="img"
											data-toggle="modal"
											data-target="#imagemodal"
											src={detail.file2}
											onClick={() => changeImg(detail.file2)}
											className="img-responsive"
											style={{ cursor: "pointer" }}
										/>
									)}
								</div>
							) : null}

							{detail.file3 ? (
								<div className="col-md-3">
									{base64MimeType(detail.file3) == "application/pdf" ? (
										<img
											src="assets/images/pdf.jpg"
											className="img-responsive"
											style={{ cursor: "pointer" }}
											onClick={() => changePdf(detail.file3)}
											data-toggle="modal"
											data-target="#filemodal"
										/>
									) : (
										<img
											alt="img"
											data-toggle="modal"
											data-target="#imagemodal"
											src={detail.file3}
											onClick={() => changeImg(detail.file3)}
											className="img-responsive"
											style={{ cursor: "pointer" }}
										/>
									)}
								</div>
							) : null}
						</div>
						<br />
						<div className="row profile-state">
							<div className="col-md-12">
								<legend>Commentaire</legend>
							</div>
							<br />
							<div className="col-md-12">
								<p style={{ textAlign: "justify", fontSize: 18 }}>
									{detail.commentaire}
								</p>
							</div>
						</div>
						{detail.statut === 0 && type === "requis" ? (
							<div className="row">
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography style={{ fontSize: 21, color: "#333" }}>
											Emettre un avis
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<textarea
											className="form-control"
											name="diagnostic"
											id="exampleFormControlTextarea1"
											rows="7"
											onChange={reponseChange}
										/>
									</AccordionDetails>
									<AccordionDetails style={{ display: "initial" }}>
										<Button
											onClick={sendAvis}
											style={{
												backgroundColor: "#121f3e",
												margin: "8px 16px 16px",
												float: "right",
												textTransform: "none",
												color: "#fff",
												fontSize: 15,
												marginLeft: 20,
											}}
											variant="contained"
										>
											Envoyer{" "}
											<i
												style={{ fontSize: 20, marginLeft: 10 }}
												className="icofont-paper-plane"
											/>
										</Button>
									</AccordionDetails>
								</Accordion>
							</div>
						) : null}
						{detail.statut === 2 ? (
							<div className="row profile-state">
								<div className="col-md-12">
									<legend>L'avis donné</legend>
								</div>
								<br />
								<div className="col-md-12">
									<p style={{ textAlign: "justify", fontSize: 18 }}>
										{detail.reponse}
									</p>
								</div>
							</div>
						) : null}

						{detail.statut === 0 && type === "requerant" ? (
							<div className="row profile-state">
								<Button
									variant={"contained"}
									color={"primary"}
									style={{ textTransform: "none" }}
									data-toggle="modal"
									data-target="#exampleModal"
								>
									Modifier
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									onClick={() => {
										updateStatus(4);
									}}
									style={{
										float: "right",
										textTransform: "none",
										marginRight: 20,
									}}
								>
									Annuler la demande
								</Button>
							</div>
						) : null}
					</div>
					<div
						className="modal fade"
						id="imagemodal"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalLongTitle"
						aria-hidden="true"
					>
						<div className="modal-dialog full" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span
											aria-hidden="true"
											style={{ fontSize: 40, fontWeight: "bold" }}
										>
											&times;
										</span>
									</button>
								</div>
								<div className="modal-body">
									<img
										src={img}
										className="imagepreview"
										style={{ width: "100%" }}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						className="modal fade"
						id="filemodal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLongTitle"
						aria-hidden="true"
					>
						<div className="modal-dialog full" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span
											aria-hidden="true"
											style={{ fontSize: 40, fontWeight: "bold" }}
										>
											&times;
										</span>
									</button>
								</div>
								<div className="modal-body">
									<iframe
										src={pdf}
										height="100%"
										width={"100%"}
										style={{ height: "-webkit-fill-available" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div
							className="modal-header"
							style={{ backgroundColor: "#4CBA75", color: "#fff" }}
						>
							<h4 className="modal-title" id="exampleModalLabel">
								Formulaire de modification
							</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form style={{ marginLeft: 25, marginRight: 25 }}>
								<div className={"row"}>
									<div className="form-group">
										<label>Commentaire</label>
										<textarea
											defaultValue={detail.commentaire}
											className={"form-control"}
											rows={5}
										/>
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary">
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		avisAdded: state.avis.avisAdded,
		errorMessage: state.avis.error,
		loading: state.avis.loading,
	};
};

export default connect(mapStateToProps)(DetailExpertise);
