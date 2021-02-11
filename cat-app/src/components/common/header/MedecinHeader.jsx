import React, { useEffect } from "react";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import { getLocalStorage } from "../../../utils/localStorageUtil";
import {logout} from '../../../services/authService'
import { connect } from 'react-redux'

function MedecinHeader(props) {
	const user = getLocalStorage("user");

	useEffect(() => {
		if (user != null) {
			if (user.profile === 2) <Redirect to="home" />;
		}
	});

	const logOut = () => {
		props.dispatch(logout());
		props.history.push('/')
	};

	return (
		<>
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="brand">
					<Link to={"/dashboard"} exact={"true"}>
						<span>C.A.T</span>
					</Link>
				</div>
				<div className="container-fluid">
					<div className="navbar-btn">
						<button type="button" className="btn-toggle-fullwidth">
							<i className="lnr lnr-arrow-left-circle" />
						</button>
					</div>

					<div className="navbar-menu">
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown">
									<img
										src="assets/images/users/doctor.webp"
										className="img-circle"
										alt="parson-img"
									/>
									<i className="icon-submenu fa fa-angle-down" />
								</a>
								<ul className="dropdown-menu">
									<li>
										<a href="#" onClick={()=> {props.history.push('profile-medecin')}}>
											<i className="lnr lnr-user" /> <span>Mon profile</span>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="lnr lnr-envelope" />{" "}
											<span>Notifications</span>
										</a>
									</li>
									
									<li>
										<a href="#" onClick={logOut}>
											<i className="lnr lnr-exit" /> <span>Me déconnecter</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div id="sidebar-nav" className="sidebar">
				<div className="sidebar-scroll">
					<nav>
						<ul className="nav">
							{props.type == "consultation" ? (
								<>
									<li>
										<NavLink
											to="/tele-consultation"
											activeClassName="active"
											exact={true}
										>
										<i className="icofont-dashboard-web" style={{fontSize:18, marginLeft:20}}/><span> Dashboard</span>
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/mes-demandes"
											activeClassName="active"
											exact={true}
										>
										<i class="icofont-calendar" style={{fontSize:18, marginLeft:20}}/><span>Demandes reçues</span>
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/mes-consultations"
											activeClassName="active"
											exact={true}
										>
										<i class="icofont-monitor" style={{fontSize:18, marginLeft:20}}/><span>Mes consultations</span>
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li>
										<NavLink
											to="/tele-expertise"
											activeClassName="active"
											exact={true}
										>
										<i className="icofont-dashboard-web" style={{fontSize:18, marginLeft:20}}/><span>Dashboard</span>
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/demande-expertise"
											activeClassName="active"
											exact={true}
										>
										<i class="icofont-monitor" style={{fontSize:18, marginLeft:20}}/><span>Demander un avis</span>
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/expertise-received"
											activeClassName="active"
											exact={true}
										>
										<i class="icofont-patient-file" style={{fontSize:18, marginLeft:20}}/><span>Demandes reçues</span>
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/expertise-send"
											activeClassName="active"
											exact={true}
										>
										<i class="icofont-archive" style={{fontSize:18, marginLeft:20}}/><span>Demandes envoyées</span>
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
}
const mapStateToProps = (state) => {
    return {
      user: state.login.user,
      errorMessage: state.login.error,
      loading: state.login.loading,
    }
};

export default connect(mapStateToProps)(withRouter(MedecinHeader));
