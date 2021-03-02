import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress, Backdrop } from "@material-ui/core";
import AdminHeader from "../../../common/header/adminHeader";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import { fetchRdvs } from "../../../../services/adminService";
import { patientHomeStyle } from '../../../common/styles/patientHomeStyle';

function ListRdv(props) {
	const classes = patientHomeStyle()
	//const rdvs = props.location.state.rdv; 

	useEffect(() => {
		props.dispatch(fetchRdvs());
	}, []);

	const { rdvs, loading } = props

	console.log(rdvs)
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
							<h2 style={{ textTransform: "none" }}>Liste des demandes de rendez-vous</h2>
						</div>
						<div className={"row"}>
							<div className="col-md-12">
								<div className="box">
									<div className="item" style={{ padding: 0 }}>
										<div className="item-responsive">
											<table className="table table-bordered">
												<thead>
													<tr>
														<th>Nom & Prénom du patient</th>
														<th>Nom & Prénom du médecin</th>
														<th>Date de la demande</th>
														<th>Statut</th>
														<th colSpan="2">Actions</th>
													</tr>
												</thead>
												<tbody>
													{
														rdvs && rdvs.length > 0 ?
															rdvs.map((res, index) => (
																<tr key={index}>
																	<th>
																		{res.Patient.User.first_name}{" "}
																		{res.Patient.User.last_name}
																	</th>
																	<th>
																		{res.Medecin.User.first_name}{" "}
																		{res.Medecin.User.last_name}
																	</th>
																	<th>
																		{new Date(res.createdAt).toLocaleDateString()}
																	</th>
																	<th>{res.status == 0 ? <Alert severity="info" icon={false}>En attente</Alert> : res.status == 1 ? <Alert severity="success" icon={false}>Accepté</Alert> : res.status == 2 ? <Alert severity="error" icon={false}>Rejeté</Alert> : null}</th>
																	<td>
																		<i
																			className="icofont-eye"
																			style={{ color: "blue", fontSize: 20 }}
																		/>
																	</td>

																	<td>
																		<i
																			className="icofont-ui-delete"
																			style={{ color: "red", fontSize: 20 }}
																		/>
																	</td>
																</tr>
															))
															: null
													}
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
		rdvs: state.admin.rdvs,
		errorMessage: state.admin.error,
		loading: state.admin.loading,
	};
};

export default connect(mapStateToProps)(ListRdv)