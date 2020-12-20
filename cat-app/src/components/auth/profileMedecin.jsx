import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MedecinHeader from "../common/header/MedecinHeader";
import { me, updateProfile } from "../../services/userService";
import InputMask from "react-input-mask";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { getLocalStorage } from "../../utils/localStorageUtil";
import Swal from "sweetalert2";
import Alert from "@material-ui/lab/Alert";
import { patientHomeStyle } from "../common/styles/patientHomeStyle";

import {
	Grid,
	Button,
	TextField,
	CircularProgress,
	Backdrop,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@material-ui/core";

function ProfilMadecin(props) {
	const classes = patientHomeStyle();
	const validEmail = new RegExp(
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	);
	const [emailIncorrect, setEmailIncorrect] = useState(false);
	const [firstNameIncorrect, setfirstNameIncorrect] = useState(false);
	const [lastNameIncorrect, setLastNameIncorrect] = useState(false);
	const [phoneIncorrect, setPhoneIncorrect] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const { loading, userInfo, errorMessage, userAdded } = props;
	const [open, setOpen] = React.useState(false);
	const [openCal, setOpenCal] = React.useState(false);
	const [dat, setDat] = React.useState("");
	const [startDate, handleStartDateChange] = useState(new Date());
	const [endDate, handleEndDateChange] = useState(new Date());
	const [event, setEvent] = React.useState([]);
	const user = getLocalStorage("user");

	useEffect(() => {
		props.dispatch(me(1));
	}, []);

	const handleClickOpen = (arg) => {
		setOpenCal(true);
		setDat(arg.dateStr);
	};

	useEffect(async () => {
		await axios
			.get("http://localhost:8080/api/disponibility?id=" + user.id + "&type=teleconsultation")
			.then((res) => {
				// console.log(res.data.disponibilities);
				setEvent(res.data.disponibilities);
			})
			.catch((err) => {
				console.log(err);
			});
	}, open);

	const calClose = () => {
		setOpenCal(false);
	};

	useEffect(() => {
		if (userAdded) {
			setOpen(false);
			Swal.fire({
				icon: "success",
				title: "Profil modifié avec succès",
				showConfirmButton: true,
			}).then((res) => {
				// props.history.push('admin')
				window.location.reload();
			});
		}
	}, [userAdded]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const phoneChange = function (e) {
		setPhoneNumber(e.target.value);
		phoneNumber ? setPhoneIncorrect(false) : setPhoneIncorrect(true);
	};

	const addressChange = function (e) {
		setAddress(e.target.value);
	};

	const firstNameChange = function (e) {
		setFirstName(e.target.value);
		firstName.length < 3
			? setfirstNameIncorrect(true)
			: setfirstNameIncorrect(false);
	};

	const lastNameChange = function (e) {
		setLastName(e.target.value);
		lastName ? setLastNameIncorrect(true) : setLastNameIncorrect(false);
	};

	const startDateChange = function (e) {
		var year = new Date(dat).getFullYear();
		var month = new Date(dat).getMonth() + 1;
		var day = new Date(dat).getDate();
		handleStartDateChange(
			year + "-" + month + "-" + day + " " + e.target.value + ":00"
        );
        // handleStartDateChange(e.target.value)
	};
	const endDateChange = function (e) {
		var year = new Date(dat).getFullYear();
		var month = new Date(dat).getMonth() + 1;
		var day = new Date(dat).getDate();
		handleEndDateChange(
			year + "-" + month + "-" + day + " " + e.target.value + ":00"
        );
        // handleEndDateChange(e.target.value)
	};

	const emailChange = function (e) {
		setEmail(e.target.value);
		if (!validEmail.test(email)) {
			setEmailIncorrect(true);
		} else {
			setEmailIncorrect(false);
		}
	};

	const submitHandle = (e) => {
		e.preventDefault();
		const first = firstName.length > 0 ? firstName : userInfo.User.first_name;
		const last = lastName.length > 0 ? lastName : userInfo.User.last_name;
		const phone =
			phoneNumber.length > 0 ? phoneNumber : userInfo.User.phone_number;
		const mail = email.length > 0 ? email : userInfo.User.email;
		const adres = address.length > 0 ? address : userInfo.User.address;
		const user = {
			first,
			last,
			phone,
			mail,
			adres,
		};
		if (first && last && phone) {
			props.dispatch(updateProfile(user));
		} else {
			alert("Veuillez remplir les champs obligatoires !");
		}
	};

    const handleSubmit = () => {
        
		if (startDate && endDate) {
			axios
				.post("http://localhost:8080/api/disponibility", {
					type: "teleconsultation",
					start: startDate,
					end: endDate,
					medecinId: user.id,
				})
				.then((res) => {
                    // console.log(res);
                    setOpenCal(false);
                    window.location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
			setOpen(false);
		} else {
			alert("Veuillez remplir les champs !");
		}
	};

	return (
		<div id="wrapper">
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<MedecinHeader type="consultation" />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="profile-content" style={{ marginTop: 20 }}>
							<div className="row">
								<div className="col-sm-4">
									<div class="profile-state" style={{ paddingLeft: 0 }}>
										<div
											class="icon-box"
											style={{
												backgroundColor: "#4cba75",
												textAlign: "center",
												display: "grid",
											}}
										>
											<h2 style={{ fontWeight: "bold" }}>
												Informations personnelles
											</h2>
										</div>
										{userInfo != undefined ? (
											<div style={{ marginLeft: 15, fontSize: 17 }}>
												<h4>
													<i
														className="icofont-user-alt-3"
														style={{ marginRight: 15, fontSize: 17 }}
													/>
													{userInfo.User.first_name} {userInfo.User.last_name}
												</h4>
												<h4>
													<i
														class="icofont-phone-circle"
														style={{ marginRight: 15, fontSize: 17 }}
													/>{" "}
													{userInfo.User.phone_number}
												</h4>
												<h4>
													<i
														class="icofont-ui-email"
														style={{ marginRight: 15, fontSize: 17 }}
													/>{" "}
													{userInfo.User.email}
												</h4>
												<h4>
													<i
														class="icofont-location-pin"
														style={{ marginRight: 15, fontSize: 17 }}
													/>{" "}
													{userInfo.User.address}
												</h4>

												<h4>
													Date d'inscription :{" "}
													{new Date(userInfo.createdAt).toLocaleDateString()}{" "}
												</h4>
											</div>
										) : null}
										<br />
										<Button
											style={{ float: "right" }}
											type="submit"
											variant="contained"
											onClick={handleOpen}
											className={classes.submit}
										>
											Modifier{" "}
											<i class="icofont-edit-alt" style={{ marginLeft: 15 }} />
										</Button>
										<br />
										<br />
									</div>
								</div>
								<div className="col-sm-8">
									<div class="profile-state" style={{ paddingLeft: 0 }}>
										<div
											class="icon-box"
											style={{
												backgroundColor: "#4cba75",
												textAlign: "center",
												display: "grid",
											}}
										>
											<h2 style={{ fontWeight: "bold" }}>
												Gérer vos disponibilités
											</h2>
										</div>
										<FullCalendar
											locales={allLocales}
											locale="fr"
											displayEventEnd={true}
											initialView="dayGridWeek"
											plugins={[
												dayGridPlugin,
												timeGridPlugin,
												interactionPlugin,
											]}
											editable={true}
											dateClick={handleClickOpen}
											events={event}
											eventColor="#ff5e3a"
											headerToolbar={{
												left: "prev,next",
												center: "title",
												right: "dayGridMonth,timeGridWeek,timeGridDay",
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Dialog
					open={open}
					maxWidth={"sm"}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Formulaire de modification
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<form name="form" className={classes.form}>
								{errorMessage ? (
									<Alert severity="error">{errorMessage}</Alert>
								) : null}

								<Grid direction="row" container justify="space-between">
									<Backdrop className={classes.backdrop} open={loading}>
										<CircularProgress color="inherit" />
									</Backdrop>
									<Grid xs={6} item className={classes.gridFull}>
										<TextField
											variant="outlined"
											margin="normal"
											required
											error={firstNameIncorrect}
											fullWidth
											label="Nom"
											name={firstName}
											autoFocus
											helperText={
												firstNameIncorrect
													? "Doit contenir au moins 3 caractères "
													: null
											}
											onChange={firstNameChange}
											defaultValue={userInfo ? userInfo.User.first_name : null}
										/>
									</Grid>
									<Grid xs={6} item className={classes.gridFull}>
										<TextField
											variant="outlined"
											margin="normal"
											required
											defaultValue={userInfo ? userInfo.User.last_name : null}
											label="Prénom"
											name={lastName}
											fullWidth
											onChange={lastNameChange}
										/>
									</Grid>
									<Grid xs={6} item className={classes.gridFull}>
										<InputMask
											mask="(+221) 99 999 99 99"
											onChange={phoneChange}
											disabled={false}
											maskChar="-"
											defaultValue={
												userInfo ? userInfo.User.phone_number : null
											}
										>
											{() => (
												<TextField
													variant="outlined"
													margin="normal"
													required
													error={phoneIncorrect}
													helperText={
														phoneIncorrect ? "Ce champ est obligatoire " : null
													}
													fullWidth
													label="Téléphone"
												/>
											)}
										</InputMask>
									</Grid>
									<Grid xs={6} item className={classes.gridFull}>
										<TextField
											variant="outlined"
											margin="normal"
											label="Email"
											error={emailIncorrect}
											helperText={
												emailIncorrect ? "Adresse mail invalide " : null
											}
											name={email}
											defaultValue={userInfo ? userInfo.User.email : null}
											type="email"
											fullWidth
											onChange={emailChange}
										/>
									</Grid>
								</Grid>
								<TextField
									variant="outlined"
									margin="normal"
									fullWidth
									name="address"
									defaultValue={userInfo ? userInfo.User.address : null}
									label="Adresse"
									onChange={addressChange}
								/>
							</form>
						</DialogContentText>
						<br />
						<br />
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Button
								fullWidth
								style={{ width: "40%" }}
								type="submit"
								onClick={submitHandle}
								variant="contained"
								className={classes.submit}
							>
								Modifier{" "}
								<i class="icofont-edit-alt" style={{ marginLeft: 15 }} />
							</Button>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="secondary" autoFocus>
							Fermer
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={openCal}
					onClose={calClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Vous serez disponible pour des téléconsultations le{" "}
							{new Date(dat).toLocaleDateString()}
						</DialogContentText>
						{/* <Grid>
                        <FormControl style={{width:'100%'}}>
                            <InputLabel id="demo-simple-select-label">Disponible pour</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Une téléconsultation</MenuItem>
                                <MenuItem value={2}>Une télé-expertise</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
						<Grid container justify="space-between">
							<label>Heure de début</label>
							<input
								type="time"
								id="appt"
								name="appt"
								className="form-control"
								required
                                onChange={startDateChange}
							/>
							<br />
							<br />
							<br />
							<label>Heure de fin</label>
							<input
								type="time"
								id="appt"
								name="appt"
								className="form-control"
								required
                                onChange={endDateChange}
							/>
							<br />
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={calClose}
							color="secondary"
							style={{ textTransform: "none" }}
						>
							Annuler
						</Button>
						<Button
							onClick={handleSubmit}
							color="primary"
							style={{ textTransform: "none" }}
							variant="contained"
						>
							Valider
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo,
		errorMessage: state.user.error,
		loading: state.user.loading,
		userAdded: state.user.userAdded,
	};
};

export default connect(mapStateToProps)(ProfilMadecin);
