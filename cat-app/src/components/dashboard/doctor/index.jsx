import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Grid, Paper} from '@material-ui/core'
import { getLocalStorage } from '../../../utils/localStorageUtil'

export default function MedecinDashboard(props) {

    const user = getLocalStorage('user')

    useEffect(() => {
		console.log(props)
    if (user != null)
    {
      if (user.profile == 2)
        props.history.push('/home')
    }
  }, [])
    return (
        <div className="container">
            {/* <AdminHeader/> */}
            <h2 style={{ textAlign: 'center', marginTop: 110 }}>Bienvenue sur l'application de télémédecine du CHNU Fann</h2>
                    <h3 style={{ textAlign: 'center' }}>Choisissez le module sur lequel vous voulez travailler :</h3>
                    <Grid container justify='center' spacing="8" style={{marginTop:50}}>
                        <Grid item xs="4">
                            <h3 style={{textAlign:'center', fontSize: 20}}>Téléconsultation</h3>
                            <br/>
                            <Paper  elevation={3} style={{backgroundImage: "url(assets/images/consult.png)", backgroundSize: 'contain', height:170}}>
                                {/* <Link to="/tele-consultation" exact={"true"} style={{ height: 170 }}></Link>                         */}
                                <Link to="/tele-consultation" exact={"true"} className="tile" style={{height:170, display:'flex'}}/>
                                
                            {/* </Link> */}
                            </Paper>
                        </Grid>
                        <Grid item xs="4">
                            <h3 style={{textAlign:'center', fontSize: 20}}>Télé-expertise</h3>
                            <br/>
                           <Paper elevation={3} style={{backgroundImage: "url(/assets/images/expertise.jpg)", backgroundSize: 'contain', height:170}}>
                                <Link to="tele-expertise" exact={"true"} className="tile" style={{height:170, display:'flex'}}/>
                            </Paper>
                        </Grid>
                
                        {/* <Grid item xs="4">
                            <h3 style={{textAlign:'center', fontSize: 20}}>Télé-enseignement</h3>
                            <br/>
                           <Paper elevation={3} style={{backgroundImage: "url(/assets/images/expertise.jpg)", backgroundSize: 'contain', height:170}}>
                                <Link to="#" exact={"true"} className="tile" style={{height:170, display:'flex'}}/>
                            </Paper>
                        </Grid> */}
                    </Grid>
        </div>
    )
}