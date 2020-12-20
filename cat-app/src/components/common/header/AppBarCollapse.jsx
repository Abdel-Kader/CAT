import React, {useEffect} from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ButtonCollapsed from "./ButtonCollapsed";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../../../utils/jwtUtil";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getLocalStorage } from "../../../utils/localStorageUtil";
import {logout} from '../../../services/authService'
import { me } from "../../../services/userService";
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		right: 0,
	},
	buttonBar: {
		[theme.breakpoints.down("xs")]: {
			display: "none",
		},
		margin: "10px",
		paddingLeft: "16px",
		right: 0,
		position: "relative",
		width: "100%",
		background: "transparent",
	},
}));

function AppBarCollapse(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorRdv, setAnchorRdv] = React.useState(null);
	const user = getLocalStorage("user");

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget); 
	};

	useEffect(() => {
		props.dispatch(me(2));
	}, []);

	const handleRdvClick = (event) => {
		setAnchorRdv(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setAnchorRdv(null);
	};

	const logOut = () => {
		props.dispatch(logout());
		props.history.push('/')
	};
	//() => { props.history.push('list-consultations') }
	return (
		<div className={classes.root}>
			<ButtonCollapsed />
			<div className={classes.buttonBar} id="appbar-collapse">
				{isAuthenticated() ? (
					<>
						<Button
							aria-controls="rdv-menu"
							aria-haspopup="true"
							color="inherit"
							style={{ textTransform: "none" }}
							onClick={() => {
								props.history.push("home");
							}}
						>
							Accueil
							{/* <i className="icofont-rounded-down" style={{ marginLeft: 5, fontSize: 15 }} /> */}
						</Button>
						<Button
							aria-controls="rdv-menu"
							aria-haspopup="true"
							color="inherit"
							style={{ textTransform: "none" }}
							onClick={() => {
								props.history.push("mes-rendez-vous", "attente");
							}}
						>
							<i
								className="icofont-tasks"
								style={{ marginRight: 5, fontSize: 15 }}
							/>
							Mes rendez-vous
							{/* <i className="icofont-rounded-down" style={{ marginLeft: 5, fontSize: 15 }} /> */}
						</Button>
						<Button
							aria-controls="rdv-menu"
							aria-haspopup="true"
							color="inherit"
							style={{ textTransform: "none" }}
							onClick={handleRdvClick}
						>
							<i
								className="icofont-tasks"
								style={{ marginRight: 5, fontSize: 15 }}
							/>
							Mes consultations
							<i
								className="icofont-rounded-down"
								style={{ marginLeft: 5, fontSize: 15 }}
							/>
						</Button>
						<Menu
							id="rdv-menu"
							style={{ marginTop: 40 }}
							elevation={3}
							anchorEl={anchorRdv}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							open={Boolean(anchorRdv)}
							onClose={handleClose}
						>
							<MenuItem
								onClick={() => {
									props.history.push("list-consultations", "attente");
								}}
								style={{ fontSize: 15 }}
							>
								<i
									className="icofont-wall-clock"
									style={{ marginRight: 7, fontSize: 17, fontWeight: "bold" }}
								/>{" "}
								A venir
							</MenuItem>
							<MenuItem
								onClick={() => {
									props.history.push("historique-consultations");
								}}
								style={{ fontSize: 15 }}
							>
								<i
									className="icofont-history"
									style={{ marginRight: 7, fontSize: 17, fontWeight: "bold" }}
								/>{" "}
								Historique
							</MenuItem>
						</Menu>

						<Button
							color="inherit"
							onClick={() => {
								props.history.push("dossier-patient", {res: props.userInfo, type:'patient'});
							}}
							style={{ textTransform: "none" }}
						>
							{" "}
							<i
								className="icofont-list"
								style={{ marginRight: 5, fontSize: 15 }}
							/>{" "}
							Mon dossier{" "}
						</Button>

						<Button
							aria-controls="simple-menu"
							aria-haspopup="true"
							color="inherit"
							style={{
								textTransform: "none",
								fontWeight: "bold",
								fontSize: 13,
							}}
							onClick={handleClick}
						>
							{user.first_name} {user.last_name}
							<i
								className="icofont-rounded-down"
								style={{ marginLeft: 5, fontSize: 15 }}
							/>
						</Button>
						<Menu
							id="simple-menu"
							style={{ marginTop: 40 }}
							elevation={3}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={()=> {props.history.push('profile-patient')}} style={{ fontSize: 15 }}>
								<PersonIcon style={{ marginRight: 10 }} /> Mon profile
							</MenuItem>
							<MenuItem style={{ fontSize: 15 }} onClick={logOut}>
								{" "}
								<ExitToAppIcon style={{ marginRight: 10 }} /> Se déconnecter
							</MenuItem>
						</Menu>
					</>
				) : (
					<>
						<Button color="inherit" style={{ textTransform: "none" }}>
							<i
								className="icofont-question-circle"
								style={{ marginRight: 5 }}
							/>
							Besoin d'aide ?
						</Button>
						<Button
							color="inherit"
							style={{ textTransform: "none" }}
							onClick={() => {
								props.history.push("login");
							}}
						>
							<i className="icofont-user-male" style={{ marginRight: 5 }} /> Se
							connecter
						</Button>
					</>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
      user: state.login.user,
	  userInfo: state.user.userInfo,
      errorMessage: state.login.error,
      loading: state.login.loading,
    }
};


export default connect(mapStateToProps)(withRouter(AppBarCollapse));
