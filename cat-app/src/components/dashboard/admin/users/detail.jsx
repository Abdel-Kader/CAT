import React, { useEffect, useState } from "react";
import AdminHeader from "../../../common/header/adminHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import { getToken } from "../../../../utils/jwtUtil";
import { API_URL } from "../../../../config/config";

function DetailUser(props) {
	const user = props.location.state.res;
	// console.log(user)
	const [rdv, setRdv] = useState(null);
	useEffect(() => {
		axios
			.get(API_URL + "rendez-vous/patient?id=" + user.patients[0].id, {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				setRdv(res.data.rdv);
			})
			.catch((err) => {
				setRdv(null);
			});
	}, []);
	// console.log(rdv)
	return (
		<div id={"wrapper"}>
			<AdminHeader />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Détail de l'utilisateur</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-12">
								{user.ProfileId == 2 ? (
									<div className="col-sm-12">
										<div className="box">
											<div
												className="box-head"
												style={{
													backgroundColor: "cadetblue",
													height: 45,
													borderTopRightRadius: 10,
												}}
											>
												<span id="box-header">Informations personnelles</span>
											</div>
											<div className="item">
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Nom et prénom :
													<strong>
														{user.first_name} {user.last_name}
													</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Téléphone :<strong>{user.phone_number}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Adresse :<strong>{user.address}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Sexe :<strong>{user.patients[0].sexe}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Date et lieu de naissance :
													<strong>
														Le{" "}
														{new Date(
															user.patients[0].date_naissance
														).toLocaleDateString()}{" "}
														à {user.patients[0].lieu_naissance}
													</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Date d'inscription :
													<strong>
														{new Date(
															user.patients[0].createdAt
														).toLocaleDateString()}
													</strong>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className="col-sm-6">
										<div className="box">
											<div
												className="box-head"
												style={{
													backgroundColor: "cadetblue",
													height: 45,
													borderTopRightRadius: 10,
												}}
											>
												<span id="box-header">Informations personnelles</span>
											</div>
											<div className="item">
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Nom et prénom :
													<strong>
														{user.first_name} {user.last_name}
													</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Téléphone :<strong>{user.phone_number}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Adresse :<strong>{user.address}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Sexe :<strong>{user.patients[0].sexe}</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Date et lieu de naissance :
													<strong>
														Le{" "}
														{new Date(
															user.patients[0].date_naissance
														).toLocaleDateString()}{" "}
														à {user.patients[0].lieu_naissance}
													</strong>
												</div>
												<div
													style={{
														display: "flex",
														width: "100%",
														marginTop: 10,
														justifyContent: "space-between",
													}}
												>
													Date d'inscription :
													<strong>
														{new Date(
															user.patients[0].createdAt
														).toLocaleDateString()}
													</strong>
												</div>
											</div>
										</div>
									</div>
								)}
								<div className="col-sm-12">
									<div className="box">
										<div
											className="box-head"
											style={{
												backgroundColor: "royalblue",
												height: 45,
												borderTopRightRadius: 10,
											}}
										>
											<span id="box-header">
												Demandes de rendez-vous envoyées
											</span>
										</div>
										<div className="item">
											<br />
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Date d'envoie de la demande</th>
														<th>Heure du rendez-vous</th>
														<th>Motif</th>
														<th colSpan="2">Médecin</th>
													</tr>
												</thead>
												<tbody>
													{rdv != null
														? rdv.map((res, index) => (
																<tr key={index}>
																	<td>
																		{new Date(res.date).toLocaleDateString()}
																	</td>
																	<td>
																		{new Date(res.start).toLocaleTimeString()}{" "}
																	</td>
																	<td>{res.motif}</td>
																	<td>
																		{res.Medecin.User.first_name}{" "}
																		{res.Medecin.User.last_name}
																	</td>
																	<td>{res.Medecin.specialite.libelle}</td>
																</tr>
														  ))
														: null}
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

export default DetailUser;
