import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getStats} from "../../../services/medecinService";
import MedecinHeader from '../../common/header/MedecinHeader';
import {CircularProgress, Backdrop} from '@material-ui/core';
import {getLocalStorage} from "../../../utils/localStorageUtil";
import {patientHomeStyle} from '../../common/styles/patientHomeStyle';


function TeleExpertise(props) {
    const user = getLocalStorage('user')
    const classes = patientHomeStyle()

    useEffect(() => {
        props.dispatch(getStats(user.id))
    }, [])


    const {patient, rdv, consults,currentConsultations, loading} = props

    return (
        <div id="wrapper">
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <MedecinHeader type='consultation'/>
            <div className="main">

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="main-content-head">
                            <h2>{user.first_name}</h2>
                            <h5>Bienvenue sur votre Tableau de bord</h5>
                        </div>
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div
                                        className="profile-state"
                                        style={{borderLeft: "4px solid red"}}
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
                                                    pathname: "/patients",
                                                    state: {patient}
                                                }}
                                            >
                                                <h4>
                                                    <strong>Patients télé-consultés</strong>
                                                </h4>
                                            </Link>
                                        </div>
                                        <strong>
                                            {patient ? <span>{patient.length}</span> : <sapn>0</sapn>}
                                        </strong>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div
                                        className="profile-state"
                                        style={{borderLeft: "4px solid #1f2e54"}}
                                    >
                                        <div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img src="assets/images/rdv.png" alt="user-icon"/>
											</span>
                                            <Link
                                                exact={true}
                                                to={{
                                                    pathname: "/rendez-vous"
                                                }}
                                            >
                                                <h4>
                                                    <strong>Nouvelles demandes</strong>
                                                </h4>
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
                                        style={{borderLeft: "4px solid #4cba75"}}
                                    >
                                        <div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img
                                                    src="assets/images/consult-icon.png"
                                                    alt="user-icon"
                                                    style={{width: 35}}
                                                />
											</span>
                                            <h4>
                                                <strong>Téléconsultations effectuées</strong>
                                            </h4>
                                        </div>
                                        <strong>
                                            {/* {consults ? <span>{consults.length}</span> : <span>0</span>} */}
                                            9
                                        </strong>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div
                                        className="profile-state"
                                        style={{borderLeft: "4px solid red"}}
                                    >
                                        <div className="icon-box">
											<span className="icon-bg icon-bg-1">
												<img
                                                    src="assets/images/expertise-icon.png"
                                                    alt="user-icon"
                                                    style={{width: 38}}
                                                />
											</span>
                                            <h4>
                                                <strong>Téléconsultations à venir</strong>
                                            </h4>
                                        </div>
                                        <strong>3</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={"row"}>
                            <div className="col-md-10">
                                <div className="box">
                                    <div className="box-head">
                                        <h2>
                                            {currentConsultations != null ? <span>{currentConsultations.length}</span> : null}{" "}
                                            téléconsultation(s) prévues aujourd'hui{" "}
                                        </h2>
                                    </div>
                                    <div className="item">
                                        <div className="item-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>Patient</th>
                                                    <th>Téléphone</th>
                                                    <th>Heure de la téléconsultation</th>
                                                    <th>Motif</th>
                                                    <th colSpan={'3'}>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currentConsultations != null
                                                    ? currentConsultations.map((res, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {res.Patient.User.first_name}{" "}
                                                                {res.Patient.User.last_name}
                                                            </td>
                                                            <td>{res.Patient.User.phone_number}</td>
                                                            <td>
                                                                {new Date(res.start).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}{" "}
                                                            </td>
                                                            <td>{res.motif}</td>
                                                            <td><i className="icofont-video" style={{color:'green', fontSize:20}}/></td>
                                                            <td><i className="icofont-ui-delete" style={{color:'red', fontSize:20}}/></td>
                                                            <td><i className="icofont-edit-alt" style={{color:'blue', fontSize:20}}/></td>
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
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.medecin.error,
        loading: state.medecin.loading,
        patient: state.medecin.patient,
        rdv: state.medecin.rdv,
        consults: state.medecin.consultations,
        currentConsultations: state.medecin.currentConsultations,
    }
};

export default connect(mapStateToProps)(TeleExpertise)
