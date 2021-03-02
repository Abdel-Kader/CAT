import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Backdrop } from "@material-ui/core";
import AdminHeader from "../../../common/header/adminHeader";
import { connect } from "react-redux";
import { fetchUsers } from "../../../../services/adminService";
import { patientHomeStyle } from '../../../common/styles/patientHomeStyle';

function ListUser(props) {
	const classes = patientHomeStyle()

	useEffect(() => {
		props.dispatch(fetchUsers());
	}, []);

	const { users, loading } = props

	console.log(props.users)
	return (
		<div id={"wrapper"}>
			<AdminHeader />
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Liste des utilisateurs</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-11">
								<div className="box">
									<div className="box-head">
										<h2>Patients</h2>
									</div>
									<div className="item">
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Nom et prénom</th>
														<th>Téléphone</th>
														<th>Genre</th>
														<th>Date et lieu de naissance</th>
														<th colSpan="3">Actions</th>
													</tr>
												</thead>
												<tbody>
													{
														users&&users.length > 0 ?
															users.map((res, index) =>
																res.ProfileId==2 ?(
																	<tr key={index}>
																		<td>
																			{res.first_name} {res.last_name}
																		</td>
																		<td>{res.phone_number}</td>
																		<td>{res.patients[0].sexe}</td>
																		<td>{new Date(res.patients[0].date_naissance).toLocaleDateString()} à { res.patients[0].lieu_naissance }</td>
																		<td>
																			<Link
																				exact={true}
																				to={{
																					pathname: "/detail-user",
																					state: { res },
																				}}
																			>
																				<i
																					className="icofont-eye"
																					style={{ color: "blue", fontSize: 20 }}
																				/>
																			</Link>
																		</td>
																		<td>
																			<i
																				className="icofont-edit-alt"
																				style={{ color: "#4cba75", fontSize: 20 }}
																			/>
																		</td>
																		<td>
																			<i
																				className="icofont-ui-delete"
																				style={{ color: "red", fontSize: 20 }}
																			/>
																		</td>
																	</tr>
																) : null
															) : null}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={"row"}>
							<div className="col-md-11">
								<div className="box">
									<div className="box-head">
										<h2>Médecins</h2>
										<Button
											variant={"contained"}
											color={"primary"}
											style={{ float: "right", textTransform: "none" }}
											onClick={() => {
												props.history.push("add-user");
											}}
										>
											Ajouter
										</Button>
									</div>
									<div className="item">
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Nom et prénom</th>
														<th>Téléphone</th>
														<th>Spécialité</th>
														<th>Service</th>
														<th colSpan="3">Détail</th>
													</tr>
												</thead>
												<tbody>
													{
														users&& users.length > 0 ?
															users.map((res, index) =>
																res.ProfileId == 1 ? (
																	<tr key={index}>
																		<td>
																			{res.first_name} {res.last_name}
																		</td>
																		<td>{res.phone_number}</td>
																		<td>{res.medecins[0].specialite.libelle}</td>
																		<td>{res.medecins[0].service.libelle}</td>
																		<td>
																			<i
																				className="icofont-eye"
																				style={{ color: "blue", fontSize: 20 }}
																			/>
																		</td>
																		<td>
																			<i
																				className="icofont-edit-alt"
																				style={{ color: "#4cba75", fontSize: 20 }}
																			/>
																		</td>
																		<td>
																			<i
																				className="icofont-ui-delete"
																				style={{ color: "red", fontSize: 20 }}
																			/>
																		</td>
																	</tr>
																) : null
															) : null}
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
		errorMessage: state.admin.error,
		loading: state.admin.loading,
	};
};

export default connect(mapStateToProps)(ListUser);
