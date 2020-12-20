import React from "react";
import { Link } from "react-router-dom";
import MedecinHeader from "../../../common/header/MedecinHeader";

function ListPatient(props) {
	const patients = props.location.state.patient;

	return (
		<div id="wrapper">
			<MedecinHeader type="consultation" />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid" style={{ backgroundColor: "#fff" }}>
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Liste de vos patients</h2>
						</div>
						<div className="item">
							<div className="item-responsive">
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Nom et prénom</th>
											<th>Téléphone</th>
											<th>Genre</th>
											<th>Date de naissance</th>
											<th>consultations</th>
											<th>Dossier</th>
											<th>Suivi</th>
										</tr>
									</thead>
									<tbody>
										{patients.map((res, index) => (
											<tr key={index}>
												<td>
													{res.Patient.User.first_name}{" "}
													{res.Patient.User.last_name}
												</td>
												<td>{res.Patient.User.phone_number}</td>
												<td>{res.Patient.sexe}</td>
												<td>
													{new Date(
														res.Patient.date_naissance
													).toLocaleDateString()}
												</td>
												<td>
													<Link
														exact={true}
														to={{
															pathname: "/detail-patient",
															state: { res },
														}}
													>
														<i
															className="icofont-eye-alt"
															style={{ color: "#1f2e54", fontSize: 20 }}
														/>
													</Link>
												</td>
												<td>
													<Link
														exact={true}
														to={{
															pathname: "/dossier-patient",
															state: { res: res.Patient, type:'medecin' },
														}}
													>
														<i
															className="icofont-ui-folder"
															style={{ color: "green", fontSize: 20 }}
														/>
													</Link>
												</td>
												<td>
													<Link
														exact={true}
														to={{
															pathname: "/detail-user",
															state: { res },
														}}
													>
														<i
															className="icofont-list"
															style={{ color: "#ff5e3a", fontSize: 20 }}
														/>
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListPatient;
