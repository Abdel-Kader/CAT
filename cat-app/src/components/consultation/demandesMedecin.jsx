import React, { useEffect } from 'react'
import MedecinHeader from '../common/header/MedecinHeader'
import { getDemandes } from '../../services/rdvService';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import {getLocalStorage} from "../../utils/localStorageUtil";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all';
import { CircularProgress, Backdrop} from '@material-ui/core';
import { patientHomeStyle } from '../common/styles/patientHomeStyle';


 function DemandesMedecins(props) {
    const user = getLocalStorage('user')
    const classes = patientHomeStyle()

    useEffect(() => {
        props.dispatch(getDemandes(user.id,'Medecin'))
    }, [])


    const handleEventClick = (arg) => {
        props.history.push('detail-demande',
         JSON.stringify(arg.event))
     }

     const { demandes, loading } = props

    //  console.log(demandes)
    return (
        <div id="wrapper">
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <MedecinHeader type='consultation'/>
            <div className="main">

			    <div className="main-content">
                    <div className="row">
                            <Grid container justify='flex-start'>
                            {
                                demandes.length > 0 ?
                                    <Grid item xs={9} style={{marginLeft:40}}>
                                        <h4 style={{fontSize: 18}}>Les demandes de rendez-vous reçues</h4>
                                        <FullCalendar
                                            locales={allLocales}
                                            locale='fr'
                                            displayEventEnd={false}
                                            initialView="dayGridMonth"
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            editable={true}
                                            events={demandes}
                                            eventClick={handleEventClick}
                                            eventColor='#ff5e3a'
                                            headerToolbar={{
                                                    left: 'prev,next',
                                                    center: 'title',
                                                    right: 'dayGridWeek,dayGridMonth'
                                                }}
                                        />
                                    </Grid>
                                :
                                    <Grid justify='center' container style={{display: 'flow-root', textAlign: 'center', marginTop: 50}} alignContent='center' align='center'>

                                        <img src="assets/images/notFound.png" alt="not found" style={{width: 100}}/>
                                        <br/>
                                        <br/>
                                        <h4>Vous n'avez aucune demande de rendez-vous !</h4>

                                    </Grid>
                            }
                            </Grid>

                </div>
            </div>

        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      demandes: state.rdv.demandes,
      errorMessage: state.rdv.error,
      loading: state.rdv.loading,
    }
};

export default connect(mapStateToProps)(DemandesMedecins)
