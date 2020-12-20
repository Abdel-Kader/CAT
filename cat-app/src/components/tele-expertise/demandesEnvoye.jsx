import React, {useEffect } from 'react'
import AdminHeader from '../common/header/MedecinHeader'
import { connect } from 'react-redux';
import { getLocalStorage } from "../../utils/localStorageUtil";
import { patientHomeStyle } from '../common/styles/patientHomeStyle';
import {
    CircularProgress, Backdrop
} from "@material-ui/core";
import { getDemandes } from '../../services/demandeAvisService'
import ListExpertise from "../../utils/listExpertise";

function DemandesEnvoye(props) {
    const user = getLocalStorage('user')
    const classes = patientHomeStyle();

    useEffect(()=> {
        props.dispatch(getDemandes(user.id,'requerant'))
    }, [])

    const { avis, loading, errorMessage } = props

    return (
        <div id="wrapper">
            <AdminHeader type ='expertise'/>
            <div className="main">
                <div className="main-content">
                    <div className="row">
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <ListExpertise avis={avis} title={"Les demandes envoyées"} type={'requerant'}/>
                    </div>
                </div>
            </div>
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        avis: state.avis.avis,
        errorMessage: state.avis.error,
        loading: state.avis.loading,
    }
};

export default connect(mapStateToProps)(DemandesEnvoye);
