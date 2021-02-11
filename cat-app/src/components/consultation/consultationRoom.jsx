import React from "react";
import io from "socket.io-client";
import {
	Grid,
	Paper,
	Box,
	Button,
	CircularProgress,
	Backdrop,
	List,
	ListItem,
	ListItemIcon,
	Checkbox,
	ListItemText,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdminHeader from "../common/header/MedecinHeader";
import { connect } from "react-redux";
import { getLocalStorage } from "../../utils/localStorageUtil";
import {
	AttachFile,
	Description,
	PictureAsPdf,
	Theaters,
} from "@material-ui/icons";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { add } from "../../services/consultationService";
import { updateStatus } from '../../services/rdvService';
import { getAll } from "../../services/examService";
import Swal from "sweetalert2";

class ConsultationRoom extends React.Component {
	constructor(props) {
		super();
		this.onDrop = (files) => {
			this.setState({ files });
		};
		this.state = {
			poids: 0,
			taille: 1,
			imc: "",
			saturation: "",
			pouls: "",
			pa_pad: "",
			frequence: "",
			temperature: "",
			date_consultation: new Date(),
			heure_debut: "",
			cout: "",
			exams: [],
			files: [],
			fileObjects: [],
			diagnostic: "",
			defaultHTML: `
                <h4>Ministère de la Santé et de l'Action Sociale</h4>
                <h4><b>CENTRE HOSPITALIER NATIONAL UNIVERSITAIRE de Fann</b></h4>
                ${props.history.location.state.patient.User.first_name}  
                <br>
                <div class="row">
                  <div class="col-sm-3></div>
                  <div class="col-sm-6><h3><b>ORDONNANCE</b></h3></div>
                </div>             
            `,
		};
		this.localVideoref = React.createRef();
		this.remoteVideoref = React.createRef();

		this.socket = null;

		this.candidates = [];
	}

	handlePreviewIcon = (fileObject, classes) => {
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

	diagnosticChange = (e) => {
		e.preventDefault();
		this.setState({ diagnostic: e.target.value });
	};

	componentDidMount() {
		this.props.dispatch(getAll());
		this.setState({ heure_debut: new Date().toLocaleTimeString() });
		this.socket = io("/webrtcPeer", {
			path: "/webrtc",
			query: {},
		});

		this.socket.on("connection-success", (success) => {
			console.log(success);
		});

		this.socket.on("Answer", (sdp) => {
			var desc = JSON.stringify(sdp);
			Swal.fire({
				title: "Notification !",
				text: "Le patient est connecté",
				icon: "info",
			}).then((result) => {
				if (result.value) {
					// props.dispatch(updateDemande(id,status))
					this.pc.setRemoteDescription(
						new RTCSessionDescription(JSON.parse(desc))
					);

					this.candidates.forEach((candidate) => {
						// console.log(JSON.stringify(candidate));
						this.pc.addIceCandidate(new RTCIceCandidate(candidate));
						// this.sendToPeer("debut", null);
						this.socket.emit("debut");
					});
					// setTimeout(() => {
					// }, 2000);
				}
			});
			//this.textref.value = JSON.stringify(sdp);
		});

		this.socket.on("candidate", (candidate) => {
			this.candidates = [...this.candidates, candidate];
		});

		const pc_config = {
			iceServers: [
				{
					urls: "stun:stun.l.google.com:19302",
				},
			],
		};

		this.pc = new RTCPeerConnection(pc_config);

		this.pc.onicecandidate = (e) => {
			if (e.candidate) {
				this.sendToPeer("candidate", e.candidate);
			}
		};

		this.pc.oniceconnectionstatechange = (e) => {
			console.log(e);
		};

		this.pc.onaddstream = (e) => {
			console.log("e.stream" + e.stream);
			this.remoteVideoref.current.srcObject = e.stream;
		};

		const constraints = { video: true };

		const success = (stream) => {
			this.localVideoref.current.srcObject = stream;
			this.pc.addStream(stream);
		};

		const failure = (e) => {
			console.log("getUserMedia Error: ", e);
		};
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(success)
			.catch(failure);
	}

	handleToggle = (value) => () => {
		const currentIndex = this.state.exams.indexOf(value.nom);
		const newChecked = [...this.state.exams];

		if (currentIndex === -1) {
			newChecked.push(value.nom);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({ exams: newChecked });
	};
	sendToPeer = (messageType, payload) => {
		this.socket.emit(messageType, {
			socketID: this.socket.id,
			payload,
		});
	};
	createOffer = () => {
		console.log("offer");
		this.pc.createOffer({ offerToReceiveVideo: 1 }).then(
			(sdp) => {
				// console.log(JSON.stringify(sdp))
				this.pc.setLocalDescription(sdp);
				this.sendToPeer("offer", sdp);
			},
			(e) => {}
		);
	};

	createAnswer = () => {
		console.log("Answer");
		this.pc.createAnswer({ offerToReceiveVideo: 1 }).then(
			(sdp) => {
				// console.log(JSON.stringify(sdp))
				this.pc.setLocalDescription(sdp);
				this.sendToPeer("offerOrAnswer", sdp);
			},
			(e) => {}
		);
	};

	addCandidate = () => {
		this.candidates.forEach((candidate) => {
			console.log(JSON.stringify(candidate));
			this.pc.addIceCandidate(new RTCIceCandidate(candidate));
		});
	};

	setRemoteDescription = () => {
		const desc = JSON.parse(this.textref.value);

		this.pc.setRemoteDescription(new RTCSessionDescription(desc));
	};

	submit = (e) => {
		e.preventDefault();
		const consultation = {
			// id: this.props.history.location.state.id,
			diagnostic: this.state.diagnostic,
			date_consultation: this.state.date_consultation,
			constantes: {
				poids: this.state.poids,
				taille: this.state.taille,
				pression: this.state.pression,
				temperature: this.state.temperature,
				pa_pad: this.state.pa_pad,
				tension: this.state.tension,
				IMC:
					this.state.poids /
					((this.state.taille / 100) * (this.state.taille / 100)),
			},
			exams: this.state.exams,
			patientId: this.props.history.location.state.patient.id,
			medecinId: getLocalStorage("user").id,
			cout: 5000,
			heure_debut: this.state.heure_debut,
		};
		this.props.dispatch(add(consultation));
		Swal.fire({
			icon: 'success',
			title: 'Consultation terminée avec succès',
			showConfirmButton: true
		}).then((res) => {
			this.props.dispatch(updateStatus(this.props.history.location.state.id,4))
			this.props.history.push('tele-consultation')
			// window.location.reload()
		})
	};

	goToFiche = () => {
		const fiche = {
			patient: this.props.history.location.state.patient,
			medecin: getLocalStorage("user"),
			exams: this.state.exams,
			constantes: {
				poids: this.state.poids,
				taille: this.state.taille,
				pression: this.state.pression,
				temperature: this.state.temperature,
				pa_pad: this.state.pa_pad,
				tension: this.state.tension,
				IMC: this.state.imc,
			},
			diagnostic: this.state.diagnostic,
			date_consultation: this.state.date_consultation,
		};
		this.props.history.push("fiche-consultation", fiche);
	};
	render() {
		// console.log(this.props.consultation)
		// if (this.props.consultation) 
        // {
		// 	Swal.fire({
        //         icon: 'success',
        //         title: 'Consultation terminée avec succès',
        //         showConfirmButton: true
        //     }).then((res) => {
        //         this.props.history.push('tele-consultation')
        //         // window.location.reload()
        //     })
        // }
        
		const files = this.state.files.map((file) => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		));
		return (
			<div id="wrapper">
				<AdminHeader type="consultation" />
				<Backdrop open={this.props.loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
				<div className="main">
					<div className="main-content">
						<div className="row" style={{ flexFlow: 1 }}>
							<form role="form" onSubmit={this.submit}>
								<Grid container style={{ marginLeft: 25 }}>
									<Grid item xs={7}>
										<div style={{ border: "2px solid" }}>
											<Paper>
												<Grid
													style={{
														border: "1px solid #ccc",
														borderRadius: 5,
														paddingLeft: 20,
														paddingBottom: 15,
													}}
												>
													<h4 style={{ fontWeight: "bold" }}>
														{
															this.props.history.location.state.patient.User
																.first_name
														}{" "}
														{
															this.props.history.location.state.patient.User
																.last_name
														}
													</h4>
													<p>
														<strong>Téléphone : </strong>
														{
															this.props.history.location.state.patient.User
																.phone_number
														}
													</p>
													<br />
													{/* <p>{this.props.history.location.state.patient.User.address}</p> */}
													<p>
														<strong>Date de naissance : </strong>
														{new Date(
															this.props.history.location.state.patient.date_naissance
														).toLocaleDateString()}
													</p>
												</Grid>
											</Paper>
											<Grid>
												<Accordion style={{ marginTop: 10 }}>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Prendre les constantes
														</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Grid direction="row" container>
															<div className="col-md-3">
																<label>Poids (en KG)</label>
																<input
																	className="form-control"
																	name="poids"
																	type="number"
																	onChange={(e) =>
																		this.setState({ poids: e.target.value })
																	}
																/>
															</div>
															<div className="col-md-3">
																<label>Taille (en cm)</label>
																<input
																	className="form-control"
																	name="taille"
																	type="number"
																	onChange={(e) =>
																		this.setState({ taille: e.target.value })
																	}
																/>
															</div>
															<div className="col-md-3">
																<label>IMC</label>
																<input
																	className="form-control"
																	name="imc"
																	value={
																		this.state.poids /
																		((this.state.taille / 100) *
																			(this.state.taille / 100))
																	}
																	readOnly
																/>
															</div>
															<div className="col-md-3">
																<label>Température (en °C)</label>
																<input
																	className="form-control"
																	name="temperature"
																	type="number"
																	onChange={(e) =>
																		this.setState({
																			temperature: e.target.value,
																		})
																	}
																/>
															</div>
														</Grid>
													</AccordionDetails>
													<AccordionDetails>
														<Grid direction="row" container>
															<div className="col-md-3">
																<label>Tension (PA/PAD)</label>
																<input
																	className="form-control"
																	name="pa/pad"
																	onChange={(e) =>
																		this.setState({ pa_pad: e.target.value })
																	}
																/>
															</div>
															<div className="col-md-3">
																<label>Saturation (SPO2)</label>
																<input
																	className="form-control"
																	name="saturation"
																	onChange={(e) =>
																		this.setState({
																			saturation: e.target.value,
																		})
																	}
																/>
															</div>
															<div className="col-md-3">
																<label>Pouls</label>
																<input
																	className="form-control"
																	name="pouls"
																	onChange={(e) =>
																		this.setState({ pouls: e.target.value })
																	}
																/>
															</div>
															<div className="col-md-3">
																<label>Fréquence cardiaque</label>
																<input
																	className="form-control"
																	name="frequence"
																	onChange={(e) =>
																		this.setState({ frequence: e.target.value })
																	}
																/>
															</div>
														</Grid>
													</AccordionDetails>
												</Accordion>

												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Diagnostic / Hypothèse
														</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<textarea
															className="form-control"
															name="diagnostic"
															onChange={this.diagnosticChange}
															id="exampleFormControlTextarea1"
															rows="3"
														></textarea>
													</AccordionDetails>
												</Accordion>

												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Prescrire un traitement
														</Typography>
													</AccordionSummary>
													<AccordionDetails>
														{/* <CKEditor
                            editor={ ClassicEditor }
                            data={this.state.defaultHTML}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                              }}
                              config={
                                {
                                  ckfinder: {
                                    uploadUrl:'/upload'
                                  },
                                  allowedContent : true
                                }
                              }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        /> */}
													</AccordionDetails>
												</Accordion>
												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Prescrire des analyses ou examens
														</Typography>
													</AccordionSummary>
													<Accordion>
														<AccordionSummary
															expandIcon={<ExpandMoreIcon />}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																style={{
																	fontSize: 14,
																	fontWeight: "bold",
																}}
															>
																BIOLOGIE
															</Typography>
														</AccordionSummary>
														<AccordionDetails>
															<AccordionDetails>
																{Object.keys(this.props.exams).length > 0 ? (
																	<List>
																		<div className="row">
																			{this.props.exams.map((filteredExam) => (
																				<div className="col-md-4">
																					<ListItem
																						key={filteredExam.nom}
																						role={undefined}
																						dense
																						button
																					>
																						<ListItemIcon>
																							<Checkbox
																								edge="start"
																								tabIndex={-1}
																								onClick={this.handleToggle(
																									filteredExam
																								)}
																								disableRipple
																							/>
																						</ListItemIcon>
																						<ListItemText
																							primary={filteredExam.nom}
																						/>
																					</ListItem>
																				</div>
																			))}
																		</div>
																	</List>
																) : null}
															</AccordionDetails>
														</AccordionDetails>
													</Accordion>

													<Accordion>
														<AccordionSummary
															expandIcon={<ExpandMoreIcon />}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography
																style={{
																	fontSize: 14,
																	fontWeight: "bold",
																}}
															>
																IMAGERIE
															</Typography>
														</AccordionSummary>
														<AccordionDetails>
															<List>
																<div className="row">
																	<div className="col-md-4">
																		<ListItem role={undefined} dense button>
																			<ListItemIcon>
																				<Checkbox
																					edge="start"
																					tabIndex={-1}
																					disableRipple
																				/>
																			</ListItemIcon>
																			<ListItemText primary={"Radiologie"} />
																		</ListItem>
																	</div>
																	<div className="col-md-4">
																		<ListItem role={undefined} dense button>
																			<ListItemIcon>
																				<Checkbox
																					edge="start"
																					tabIndex={-1}
																					disableRipple
																				/>
																			</ListItemIcon>
																			<ListItemText primary={"Scanner"} />
																		</ListItem>
																	</div>
																	<div className="col-md-4">
																		<ListItem role={undefined} dense button>
																			<ListItemIcon>
																				<Checkbox
																					edge="start"
																					tabIndex={-1}
																					disableRipple
																				/>
																			</ListItemIcon>
																			<ListItemText primary={"Echographie"} />
																		</ListItem>
																	</div>
																	<div className="col-md-4">
																		<ListItem role={undefined} dense button>
																			<ListItemIcon>
																				<Checkbox
																					edge="start"
																					tabIndex={-1}
																					disableRipple
																				/>
																			</ListItemIcon>
																			<ListItemText
																				primary={
																					"Imagerie par Résonance Magnétique (IRM)"
																				}
																			/>
																		</ListItem>
																	</div>
																</div>
															</List>
														</AccordionDetails>
													</Accordion>
												</Accordion>
												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Suivi du patient
														</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<table className="table table-bordered">
															<thead>
																<tr>
																	<th>Date</th>
																	<th>Maladie (Hypothèse)</th>
																	<th>Traitement</th>
																	<th>Analyse</th>
																	<th>Résultat</th>
																</tr>
															</thead>
															<tbody></tbody>
														</table>
													</AccordionDetails>
												</Accordion>

												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls="panel1a-content"
														id="panel1a-header"
													>
														<Typography
															style={{
																fontSize: 14,
																fontWeight: "bold",
																color: "green",
															}}
														>
															Partager un document avec le patient
														</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<DropzoneAreaBase
															dropzoneText="Ajouter ou glisser et déposer le fichier ici"
															fileObjects={this.state.fileObjects}
															onAdd={(newFileObjs) => {
																console.log("onAdd", newFileObjs);
																this.setState({
																	fileObjects: [].concat(
																		this.state.fileObjects,
																		newFileObjs
																	),
																});
															}}
															onDelete={(deleteFileObj) => {
																console.log("onDelete", deleteFileObj);
															}}
															getPreviewIcon={this.handlePreviewIcon}
														/>
													</AccordionDetails>
												</Accordion>
											</Grid>
											<br />
											<Button
												style={{
													backgroundColor: "green",
													color: "#fff",
													fontSize: 14,
													marginLeft: 20,
													textTransform: "none",
												}}
												type="submit"
												variant="contained"
											>
												Terminer la consultation
											</Button>
											<Button
												style={{
													backgroundColor: "orange",
													color: "#fff",
													fontSize: 14,
													marginLeft: 10,
													textTransform: "none",
												}}
												onClick={this.goToFiche}
												variant="contained"
											>
												Imprimer la fiche
											</Button>
											<Button
												onClick={this.createOffer}
												style={{
													color: "#fff",
													fontSize: 14,
													marginLeft: 10,
													textTransform: "none",
												}}
												variant="contained"
												color="primary"
												size="large"
											>
												Inviter le patient à rejoindre la vidéo
											</Button>
											{/* <Button
												onClick={this.addCandidate}
												style={{
													color: "#fff",
													fontSize: 14,
													marginLeft: 10,
													textTransform: "none",
												}}
												variant="contained"
												color="primary"
												size="large"
											>
												Commencer
											</Button> */}
											<br />
											<br />
											<br />
										</div>
									</Grid>

									<Grid item xs={5}>
										<Box style={{ height: "100%" }}>
											<video
												style={{ height: "80vh" }}
												ref={this.remoteVideoref}
												autoPlay
											></video>
											<video
												style={{
													margin: 5,
													height: 150,
													position: "fixed",
													bottom: "5vh",
													right: 0,
												}}
												ref={this.localVideoref}
												autoPlay
											></video>
											{/* <div style={{ backgroundColor: "red" }}>
												<button onClick={this.createAnswer}>Répondre </button>
											</div> */}
										</Box>
									</Grid>
								</Grid>
							</form>
						</div>
					</div> 
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		consultation: state.consultation.consultationAdded,
		errorMessage: state.consultation.error,
		loading: state.consultation.loading,
		loader: state.exam.loading,
		exams: state.exam.exams,
		error: state.exam.error,
	};
};

export default connect(mapStateToProps)(ConsultationRoom);
