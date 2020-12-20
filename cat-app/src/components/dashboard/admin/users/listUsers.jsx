import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AdminHeader from "../../../common/header/adminHeader";

function ListUser(props) {
	const users = props.location.state.users;
	// console.log(users);
	return (
		<div id={"wrapper"}>
			<AdminHeader />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Liste des utilisateurs</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-9">
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
														<th colSpan="3">Actions</th>
													</tr>
												</thead>
												<tbody>
													{users.map((res, index) =>
														res.ProfileId == 2 ? (
															<tr key={index}>
																<td>
																	{res.first_name} {res.last_name}
																</td>
																<td>{res.phone_number}</td>
																<td>{res.patients[0].sexe}</td>
																<td>
																	<Link
																		exact={true}
																		to={{
																			pathname: "/detail-user",
																			state: { res },
																		}}
																	>
																		<i
																			data-feather="eye"
																			style={{ color: "blue", width: 18 }}
																		/>
																	</Link>
																</td>
																<td>
																	<i
																		data-feather="edit-3"
																		style={{ color: "#4cba75", width: 18 }}
																	/>
																</td>
																<td>
																	<i
																		data-feather="trash-2"
																		style={{ color: "red", width: 18 }}
																	/>
																</td>
															</tr>
														) : null
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>

							<div className="col-md-3">
								<div className="box">
									<div className="box-head">
										<h2>Patients</h2>
										<div className="item">
                                            <div className="item-responsive">
                                                Nombre :
                                                {

                                                }
                                            </div>
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
													{users.map((res, index) =>
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
																		data-feather="eye"
																		style={{ color: "blue", width: 18 }}
																	/>
																</td>
																<td>
																	<i
																		data-feather="edit-3"
																		style={{ color: "#4cba75", width: 18 }}
																	/>
																</td>
																<td>
																	<i
																		data-feather="trash-2"
																		style={{ color: "red", width: 18 }}
																	/>
																</td>
															</tr>
														) : null
													)}
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

export default ListUser;
