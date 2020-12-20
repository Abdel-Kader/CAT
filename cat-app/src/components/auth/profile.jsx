import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { me, updateProfile } from "../../services/userService";
import InputMask from "react-input-mask";
import Header from "../common/header";
import Swal from "sweetalert2";
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
	Breadcrumbs,
	Link,
	Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { patientHomeStyle } from "../common/styles/patientHomeStyle";

function ProfilePatient(props) {
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
	const classes = patientHomeStyle();
	const { loading, userInfo, errorMessage, userAdded } = props;
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		props.dispatch(me(2));
	}, []);

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
			alert("Veuillez remplir les champs obligatoires !")
		}
	};

	return (
		<>
			<Header />
			<div
				style={{
					marginTop: 67,
					backgroundColor: "#ccd",
					height: 40,
					paddingTop: 7,
					paddingLeft: 50,
				}}
			>
				<Breadcrumbs aria-label="breadcrumb">
					<Link
						color="inherit"
						style={{ cursor: "pointer" }}
						onClick={() => props.history.push("home")}
					>
						Acceuil
					</Link>

					<Typography color="textPrimary">Profile</Typography>
				</Breadcrumbs>
			</div>
			<Grid container style={{ marginTop: 30, marginLeft: 20 }} spacing="3">
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Grid item xs="4">
					<div class="profile-state" style={{ paddingLeft: 0 }}>
						<div
							class="icon-box"
							style={{
								backgroundColor: "#4cba75",
								textAlign: "center",
								display: "grid",
							}}
						>
							<h2 style={{ fontWeight: "bold" }}>Informations personnelles</h2>
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
									Date et lieu de naissance :{" "}
									{new Date(userInfo.date_naissance).toLocaleDateString()} à{" "}
									{userInfo.lieu_naissance}
								</h4>
								<h4>Sexe : {userInfo.sexe} </h4>
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
							Modifier <i class="icofont-edit-alt" style={{ marginLeft: 15 }} />
						</Button>
						<br />
						<br />
					</div>
				</Grid>
				<Grid item xs="3">
					<div
						className="profile-state"
						style={{ borderLeft: "4px solid #4cba75" }}
					>
						<div className="icon-box">
							<span className="icon-bg icon-bg-1">
								<img
									src="assets/images/consult-icon.png"
									alt="user-icon"
									style={{ width: 35 }}
								/>
							</span>
							<h4>
								<strong>Demandes en cours</strong>
							</h4>
						</div>
						<strong>
							{/* {consults ? <span>{consults.length}</span> : <span>0</span>} */}
							9
						</strong>
					</div>
				</Grid>
				<Grid item xs="3">
					<div
						className="profile-state"
						style={{ borderLeft: "4px solid #4cba75" }}
					>
						<div className="icon-box">
							<span className="icon-bg icon-bg-1">
								<img
									src="assets/images/consult-icon.png"
									alt="user-icon"
									style={{ width: 35 }}
								/>
							</span>
							<h4>
								<strong>Téléconsultations effectuées</strong>
							</h4>
						</div>
						<strong>
							{/* {consults ? <span>{consults.length}</span> : <span>0</span>} */}
							9
						</strong>
					</div>
				</Grid>
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
			</Grid>
		</>
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

export default connect(mapStateToProps)(ProfilePatient);
