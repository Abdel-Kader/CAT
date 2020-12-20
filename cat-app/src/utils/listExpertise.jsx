import { Chip, Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { patientHomeStyle } from "../components/common/styles/patientHomeStyle";
import Alert from "@material-ui/lab/Alert";

function ListExpertise(props) {
	const classes = patientHomeStyle();
	function handleDetail(res) {
		props.history.push("detail-expertise", {
			res,
			type: props.type,
		});
	}

	return props.avis && props.avis.length > 0 ? (
		<div className="col-md-12">
			<div className="col-md-12">
				<h2>{props.title}</h2>
			</div>
			<div className="col-md-6">
				<div className="col-md-12">
					<label>En cours</label>
				</div>
				{props.avis
					? props.avis.map((res, index) =>
							res.statut === 0 || res.statut === 1 ? (
								<div className="col-md-12" key={index}>
									<div className="profile-state">
										{res.statut === 0 ? (
											<Chip
												label="En attente de réponse"
												color="secondary"
												size="small"
											/>
										) : (
											<Chip label="En cours" color="primary" size="small" />
										)}

										<div className="icon-box" style={{ display: "grid" }}>
											{props.type === "requis" ? (
												<h2>{res.medRequerant.specialite.libelle}</h2>
											) : (
												<h2>{res.medRequis.specialite.libelle}</h2>
											)}
											<span style={{ textAlign: "justify" }}>
												{res.commentaire}
											</span>
										</div>
										<br />
										<div className="icon-box">
											<img
												src="assets/images/users/doctor.webp"
												style={{ width: 60, borderRadius: 50, height: 60 }}
												alt="user-icon"
											/>
											<div>
												{props.type === "requis" ? (
													<h2>
														De Dr {res.medRequerant.User.first_name}{" "}
														{res.medRequerant.User.last_name}
													</h2>
												) : (
													<h2>
														A Dr {res.medRequis.User.first_name}{" "}
														{res.medRequis.User.last_name}
													</h2>
												)}
												<p style={{ marginLeft: 10, fontWeight: "bold" }}>
													Envoyé le{" "}
													{new Date(res.createdAt).toLocaleDateString()}
												</p>
											</div>
											<button
												className={classes.detail_btn}
												onClick={() => {
													handleDetail(res);
												}}
											>
												Detail
											</button>
										</div>
									</div>
									{/* <Alert variant="filled" severity="warning">
                                        <span style={{ fontSize: 14 }}>
                                            Vous n'avez aucune demande en cours !
                                        </span>
                                    </Alert> */}
								</div>
							) : null
					  )
					: null}
			</div>
			<div className="col-md-6">
				<div className="col-md-12">
					<label>Terminées</label>
				</div>
				{props.avis ? (
					props.avis.map((res, index) =>
						res.statut === 2 || res.statut === 3 ? (
							<div className="col-md-12" key={index}>
								<div className="profile-state">
									{res.statut === 2 ? (
										<Chip
											label="Terminé"
											style={{ backgroundColor: "green", color: "#fff" }}
											size="small"
										/>
									) : (
										<Chip label="Rejeté" color="secondary" size="small" />
									)}
									<div className="icon-box" style={{ display: "grid" }}>
										{props.type === "requis" ? (
											<h2>{res.medRequerant.specialite.libelle}</h2>
										) : (
											<h2>{res.medRequis.specialite.libelle}</h2>
										)}
										<span style={{ textAlign: "justify" }}>
											{res.commentaire}
										</span>
									</div>
									<br />
									<div className="icon-box">
										<img
											src="assets/images/users/doctor.webp"
											style={{ width: 60, borderRadius: 50, height: 60 }}
											alt="user-icon"
										/>
										<div>
											{props.type === "requis" ? (
												<h2>
													De Dr {res.medRequerant.User.first_name}{" "}
													{res.medRequerant.User.last_name}
												</h2>
											) : (
												<h2>
													A Dr {res.medRequis.User.first_name}{" "}
													{res.medRequis.User.last_name}
												</h2>
											)}
											<p style={{ marginLeft: 10, fontWeight: "bold" }}>
												Envoyé le {new Date(res.createdAt).toLocaleDateString()}
											</p>
										</div>
										<button
											className={classes.detail_btn}
											onClick={() => {
												handleDetail(res);
											}}
										>
											Detail
										</button>
									</div>
								</div>
								{/* <Alert variant="filled" severity="warning">
                                        <span style={{ fontSize: 14 }}>
                                            Vous n'avez aucune demande terminée !
                                        </span>
                                    </Alert> */}
							</div>
						) : null
					)
				) : (
					<Grid
						justify="center"
						container
						style={{ display: "flow-root", textAlign: "center", marginTop: 50 }}
						alignContent="center"
						align="center"
					>
						<img
							src="assets/images/notFound.png"
							alt="not found"
							style={{ width: 100 }}
						/>
						<br />
						<br />
						<h4>Vous n'avez aucune demande en cours !</h4>
					</Grid>
				)}
			</div>
		</div>
	) : (
		<Grid
			justify="center"
			container
			style={{ display: "flow-root", textAlign: "center", marginTop: 50 }}
			alignContent="center"
			align="center"
		>
			<img
				src="assets/images/notFound.png"
				alt="not found"
				style={{ width: 100 }}
			/>
			<br />
			<br />
			<h4>Vous n'avez aucune demande en cours !</h4>
			<br />
		</Grid>
	);
}

export default withRouter(ListExpertise);
