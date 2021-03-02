import React, { useEffect } from "react";
import AdminHeader from "../../common/header/adminHeader";
import { Link } from "react-router-dom";
import { fetchAll } from "../../../services/adminService";
import { connect } from "react-redux";
import { patientHomeStyle } from "../../common/styles/patientHomeStyle";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { getLocalStorage } from "../../../utils/localStorageUtil";

function AdminDashboard(props) {
	const user = getLocalStorage("user");
	const classes = patientHomeStyle();

	useEffect(() => {
		props.dispatch(fetchAll());
	}, []);

	const { users, rdv, loading, rdvT } = props;

	return (
		<div id={"wrapper"}>
			<AdminHeader />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<Backdrop className={classes.backdrop} open={loading}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<div className="main-content-head">
							<h2>{user.first_name} {user.last_name}</h2>
							<p>Bienvenue sur votre Dashboard</p>
						</div>
						<div className="profile-content">
							<div className="row">
								<div className="col-sm-3">
									<div
										className="profile-state"
										style={{ borderLeft: "4px solid red" }}
									>
										<div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img
													src="assets/images/user-icon.png"
													alt="user-icon"
												/>
											</span>
											<Link
												exact={true}
												to={{
													pathname: "/users"
												}}
											>
												<h3>
													<strong>Utilisateurs</strong>
												</h3>
											</Link>
										</div>
										<strong>
											{users ? <span>{users.length}</span> : null}

										</strong>
									</div>
								</div>
								<div className="col-sm-3">
									<div
										className="profile-state"
										style={{ borderLeft: "4px solid #1f2e54" }}
									>
										<div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img src="assets/images/rdv.png" alt="user-icon" />
											</span>
											<Link
												exact={true}
												to={{
													pathname: "/rendez-vous"
												}}
											>
												<h3>
													<strong>Demandes de RDV</strong>
												</h3>
											</Link>
										</div>
										<strong>
											{rdv ? <span>{rdv.length}</span> : <span>0</span>}
										</strong>
									</div>
								</div>
								<div className="col-sm-3">
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
											<h3>
												<strong>Téléconsultations</strong>
											</h3>
										</div>
										<strong>30</strong>
									</div>
								</div>
								<div className="col-sm-3">
									<div
										className="profile-state"
										style={{ borderLeft: "4px solid red" }}
									>
										<div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img
													src="assets/images/expertise-icon.png"
													alt="user-icon"
													style={{ width: 38 }}
												/>
											</span>
											<h3>
												<strong>Télé-expertises</strong>
											</h3>
										</div>
										<strong>11</strong>
									</div>
								</div>
							</div>
						</div>

						<div className={"row"}>
							<div className="col-md-6">
								<div className="box">
									<div className="box-head">
										<h2>
											{rdvT != null ? <span>{rdvT.length}</span> : null}{" "}
											téléconsultation(s) prévues aujourd'hui{" "}
										</h2>
									</div>
									<div className="item">
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Patient</th>
														<th>Heure</th>
														<th>Motif</th>
														<th>Médecin</th>
													</tr>
												</thead>
												<tbody>
													{rdvT != null
														? rdvT.map((res, index) => (
															<tr key={index}>
																<td>
																	{res.Patient.User.first_name}{" "}
																	{res.Patient.User.last_name}
																</td>
																<td>
																	{new Date(res.start).toLocaleTimeString()}{" "}
																</td>
																<td>{res.motif}</td>
																<td>{res.Medecin.User.first_name}</td>
															</tr>
														))
														: null}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="box">
									<div className="box-head">
										<h2>1 télé-expertise(s) prévues aujourd'hui</h2>
									</div>
									<div className="item">
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Requerant</th>
														<th>Heure</th>
														<th>Motif</th>
														<th>Requis</th>
														<th>Spécialité</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Dr Ngom Bassirou</td>
														<td>15:00</td>
														<td>Je doute sur mon mon diagnostic</td>
														<td>Dr Rachid Fall</td>
														<td>Maladies infectieuses </td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		users: state.admin.users,
		rdv: state.admin.rdv,
		rdvT: state.admin.rdvT,
		admin: state.admin,
		errorMessage: state.admin.error,
		loading: state.admin.loading,
	};
};

export default connect(mapStateToProps)(AdminDashboard);
