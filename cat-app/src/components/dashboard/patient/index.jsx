import React, { useEffect } from 'react';

import 'moment/locale/fr';
import { connect } from 'react-redux';
import Header from '../../common/header/';
import {Alert, AlertTitle} from '@material-ui/lab';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from '@fullcalendar/interaction';
import { getMedecins } from '../../../services/medecinService';
import { patientHomeStyle } from '../../common/styles/patientHomeStyle';
import { Grid, Avatar, Button, Box, Container, CircularProgress, Backdrop, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from '@material-ui/core';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


function Home(props) {
    const classes = patientHomeStyle()
    const [open, setOpen] = React.useState(false);
    const [disponibility, setDisponibility] = React.useState(null);

    const handleOpen = (dispo) => {
        setOpen(true);
        setDisponibility(dispo)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    useEffect(() => {
        props.dispatch(getMedecins())
        // $(document).ready(function () {
        //     $('#example').DataTable( {
        //         "language": {
        //             "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
        //         }
        //     });
        // });
    }, [])
        
    
    const { medecins, loading } = props
    

     const handleEventClick = (arg) => {
        props.history.push('detail-medecin', 
          JSON.stringify(arg.event))
    }
    
    return (
        <>
        <Header/>
            <Container>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box my={2} className={classes.root}>
                    {
                        props.errorMessage ?
                            <Alert severity="error">{props.errorMessage}</Alert>
                            :
                            null
                    }
                    <Container>
                        <Grid container style={{marginTop: 50}} justify='center'>
                            <Grid item xs={10}>
                            {
                            medecins.length > 0 ?
                                <>
                                    <div className="page-title">
                                        <h2>Liste des médecins</h2>
                                    </div>
                                    <h4>Envoyer une demande de rendez-vous au médecin de votre choix</h4><br />
                                    
                                        {
                                            medecins.map((medecin) =>
                                            <div className="courses-container" key={medecin.id}>
                                                <div className="course">
                                                    <div className="course-preview">
                                                        <div style={{display: 'grid', justifyContent:'center'}}>
                                                            <Avatar alt="dsl" className={classes.large} src="assets/images/users/doctor.webp"/>
                                                        </div>
                                                        <h3 style={{textAlign: 'center'}}>Dr { medecin.User.first_name } { medecin.User.last_name }</h3>
                                                        <h5 style={{textAlign: 'center'}}>{medecin.User.phone_number}</h5>
                                                        <h5 style={{textAlign: 'center'}}>{medecin.User.email}</h5>
                                                    </div>
                                                    <div className="course-info">
                                                        <h3>{ medecin.specialite.libelle === 'Généraliste' ? medecin.specialite.libelle = "Médecin Généraliste" : medecin.specialite.libelle}</h3>      
                                                        <p>
                                                            Spécialité
                                                        </p>
                                                        <br/>    
                                                        {/* <h3>{medecin.Service.libelle}</h3> */}
                                                        <h4>5.000 FCFA</h4>
                                                        <p>Tarif de la téléconsultation    
                                                        </p>
                                                        <button className="btn" onClick={()=> {handleOpen(medecin.horaires)}}>Prendre rendez-vous</button>
                                                    </div>
                                                </div>
                                            </div>  
                                        )}        
                                    
                                </>    

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
                    </Container>
                    <Dialog
                        open={open}
                        fullWidth={true}
                        maxWidth={"md"}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Disponibilités du médecin (choisissez l'heure qui vous convient pour le rendez-vous) :</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FullCalendar 
                                    locales={allLocales}
                                    locale='fr'
                                    displayEventEnd={true}
                                    initialView="dayGridMonth"
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    editable={true}
                                    eventClick={handleEventClick}
                                    events={disponibility}
                                    headerToolbar={{
                                        left: 'prev,next',
                                        center: 'title',
                                        right: 'dayGridWeek,dayGridMonth'
                                    }}
                                    eventColor='#ff5e3a'
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Fermer
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Container>
        </>
 
    )
}



const mapStateToProps = (state) => {
    return {
      medecins: state.medecin.medecins,
      errorMessage: state.medecin.error,
      loading: state.medecin.loading,
    }
};

export default connect(mapStateToProps)(Home)
