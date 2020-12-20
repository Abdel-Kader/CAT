import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import Header from '../common/header'
import Alert from '@material-ui/lab/Alert';
import {add} from '../../services/rdvService';
import {detailMedecin} from '../../services/medecinService';
import {getLocalStorage} from '../../utils/localStorageUtil';
import {detailMedecinStyles} from '../common/styles/detailMedecin';
import {
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    TextField,
    Button,
    CircularProgress,
    Backdrop, Breadcrumbs, Link, Typography
} from "@material-ui/core";
import Swal from "sweetalert2";

// var TimePicker = require('basic-react-timepicker');

function DetailMedecin(props) {

    const [value, setValue] = useState('video');
    const [motif, setMotif] = useState('');
    const [show, setShow] = useState(true);
    const [data, setData] = useState(null)
    const [time, setTime] = useState(null)
    const [hour, setHour] = useState(null)
    const classes = detailMedecinStyles();

    const user = getLocalStorage('user')

    const {medecin, loading, loader, rdvAdded, errorMessage} = props
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    // alert(rdvAdded)

    useEffect(() => {
        const params = JSON.parse(props.location.state)
        setData(params)
        props.dispatch(detailMedecin(params.extendedProps.HoraireMedecin.medecinId))
    }, [])

    const handleMotifChange = (e) => {
        setMotif(e.target.value)
    }
    const dateHandle = (e) => {
        // console.log()
        var year = new Date(data.start).getFullYear()
        var month = new Date(data.start).getMonth() + 1
        var day = new Date(data.start).getDate()
        setTime(year + "-" + month + "-" + day + " " + e.target.value + ":00")
        setHour(e.target.value)
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setShow(true);
    };

    const handleSubmit = () => {
        const rdv = {
            medecinId: data.extendedProps.HoraireMedecin.medecinId,
            patientId: user.id,
            motif,
            start: time
        }
        if (hour < new Date(data.start).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }) || hour > new Date(data.end).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})) {
            alert('Heure choisie doit être supérieure à ' + new Date(data.start).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }) + ' et inférieure à ' + new Date(data.end).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
        } else {
            props.dispatch(add(rdv))
        }
    }
    useEffect(() => {
        {
            if (rdvAdded) {
                Swal.fire({
                    icon: "success",
                    title: "Votre demande a été envoyée avec succès",
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
    }, [rdvAdded]);


    return (
        <div>
            <Header/>
            <div style={{ marginTop: 67, backgroundColor:'#ccd', height:40, paddingTop:7, paddingLeft: 50 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" style={{cursor: 'pointer'}} onClick={()=>props.history.push('home')}>
                        Acceuil
                    </Link>

                    <Typography color="textPrimary">Détail médecin</Typography>
                </Breadcrumbs>
            </div>
            <Grid container className={classes.root} justify='center'>
                <Grid item xs={7}>

                    {/* <Alert variant="filled" severity="success">
                        <span style={{fontSize: 14}}>Votre demande a été envoyée avec succès !
                        </span>
                    </Alert> */}
                    {/* <Paper className={classes.paper}>
                        <Grid container direction={'row'}>
                            <img src="vendor/assets/images/users/doctor.webp" alt="..." className="img-thumbnail"/>
                            <Grid style={{marginLeft: 20, marginTop: 20}}>
                                {medecin ? 
                                    <div>
                                        <h3 style={{fontWeight: 'bold'}}>{medecin.User.first_name} {medecin.User.last_name}</h3>
                                        <h4>{medecin.Specialite.libelle === 'Généraliste' ? medecin.Specialite.libelle = "Médecin Généraliste" : medecin.Specialite.libelle}</h4>
                                        <h4>{medecin.User.address}</h4>
                                    </div>
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </Paper> */}
                    <Paper className={classes.paper2}>
                        <Alert variant="filled" severity="info">
                            <span style={{fontSize: 14}}>Veuillez remplir ce formulaire pour valider votre demande
                            </span>
                        </Alert>
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <Backdrop className={classes.backdrop} open={loader}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <div className={classes.paper}>
                            <h4 style={{fontWeight: 'bold'}}>Type de consultation</h4>
                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup aria-label="type" name="type" value={value} onChange={handleRadioChange}>
                                    <div style={{
                                        borderRadius: 3,
                                        paddingLeft: 10,
                                        marginBottom: 15
                                    }}>
                                        <FormControlLabel value="video" control={<Radio/>} label="Consultation vidéo"
                                                          classes={{
                                                              label: classes.checkboxLabel // here
                                                          }}
                                        />
                                    </div>

                                </RadioGroup>
                            </FormControl>
                            <br/>
                            {
                                show && medecin ?
                                    <div>
                                        <h4 style={{fontWeight: 'bold'}}>Médecin</h4>
                                        <p style={{fontSize: 15}}>Dr {medecin.User.first_name} {medecin.User.last_name}</p>
                                        <br/>
                                        <h4 style={{fontWeight: 'bold'}}>Spécialité</h4>
                                        <p style={{fontSize: 15}}>{medecin.specialite.libelle === 'Généraliste' ? medecin.specialite.libelle = "Médecin Généraliste" : medecin.specialite.libelle}</p>
                                        <br/>

                                        <h4 style={{fontWeight: 'bold'}}>Motif du rendez-vous</h4>

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="motif"
                                            label="Quel est le motif de votre consultation ?"
                                            type="text"
                                            id="motif"
                                            onChange={handleMotifChange}
                                        />
                                        <br/>
                                        <br/>
                                        <h4 style={{fontWeight: 'bold'}}>Date du rendez-vous</h4>
                                        {data ? <p style={{fontSize: 15, fontStyle: 'italic'}}>Le médecin est disponible
                                            le {new Date(data.start).toLocaleDateString(undefined, options)} de {new Date(data.start).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })} à {new Date(data.end).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</p> : null}
                                        <br/>
                                        <label>Choisissez l'heure qui vous convient</label>
                                        {
                                            data !== null ?
                                                <input type="time" id="appt" name="appt" className="form-control"
                                                       onChange={dateHandle}
                                                       min={new Date(data.start).toLocaleTimeString([], {
                                                           hour: '2-digit',
                                                           minute: '2-digit'
                                                       })} max={new Date(data.end).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} required/>
                                                : null
                                        }
                                        <br/>
                                        {/* <TimePicker beginLimit="3:00PM" endLimit="6:00PM"/> */}
                                        <Button onClick={handleSubmit} variant="contained" className={classes.btnSubmit}
                                                color="primary">
                                            Envoyer la demande
                                        </Button>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    : null
                            }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        medecin: state.medecin.medecin,
        errorMessage: state.rdv.error,
        loading: state.medecin.loading,
        loader: state.rdv.loader,
        rdvAdded: state.rdv.rdvAdded
    }
};

export default connect(mapStateToProps)(DetailMedecin)

