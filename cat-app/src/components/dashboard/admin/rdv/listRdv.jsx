import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AdminHeader from "../../../common/header/adminHeader";

function ListRdv(props) {
    const rdvs = props.location.state.rdv;
    console.log(rdvs)

	return (
		<div id={"wrapper"}>
			<AdminHeader />
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="main-content-head">
							<h2 style={{ textTransform: "none" }}>Liste des demandes de rendez-vous</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-12">
								<div className="box">
									<div className="item" style={{padding: 0}}> 
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th colSpan="2">Patient</th>
														<th>Motif</th>
														<th>Date de la consultation</th>
														<th>Status</th>
														<th colSpan="3">Médecin</th>
													</tr>
												</thead>
												<tbody>
													{rdvs.map((res, index) => (
														<tr key={index}>
															<th>
																{res.Patient.User.first_name}{" "}
																{res.Patient.User.last_name}
															</th>
															<th>{res.Patient.User.phone_number}</th>
															<th>{res.motif}</th>
															<th>
																{new Date(res.start).toLocaleDateString()} à{" "}
																{new Date(res.start).toLocaleTimeString()}
                                                            </th>
                                                            <th>{ res.status }</th>
															<th>
																{res.Medecin.User.first_name}{" "}
																{res.Medecin.User.last_name}
															</th>
															<th>{res.Medecin.User.phone_number}</th>
															<th>{res.Medecin.specialite.libelle}</th>
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
				</div>
			</div>
		</div>
	);
}

export default ListRdv