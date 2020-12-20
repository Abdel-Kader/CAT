import React, {useState, useEffect} from 'react'

import Swal from 'sweetalert2';
import {connect} from 'react-redux'
import Header from '../common/header'
import Alert from '@material-ui/lab/Alert';
import {updateDemande} from '../../services/rdvService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from '@fullcalendar/interaction';
import {detailMedecin} from '../../services/medecinService';
import {detailMedecinStyles} from '../common/styles/detailMedecin';
import {
    Grid, Paper, TextField, Button, CircularProgress, Backdrop,
    Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Link, Typography, Breadcrumbs
} from "@material-ui/core";


function UpdateRdv(props) {

    // const [value, setValue] = useState('');
    const [motif, setMotif] = useState(null);
    const [show, setShow] = useState(false);
    // const [data, setData] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    // const [hour, setHour] = useState(null)
    const [open, setOpen] = useState(false);
    const classes = detailMedecinStyles();

    // const user = getLocalStorage('user')

    const demande = props.location.state

    // console.log(demande)
    // setMotif(demande.motif)

    const {medecin, loading, load, rdvUpdated, errorMessage} = props

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    useEffect(() => {
        props.dispatch(detailMedecin(demande.Medecin.id))
    }, [])

    const handleMotifChange = (e) => {
        setMotif(e.target.value)
    }

    const dateHandle = (e) => {
        // console.log()
        var year = new Date(JSON.parse(date).start).getFullYear()
        var month = new Date(JSON.parse(date).start).getMonth() + 1
        var day = new Date(JSON.parse(date).start).getDate()
        setTime(year + "-" + month + "-" + day + " " + e.target.value + ":00")
        // setHour(e.target.value)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleEventClick = (arg) => {
        // props.history.push('detail-medecin', 
        //   
        setOpen(true);
        setDate(JSON.stringify(arg.event))
    }

    const handleSubmit = (e) => {
        console.log('errr')
        if (time != null) {
            if (motif != null)
                props.dispatch(updateDemande(demande.id, motif, time))
            else
                props.dispatch(updateDemande(demande.id, demande.motif, time))

        } else {
            if (motif != null)
                props.dispatch(updateDemande(demande.id, motif, demande.start))
            else
                props.dispatch(updateDemande(demande.id, demande.motif, demande.start))
        }
    }
    console.log(props)

    useEffect(() => {
        {
            if (rdvUpdated) {
                Swal.fire({
                    icon: "success",
                    title: "Votre demande a été modifiée avec succès",
                    showConfirmButton: true,
                }).then((res) => {
                    props.history.push('mes-rendez-vous', 'attente')
                });
            } else if (errorMessage) {
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                    showConfirmButton: true,
                });
            }
        }
    }, [rdvUpdated]);

    return (
        <div>
            <Header/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div style={{marginTop: 67, backgroundColor: '#ccd', height: 40, paddingTop: 7, paddingLeft: 50}}>

                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" style={{cursor: 'pointer'}} onClick={() => props.history.push('home')}>
                        Acceuil
                    </Link>
                    <Link color="inherit" style={{cursor: 'pointer'}}
                          onClick={() => props.history.push('mes-rendez-vous', 'attente')}>
                        Mes rendez-vous
                    </Link>
                    <Typography color="textPrimary">Modifier la demande</Typography>
                </Breadcrumbs>
            </div>
            <Grid container className={classes.root} justify='center'>
                <Grid item xs={7}>

                    <Paper className={classes.paper2}>
                        <Alert variant="filled" severity="info">
                            <span style={{fontSize: 14}}>Formulaire de modification de la demande
                            </span>
                        </Alert>
                        <div className={classes.paper}>
                            <div>
                                <h4 style={{fontWeight: 'bold'}}>Médecin</h4>
                                <p style={{fontSize: 15}}>Dr {demande.Medecin.User.first_name} {demande.Medecin.User.last_name}</p>
                                <br/>
                                <h4 style={{fontWeight: 'bold'}}>Spécialité</h4>
                                <p style={{fontSize: 15}}>{demande.Medecin.specialite.libelle === 'Généraliste' ? demande.Medecin.specialite.libelle = "Médecin Généraliste" : demande.Medecin.specialite.libelle}</p>
                                <br/>

                                <h4 style={{fontWeight: 'bold'}}>Motif de la consultation</h4>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="motif"
                                    label="Quel est le motif de votre consultation ?"
                                    type="text"
                                    id="motif"
                                    defaultValue={demande.motif}
                                    onChange={handleMotifChange}
                                />
                                <br/>
                                <br/>
                                <br/>
                                <h4 style={{fontWeight: 'bold'}}>Date et heure</h4>
                                <p style={{fontSize: 15}}>Le {new Date(demande.start).toLocaleDateString(undefined, options)} à {new Date(demande.start).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                    <Button color='primary' style={{textTransform: 'none', marginLeft: 20}}
                                            onClick={() => {
                                                setShow(true)
                                            }}>
                                        Choisir une autre date
                                    </Button>
                                </p>
                                <br/>
                                <br/>
                            </div>
                            {show ?
                                <div>
                                    {medecin ?
                                        <FullCalendar
                                            locales={allLocales}
                                            locale='fr'
                                            displayEventEnd={true}
                                            initialView="dayGridMonth"
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            editable={true}
                                            eventClick={handleEventClick}
                                            events={medecin.horaires}
                                            headerToolbar={{
                                                left: 'prev,next',
                                                center: 'title',
                                                right: 'dayGridWeek,dayGridMonth'
                                            }}
                                            eventColor='#ff5e3a'
                                        /> : null}
                                    <br/>
                                </div>
                                : null
                            }
                            <br/>
                            <Button onClick={handleSubmit} variant="contained" className={classes.btnSubmit}
                                    color="primary">
                                Modifier
                            </Button>
                            <br/>
                            <br/>
                        </div>
                    </Paper>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        Disponibilités du médecin (choisissez l'heure qui vous convient pour le rendez-vous) :
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {/* {date? new Date(JSON.parse(date).start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null} */}
                            <label>Choisissez l'heure qui vous convient</label>
                            {date ?
                                <input type="time" id="appt" name="appt" className="form-control" onChange={dateHandle}
                                       min={new Date(JSON.parse(date).start).toLocaleTimeString([], {
                                           hour: '2-digit',
                                           minute: '2-digit'
                                       })} max={new Date(JSON.parse(date).end).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })} required/>
                                : null
                            }
                            <br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        medecin: state.medecin.medecin,
        errorMessage: state.medecin.error,
        loading: state.medecin.loading,
        load: state.rdv.loader,
        rdvUpdated: state.rdv.rdvUpdated
    }
};

export default connect(mapStateToProps)(UpdateRdv)

