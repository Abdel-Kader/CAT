import React, { useEffect } from 'react';
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
    CircularProgress,
    Backdrop
} from "@material-ui/core";
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getLocalStorage } from "../../utils/localStorageUtil";
import { getRdvHistory, updateStatus } from '../../services/rdvService';
import { StyledTableCell, StyledTableRow, consultationStyles } from '../common/styles/consultationStyle';


function ListRdv(props) {
    const user = getLocalStorage('user')
    const classes = consultationStyles()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    useEffect(() => {
        props.dispatch(getRdvHistory(user.id,'Patient', props.location.state))
    }, [])


    function handleAction(id, status)
    {
        Swal.fire({
            title: 'Attention !',
            text: "Voulez-vous vraiment annuler cette demande ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui !',
            cancelButtonText: 'Non !',
        }).then((result) => {
            if (result.value) {
                props.dispatch(updateStatus(id, status))
                Swal.fire({
                    icon: 'success',
                    title: 'Rendez-vous annulé avec succès',
                    showConfirmButton: true                    
                }).then((res) => {
                    // props.history.push('mes-rendez-vous', 'attente')
                    window.location.reload()
                })
            }
        })
        
    }

    const { demandes, loader } = props
    console.log(loader)
    // console.log(props.location.state)
    
    return (
                <div>
                    <Header />
                            <div className="row">
                                <Backdrop className={classes.backdrop} open={loader}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            {
                                demandes.length > 0 ?
                                    <Grid justify='center' container style={{marginTop:50}}>
                                        <Grid item xs="11">
                                            <br />
                                            <br/>
                                            <h4>Vos demandes de rendez-vous envoyées :</h4>
                                            <br/>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Médecin</StyledTableCell>
                                                            <StyledTableCell>Numéro de téléphone</StyledTableCell>
                                                            <StyledTableCell>Spécialité</StyledTableCell>
                                                            {/* <StyledTableCell>Service</StyledTableCell> */}
                                                            <StyledTableCell>Envoyée le </StyledTableCell>
                                                            <StyledTableCell>Date du rendez-vous</StyledTableCell>
                                                            <StyledTableCell>Motif</StyledTableCell>
                                                            {props.location.state == 'attente' ? <StyledTableCell>Etat de la demande</StyledTableCell> : null}
                                                            { props.location.state == 'attente'? <StyledTableCell colSpan={2}>Action</StyledTableCell>: null}                                    
                                                            {/* <StyledTableCell>Actions</StyledTableCell> */}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            demandes.map((demande) => (
                                                                <StyledTableRow key={demande.id}>
                                                                    <StyledTableCell>Dr. {demande.Medecin.User.first_name} {demande.Medecin.User.last_name}</StyledTableCell>
                                                                    <StyledTableCell>{demande.Medecin.User.phone_number}</StyledTableCell>
                                                                    <StyledTableCell>{demande.Medecin.specialite.libelle=='Généraliste'? 'Médecin Généraliste' : demande.Medecin.specialite.libelle}</StyledTableCell>
                                                                    {/* <StyledTableCell>{demande.Medecin.Service.libelle}</StyledTableCell> */}
                                                                    <StyledTableCell>{new Date(demande.createdAt).toLocaleDateString(undefined, options)}</StyledTableCell>
                                                                    <StyledTableCell>{new Date(demande.start).toLocaleDateString(undefined, options)} à {new Date(demande.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</StyledTableCell>
                                                                    <StyledTableCell>{demande.motif}</StyledTableCell>
                                                                    {props.location.state == 'attente'? <StyledTableCell>{demande.status== 0 ? <strong style={{color:'blue'}}>en attente</strong>: demande.status==1? <strong style={{color:'green'}}>accepté</strong>: <strong style={{color:'red'}}>rejeté</strong>}</StyledTableCell>: null}
                                                                    {props.location.state == 'attente'? <StyledTableCell><Button variant="outlined" color="secondary" style={{textTransform:'none'}} startIcon={<DeleteIcon />} onClick={()=>handleAction(demande.id, 3)}>Annuler</Button></StyledTableCell>: null}
                                                                    {props.location.state == 'attente'? <StyledTableCell><Button variant="outlined" color="success" style={{textTransform:'none'}} startIcon={<EditIcon />} onClick={()=> {props.history.push('update-demande', demande)}}>Modifier</Button></StyledTableCell>: null}
                                                                    {/* <StyledTableCell>{new Date(demande.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</StyledTableCell> */}
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
                                    </Grid>
                                    :
                                    <Grid justify='center' container style={{ textAlign: 'center', marginTop: 150 }} alignContent='center' align='center'>
                                
                                    {!loader ? 
                                        <Grid item xs={4}>
                                            <img src="assets/images/notFound.png" alt="not found" style={{ width: 80 }} />
                                            <br />
                                            <br />
                                            <Alert severity="info">
                                                <strong>Vous n'avez pas encore envoyé de demande de rendez-vous pour l'instant !</strong>
                                            </Alert>
                                            <br />
                                            <h6>
                                                <Button color="primary" style={{ fontWeight: 'bold', fontSize: 13 }} onClick={() => { props.history.push('home')}}>Prendre un rendez-vous</Button>
                                            </h6>
                                        </Grid>: null}
                                    </Grid>
                                }
                            </div>
                        </div>
    )

}


const mapStateToProps = (state) => {
    return {
      demandes: state.rdv.demandes,
      errorMessage: state.rdv.error,
      loader: state.rdv.loading,
    }
};

export default connect(mapStateToProps)(ListRdv)
