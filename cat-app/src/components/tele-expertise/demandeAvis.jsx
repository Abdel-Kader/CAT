import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import {Alert, AlertTitle} from '@material-ui/lab';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AdminHeader from '../common/header/MedecinHeader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Grid, Backdrop, CircularProgress, Button } from '@material-ui/core';
import { patientHomeStyle } from '../common/styles/patientHomeStyle';
import { getMedecinsBySpecialite } from '../../services/specialiteService';

import $ from 'jquery'; 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


function DemandeAvis(props) {
    
    const classes = patientHomeStyle()
    
    useEffect(() => {
        $(document).ready(function () {
            $('#specialite').DataTable( {
                
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
                }
            });
        });
        props.dispatch(getMedecinsBySpecialite())
    }, [])
    
    const { specialites, loading, errorMessage } = props
    
    // console.log(specialites)

    return (
        <div id="wrapper">
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <AdminHeader type='expertise'/>
            <div className="main">
			    <div className="main-content">
                    <div className="row">
                        <Grid container justify='center' style={{marginTop:30}}>
                        <h2>Liste de médecins par spécialité</h2>
                            <Grid item xs={10}>
                            {specialites.length > 0 ?
                            specialites.map((specialite) =>
                                specialite.medecins.length > 0 ?
                                <Accordion style={{marginTop:20}} key={specialite.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>{specialite.libelle == 'Généraliste'? specialite.libelle = 'Médecin Généraliste': specialite.libelle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <table id="specialite" className="display table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nom du médecin</th>
                                                <th>Téléphone</th>
                                                <th>Email</th>
                                                <th>Service</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                specialite.medecins.map((medecin, index) => (
                                                    <tr key={index}>
                                                        <td><strong>Dr {medecin.User.first_name} {medecin.User.last_name}</strong></td>       
                                                        <td><h5>{medecin.User.phone_number}</h5></td>       
                                                        <td><h5>{medecin.User.email}</h5></td>
                                                        <td><h5>{medecin.service.libelle}</h5></td>
                                                        <td><Button style={{textTransform:'none', color:'#4cba75'}} onClick={()=> {props.history.push('detail-demande-expertise',medecin)}}>Envoyer une demande</Button></td>
                                                    </tr> 
                                            
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </AccordionDetails>
                            
                                </Accordion>
                             : null
                            )
                            :
                            <Grid container justify="center" className={classes.errorContainer}>
                                {!loading ? 
                                    <Grid item xs={8}>
                                        <Alert severity="info">
                                            <AlertTitle>Message</AlertTitle>
                                            <strong>Aucun médecin disponible pour la semaine !</strong>
                                        </Alert>                
                                    </Grid>
                                : null}
                            </Grid>
                        }
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


const mapStateToProps = (state) => {
    return {
      specialites: state.specialite.specialites,
      errorMessage: state.specialite.error,
      loading: state.specialite.loading,
    }
};

export default connect(mapStateToProps)(DemandeAvis)
