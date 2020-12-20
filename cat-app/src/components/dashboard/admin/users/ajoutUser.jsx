import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
    Container,
	TextField,
	Grid,
	Paper,
	Button,
	CircularProgress,
	FormHelperText,
	FormControl,
	InputLabel,
	Select,
	Backdrop,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import { addUser } from "../../../../services/userService";
import AdminHeader from "../../../common/header/adminHeader";
import { loginStyle } from "../../../common/styles/loginStyle";
import { getSpecialites } from "../../../../services/specialiteService";

function AjoutUser(props) {
	const validEmail = new RegExp(
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	);
	const [emailIncorrect, setEmailIncorrect] = React.useState(false);
	const [firstNameIncorrect, setfirstNameIncorrect] = React.useState(false);
	const [lastNameIncorrect, setLastNameIncorrect] = React.useState(false);
	const [phoneIncorrect, setPhoneIncorrect] = React.useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [selectedSpecialite, setSelectedSpecialite] = useState([]);
	const [selectedService, setSelectedService] = useState([]);

	const emailChange = function (e) {
		setEmail(e.target.value);
		if (!validEmail.test(email)) {
			setEmailIncorrect(true);
		} else {
			setEmailIncorrect(false);
		}
	};

	const phoneChange = function (e) {
		setPhoneNumber(e.target.value);
		phoneNumber ? setPhoneIncorrect(false) : setPhoneIncorrect(true);
    };
    
    const addressChange = function (e) {
        setAddress(e.target.value)
    }

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

	const specialiteChange = function (e) {
		setSelectedSpecialite(e.target.value);
    };
    
    const serviceChange = function (e) {
		setSelectedService(e.target.value);
	};

	const classes = loginStyle();

	useEffect(() => {
		props.dispatch(getSpecialites());
	}, []);

	const { specialites, loading, services, loader, error, userAdded } = props;
    const submit = (e) => {
        e.preventDefault()
        if (firstName && lastName && phoneNumber && selectedService && selectedSpecialite) {
            
            const Nuser = {
                firstName,
                lastName,
                phoneNumber,
                email,
                address,
                specialite : selectedSpecialite,
                service : selectedService,
                password: "12345"
            }
            props.dispatch(addUser(Nuser))
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Veuillez remplir les champs obligatoires !',
                showConfirmButton: true
            })
        }
    } 
    
    useEffect(() => {
        if (userAdded) {
            Swal.fire({
                icon: 'success',
                title: 'Médecin créé avec succès',
                showConfirmButton: true
            }).then((res) => {
                props.history.push('admin')
                // window.location.reload()
            })
        }
        else if (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: true
            })
        }
        
    },[userAdded])
    
	return (
		<div id={"wrapper"}>
            <AdminHeader />
            
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<Backdrop className={classes.backdrop} open={loading}>
							<CircularProgress color="inherit" />
                        </Backdrop>
                        <Backdrop className={classes.backdrop} open={loader}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<Container>
							<Grid
								className={classes.root}
								container
								component="main"
								justify={"center"}
							>
								<Grid
									item
									xs={12}
									sm={8}
									md={8}
									component={Paper}
									elevation={6}
									square
								>
									<div className={classes.paper}>
										<h3 className={classes.title}>Ajouter un médecin</h3>
										<form name="form" className={classes.form} role="form">
											<Grid container direction="row" justify="space-between">
												<legend>Informations personnelles</legend>
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
													/>
												</Grid>
												<Grid xs={6} item className={classes.gridFull}>
													<TextField
														variant="outlined"
														margin="normal"
														required
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
													>
														{() => (
															<TextField
																variant="outlined"
																margin="normal"
																required
																error={phoneIncorrect}
																helperText={
																	phoneIncorrect
																		? "Ce champ est obligatoire "
																		: null
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
														type="email"
														fullWidth
														onChange={emailChange}
													/>
												</Grid>
												<Grid xs={12} item>
													<TextField
														variant="outlined"
														margin="normal"
														label="Adresse"
														fullWidth
														onChange={addressChange}
													/>
												</Grid>
											</Grid>
											<br />
											<br />
											<Grid container direction="row" justify="space-between">
												<legend>Informations Professionnelles</legend>
												<Grid xs={6} item className={classes.gridFull}>
													<FormControl
														variant="outlined"
														className={classes.formControl}
													>
														<InputLabel htmlFor="outlined-age-native-simple">
															Spécialité
														</InputLabel>
														<Select
															native
															onChange={specialiteChange}
															label="Spécialité"
															autoWidth={true}
															fullWidth
															required
															inputProps={{
																name: "specialite",
																id: "outlined-age-native-simple",
															}}
														>
															<option aria-label="None" value="" />
															{specialites.map((specialite) => (
																<option value={specialite.id}>
																	{specialite.libelle}
																</option>
															))}
														</Select>
														<FormHelperText>
															Champ obligatoire
														</FormHelperText>
													</FormControl>
												</Grid>
												<Grid xs={6} item className={classes.gridFull}>
                                                <FormControl
														variant="outlined"
														className={classes.formControl}
													>
														<InputLabel htmlFor="outlined-age-native-simple">
															Service
														</InputLabel>
														<Select
															native
															onChange={serviceChange}
															label="Service"
															autoWidth={true}
															fullWidth
															required
															inputProps={{
																name: "service",
																id: "outlined-age-native-simple",
															}}
														>
															<option aria-label="None" value="" />
															{services.map((service) => (
																<option value={service.id}>
																	{service.libelle}
																</option>
															))}
														</Select>
														<FormHelperText>
															Champ obligatoire
														</FormHelperText>
													</FormControl>
												</Grid>
                                            </Grid>
                                            <br/>
											<Button
												type="submit"
                                                fullWidth
                                                onClick={submit}
												variant="contained"
												className={classes.submit}
											>
												Ajouter
											</Button>
										</form>
									</div>
								</Grid>
							</Grid>
						</Container>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		specialites: state.specialite.specialites,
		services: state.specialite.services,
		errorMessage: state.specialite.error,
        loading: state.specialite.loading,
        loader: state.user.loading,
        error: state.user.error,
        user: state.user.newUser,
        userAdded: state.user.userAdded,
	};
};

export default connect(mapStateToProps)(AjoutUser);
