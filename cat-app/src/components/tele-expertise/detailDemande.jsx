import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import AdminHeader from "../common/header/MedecinHeader";
import { detailMedecinStyles } from "../common/styles/detailMedecin";
import {
	AttachFile,
	Description,
	PictureAsPdf,
	Theaters,
} from "@material-ui/icons";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { detailMedecin } from "../../services/medecinService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	TextField,
	Button,
	CircularProgress,
	Backdrop,
} from "@material-ui/core";
import { add } from "../../services/demandeAvisService";
import { getLocalStorage } from "../../utils/localStorageUtil";
import Swal from "sweetalert2";

function DetailDemandeAvis(props) {
	const [showRemote, setShowRemote] = useState(false);
	const [showDemande, setShowDemande] = useState(false);
	const [value, setValue] = useState("");
	const [date, setDate] = useState(null);
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState([]);
	const [commentaire, setCommentaire] = useState([]);
	const medecin = props.location.state;
	const [fileObjects, setFileObjects] = useState([]);
	const classes = detailMedecinStyles();

	const { medecin_detail, loading, errorMessage, avisAdded } = props;

	const commentaireChange = (e) => {
		setCommentaire(e.target.value);
    };

	const handleRadioChange = (event) => {
		setValue(event.target.value);
		if (event.target.value === "video") {
			setShowRemote(true);
			setShowDemande(false);
		} else if (event.target.value === "simple") {
			setShowDemande(true);
			setShowRemote(false);
		}
    };
    
	useEffect(() => {
		props.dispatch(detailMedecin(medecin.id));
	}, [showRemote]);


	const handleAdd = (newFiles) => {
		newFiles = newFiles.filter(
			(file) => !files.find((f) => f.data === file.data)
		);
		setFiles([...files, ...newFiles]);
	};

	const handleDelete = (deleted) => {
		setFiles(files.filter((f) => f !== deleted));
	};

	const handleSubmit = (type) => {
		const avis = {
			requerant: getLocalStorage("user").id,
			requis: medecin.id,
			commentaire,
			files,
		};
		props.dispatch(add(avis));
	};

	const handleEventClick = (arg) => {
		//
		setOpen(true);
		setDate(JSON.stringify(arg.event));
	};

	const handlePreviewIcon = (fileObject, classes) => {
		const { type } = fileObject.file;
		const iconProps = {
			className: classes.image,
		};

		if (type.startsWith("video/")) return <Theaters {...iconProps} />;

		switch (type) {
			case "application/msword":
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				return <Description {...iconProps} />;
			case "application/pdf":
				return <PictureAsPdf {...iconProps} />;
			default:
				return <AttachFile {...iconProps} />;
		}
	};

	useEffect(() => {
		{
			if (avisAdded) {
				Swal.fire({
					icon: "success",
					title: "Votre demande a été envoyée avec succès",
					showConfirmButton: true,
				}).then((res) => {
					props.history.push("demande-expertise");
				});
			} else if (errorMessage) {
				Swal.fire({
					icon: "error",
					title: errorMessage,
					showConfirmButton: true,
				});
			}
		}
	}, [avisAdded]);

	return (
		<div id="wrapper">
			<AdminHeader type="expertise" />
			<div className="main">
				<div className="main-content">
					<div className="row">
						<Grid container justify="center">
							<Grid item xs style={{ marginRight: 20, marginLeft: 20 }}>
								<br />
								<Alert variant="filled" severity="info">
									<span style={{ fontSize: 14 }}>
										Veuillez remplir ce formulaire pour valider votre demande
									</span>
								</Alert>
								<br />
								<div className="profile-content">
									<div className="row">
										{/* <Backdrop className={classes.backdrop} open={loading}>
											<CircularProgress color="inherit" />
										</Backdrop> */}
										<div className="col-sm-4">
											<div className="profile-state">
												<div className="icon-box">
													<img
														src="assets/images/users/doctor.webp"
														style={{ width: 90, border: "1px solid #ccc" }}
														alt="user-icon"
													/>
													<div>
														<h2>
															Dr {medecin.User.first_name}{" "}
															{medecin.User.last_name}
														</h2>
														<p style={{ marginLeft: 10, fontWeight: "bold" }}>
															{medecin.specialite.libelle}
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-8">
											<div className="profile-state">
												<h4 style={{ fontWeight: "bold" }}>
													Type de télé-expertise
												</h4>
												<FormControl component="fieldset" fullWidth>
													<RadioGroup
														aria-label="type"
														name="type"
														value={value}
														onChange={handleRadioChange}
													>
														<FormControlLabel
															value="video"
															control={<Radio />}
															label="En visio-conference"
															classes={{
																label: classes.checkboxLabel, // here
															}}
														/>
														<FormControlLabel
															value="simple"
															control={<Radio />}
															label="Envoyez une simple demande"
															classes={{
																label: classes.checkboxLabel, // here
															}}
														/>
													</RadioGroup>
												</FormControl>
												{showDemande ? (
													<div>
														<h4>Documents / images </h4>
														<DropzoneAreaBase
															fileObjects={files}
															onAdd={handleAdd}
															onDelete={handleDelete}
														/>
														<br />
														<br />
														<h4 style={{ fontWeight: "bold" }}>Commentaire </h4>
														<TextField
															variant="outlined"
															margin="normal"
															required
															fullWidth
															onChange={commentaireChange}
															name="commentaire"
															label="Faire un commentaire"
															multiline
															rows={4}
														/>
														<br />
														<br />

														<Button
															variant="contained"
															className={classes.btnSubmit}
															onClick={() => handleSubmit("sd")}
															color="primary"
														>
															Envoyer
														</Button>
														<br />
														<br />
													</div>
												) : showRemote ? (
													<div>
														<h4 style={{ fontWeight: "bold" }}>
															Commentaire / observation{" "}
														</h4>
														<TextField
															variant="outlined"
															margin="normal"
															required
															fullWidth
															name="commentaire"
															label="Faire un commentaire"
															multiline
															rows={4}
														/>
														<br />
														<br />
														<h4>Documents / images </h4>

														<DropzoneAreaBase
															dropzoneText="Ajouter les fichiers ici"
															fileObjects={fileObjects}
															onAdd={(newFileObjs) => {
																// console.log('onAdd', newFileObjs);
																setFileObjects(
																	[].concat(fileObjects, newFileObjs)
																);
															}}
															onDelete={(deleteFileObj) => {
																// console.log('onDelete', deleteFileObj);
															}}
															getPreviewIcon={handlePreviewIcon}
														/>
														<br />
														<br />
														<h4>
															Disponibilités du médecin pour les télé-expertises
															en vidéo-conférence
														</h4>
														<p>
															<em>
																Choisissez la date qui vous convient pour la
																télé-expertise en vidéo-conférence
															</em>
														</p>
														<br />
														<FullCalendar
															locales={allLocales}
															locale="fr"
															displayEventEnd={true}
															initialView="dayGridMonth"
															plugins={[
																dayGridPlugin,
																timeGridPlugin,
																interactionPlugin,
															]}
															editable={true}
															eventClick={handleEventClick}
															events={medecin_detail.horaires}
															headerToolbar={{
																left: "prev,next",
																center: "title",
																right: "dayGridWeek,dayGridMonth",
															}}
															eventColor="#ff5e3a"
														/>
														<br />
														<Button
															variant="contained"
															onClick={handleSubmit("sd")}
															className={classes.btnSubmit}
															color="primary"
														>
															Envoyer
														</Button>
														<br />
														<br />
													</div>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		avis: state.avis.avis,
		errorMessage: state.avis.error,
		loading: state.avis.loading,
		avisAdded: state.avis.avisAdded,
		medecin_detail: state.medecin.medecin,
	};
};

export default connect(mapStateToProps)(DetailDemandeAvis);
