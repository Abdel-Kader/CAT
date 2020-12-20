import React, { useState, useEffect } from 'react'

import Header  from '../../common/header'
import { Grid, Paper } from "@material-ui/core";
import { detailMedecinStyles } from '../../common/styles/detailMedecin';
import { getLocalStorage } from '../../../utils/localStorageUtil'

function DossierPatient(props) {
    const classes = detailMedecinStyles();
    const user = getLocalStorage('user')

    return (
         <div>
            <Header />
            
            <Grid container className={classes.root} justify='center'>
                <Grid item xs={8}>
             
                    <Paper className={classes.paper2}>
                    
                        <div className={classes.paper}>                            
                            <div style={{border: '3px solid', padding:15}}>
                                <div style={{display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center'}}>
                                    <img src="assets/images/logo_fann.png" alt="logo fann" style={{ width: 70 }} />
                                    
                                    <div style={{borderTop:'2px solid', marginTop:5}}>
                                        <h3>Centre Hospitalier National de FANN </h3>
                                    </div>
                                    <div style={{borderTop:'2px solid', marginTop:5}}>
                                        <h5>Avenue Cheikh Anta Diop Dakar Tel : + (221) 33 869-18-78</h5>
                                    </div>
                                </div>
                            </div>
                           
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop:5 }}>
                                <div>
                                    <h4>Numéro du dossier : 20/7302</h4>
                                </div>
                                <div>
                                    <h4>Date : {new Date().toLocaleDateString()} </h4>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default DossierPatient