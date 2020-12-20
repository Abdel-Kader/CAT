import React, { useState, useEffect } from 'react'

import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AdminHeader from '../common/header/MedecinHeader';
import { updateDemande } from '../../services/rdvService';
import { detailMedecinStyles } from '../common/styles/detailMedecin';
import { Grid, Paper, Button, CircularProgress, Backdrop } from "@material-ui/core";


function DetailDdemande(props) {

    const [data, setData] = useState(null)
    const classes = detailMedecinStyles();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    

    useEffect(async () => {
        const params = JSON.parse(props.location.state)
       setData(params)
    }, [])

    const { loader, rdv } = props


    function handleAction(id, status)
    {
        if (status == 2) 
        {
            Swal.fire({
                title: 'Attention?',
                text: "Voulez-vous vraiment rejeter cette demande ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer !',
                cancelButtonText: 'Non, fermer !',
            }).then((result) => {
                if (result.value) {
                    props.dispatch(updateDemande(id,status))
                }
            })
        }
        else {
            props.dispatch(updateDemande(id,status))
        }
    }

    if (rdv)
    {
        setTimeout(() => {
            props.history.push('tele-consultation')
          }, 1500)
    }
    return (
        <div id="wrapper">
            <AdminHeader type='consultation'/>
            <div className="main">
			    <div className="main-content">
                    <div className="row">
                        <Backdrop className={classes.backdrop} open={loader}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Grid container className={classes.root} justify='center'>
                            <Grid item xs={7}>
                                <Paper className={classes.paper2}>
                                    <Alert variant="filled" severity="info" style={{backgroundColor:'rgb(76, 186, 117)'}}>
                                        <span style={{ fontSize: 14 }}>
                                            Détail de la demande de rendez-vous pour une téléconsultation
                                        </span>
                                    </Alert>
                                    <div className={classes.paper}>
                                        {data ?  
                                            <div>
                                                <h4 style={{ fontWeight: 'bold' }}>Patient</h4>
                                                <div style={{border: '1px solid', padding:15}}>
                                                    <p><strong>{data.extendedProps.Patient.User.first_name} {data.extendedProps.Patient.User.last_name}</strong></p>
                                                    <br/>
                                                    <p><strong>Téléphone : </strong>{data.extendedProps.Patient.User.phone_number} </p>
                                                    <br/>
                                                    <p><strong>Date de naissance : </strong>{new Date(data.extendedProps.Patient.date_naissance).toLocaleDateString()} </p>
                                                </div>
                                                
                                                <br/>
                                                <h4 style={{ fontWeight: 'bold' }}>Motif du rendez-vous</h4>
                                                <p style={{ textAlign:'justify' }}>{data.extendedProps.motif}</p>
                                                <br/>
                                                <h4 style={{ fontWeight: 'bold' }}>Date </h4>
                                                <p style={{ fontSize: 15 }}>{new Date(data.start).toLocaleDateString(undefined, options)} à {new Date(data.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                                <br/>
                                                <br/>
                                                <Button onClick={()=>handleAction(data.id, 2)} variant="outlined" style={{padding: 10, fontSize: 13, fontWeight: 'bold', textTransform:'initial'}} color="secondary">
                                                    Rejeter la demande
                                                </Button>
                                                <Button onClick={()=>handleAction(data.id, 1)} variant="contained" style={{ padding: 10, color: '#fff', fontSize: 13, fontWeight: 'bold', textTransform:'initial', backgroundColor: 'rgb(76, 186, 117)', float: 'right' }} color="primary">
                                                    Accepter la demande
                                                </Button>
                                                <br/>
                                            </div>
                                            : null
                                        }
                                                
                                    </div>
                                </Paper>
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
      rdv: state.rdv.rdv,
      errorMessage: state.rdv.error,
      loader: state.rdv.loader,
    }
};

export default connect(mapStateToProps)(DetailDdemande)

