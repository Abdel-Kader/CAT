import React, { useEffect, useState } from 'react';
import Header from '../common/header'
import {
    Grid,
    Table,
    TableBody,
    TableContainer, 
    Paper,
    TableHead,
    TableRow,
    Button,
    CircularProgress, Backdrop
} from "@material-ui/core";
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import { getLocalStorage } from "../../utils/localStorageUtil";
import { getConsultation, getNextConsultations } from '../../services/rdvService';
import { StyledTableCell, StyledTableRow, consultationStyles } from '../common/styles/consultationStyle';


function ListConsultations(props) {
    const user = getLocalStorage('user')
    const classes = consultationStyles()
    // const [nextConsultations, setNextConsultations] = useState({});
    const [showNext, setShowNext] = useState(false)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        props.dispatch(getConsultation(user.id,'Patient','now'))
        props.dispatch(getNextConsultations(user.id,'Patient','later'))
    }, [])
  
    
    function showNextConsults() {
        setShowNext(true)
    }

    const handleDemarrer = (patient, id) =>
    { 
        props.history.push('teleconsultation', {
            patient,
            id
       })
    }

    
    const { demandes, loader, nextConsultations } = props
    
    // console.log(nextConsultations)
    // console.log(loader)
    
    return (
                <div>
                    <Header />
                            <div className="row">
                                <Backdrop className={classes.backdrop} open={loader}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            {
                                !showNext ?
                                    <>
                                        { demandes.length > 0 ?
                                            <Grid justify='center' container style={{marginTop:20}}>
                                                <Grid item xs="10">
                                                    <br />
                                                    <br/>
                                                    <h3>Vos téléconsultations programmées pour aujourd'hui</h3>
                                                    <br/>
                                                    <TableContainer component={Paper}>
                                                        <Table className={classes.table} aria-label="customized table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell>Médecin</StyledTableCell>
                                                                    <StyledTableCell>Téléphone</StyledTableCell>
                                                                    <StyledTableCell>Spécialité</StyledTableCell>
                                                                    <StyledTableCell>Motif</StyledTableCell>
                                                                    <StyledTableCell>Heure de la téléconsultation</StyledTableCell>
                                                                    <StyledTableCell>Actions</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    demandes.map((demande) => (
                                                                        <StyledTableRow key={demande.id}>
                                                                            <StyledTableCell>{demande.Medecin.User.first_name} {demande.Medecin.User.last_name}</StyledTableCell>
                                                                            <StyledTableCell>{demande.Medecin.User.phone_number}</StyledTableCell>
                                                                            <StyledTableCell>{demande.Medecin.specialite.libelle=='Généraliste'? 'Médecin Généraliste' : demande.Medecin.specialite.libelle}</StyledTableCell>
                                                                            <StyledTableCell>{demande.motif}</StyledTableCell>
                                                                            <StyledTableCell>{new Date(demande.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</StyledTableCell>
                                                                            <StyledTableCell>
                                                                                <Button onClick={()=> handleDemarrer(demande.Medecin, demande.id)} variant="contained" style={{ backgroundColor: 'green', color: '#fff', textTransform: 'none', fontSize: 13 }}>
                                                                                    Joindre 
                                                                                </Button>
                                                                                {/* {new Date(demande.start).setMinutes(new Date().getMinutes())} */}
                                                                            </StyledTableCell>
                                                                        
                                                                        </StyledTableRow>
                                                                
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                            </Grid>:
                                    
                                            <Grid justify='center' container style={{ textAlign: 'center', marginTop: 150 }} alignContent='center' align='center'>
                                                {!loader ? <Grid item xs={4}>
                                                    <img src="assets/images/notFound.png" alt="not found" style={{ width: 80 }} />
                                                    <br />
                                                    <br />
                                                    <Alert severity="info">
                                                        <strong>Vous n'avez pas aucune téléconsultation prévue aujourd'hui !</strong>
                                                    </Alert>
                                                    <br />
                                                    <h6>
                                                        <Button color="primary" style={{ fontWeight: 'bold', fontSize: 13 }} onClick={showNextConsults }>VOIR MES TELECONSULTATIONS A VENIR</Button>
                                                    </h6>
                                                </Grid>:null}
                                            </Grid>
                                        }
                                    </>
                                    :
                                    <>
                                    { nextConsultations.length > 0 ?
                                            <Grid justify='center' container style={{marginTop:20}}>
                                                <Grid item xs="10">
                                                    <br />
                                                    <br/>
                                                    <h3>Vos téléconsultations à venir</h3>
                                                    <br/>
                                                    <TableContainer component={Paper}>
                                                        <Table className={classes.table} aria-label="customized table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCell>Médecin</StyledTableCell>
                                                                    <StyledTableCell>Numéro de téléphone</StyledTableCell>
                                                                    <StyledTableCell>Spécialité</StyledTableCell>
                                                                    <StyledTableCell>Motif</StyledTableCell>
                                                                    {/* <StyledTableCell>Service</StyledTableCell> */}
                                                                    <StyledTableCell>Date de la téléconsultation</StyledTableCell>
                                                                    <StyledTableCell>Actions</StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    nextConsultations.map((demande) => (
                                                                        <StyledTableRow key={demande.id}>
                                                                            <StyledTableCell>Dr {demande.Medecin.User.first_name} {demande.Medecin.User.last_name}</StyledTableCell>
                                                                            <StyledTableCell>{demande.Medecin.User.phone_number}</StyledTableCell>
                                                                            <StyledTableCell>{demande.Medecin.Specialite.libelle == 'Généraliste' ? 'Médecin Généraliste' : demande.Medecin.Specialite.libelle}</StyledTableCell>
                                                                            <StyledTableCell>{demande.motif}</StyledTableCell>
                                                                            {/* <StyledTableCell>{demande.Medecin.Service.libelle}</StyledTableCell> */}
                                                                            <StyledTableCell>{new Date(demande.start).toLocaleDateString(undefined, options)} à {new Date(demande.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</StyledTableCell>
                                                                            <StyledTableCell><Button variant="outlined" color="secondary" style={{textTransform:'none'}} startIcon={<DeleteIcon />}>Annuler</Button></StyledTableCell>
                                                                            
                                                                            {/* <StyledTableCell>
                                                                                <Button onClick={()=> handleDemarrer(demande.Medecin, demande.id)} variant="contained" style={{ backgroundColor: 'green', color: '#fff', textTransform: 'none', fontSize: 13 }}>
                                                                                    Démarrer
                                                                            </Button>
                                                                            </StyledTableCell> */}
                                                                        
                                                                        </StyledTableRow>
                                                                
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                            </Grid>:
                                    
                                            <Grid justify='center' container style={{ textAlign: 'center', marginTop: 150 }} alignContent='center' align='center'>
                                                {!loader ? <Grid item xs={4}>
                                                    <img src="assets/images/notFound.png" alt="not found" style={{ width: 80 }} />
                                                    <br />
                                                    <br />
                                                    <Alert severity="info">
                                                        <strong>Vous n'avez pas aucune téléconsultation à venir pour l'instant !</strong>
                                                    </Alert>
                                                    <br />
                                                    <h6>
                                                        <Button color="primary" style={{ fontWeight: 'bold', fontSize: 13 }} onClick={() => { props.history.push('home')}}>Prendre un rendez-vous</Button>
                                                    </h6>
                                                </Grid>:null}
                                            </Grid>
                                        }
                                    </>
                            }
                            </div>
                        </div>
    )

}


const mapStateToProps = (state) => {
    return {
      demandes: state.rdv.consultations,
      nextConsultations: state.rdv.nextConsultations,
      errorMessage: state.rdv.error,
      loader: state.rdv.loader,
    }
};

export default connect(mapStateToProps)(ListConsultations)