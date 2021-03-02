import React, {useEffect, useState} from 'react';
import { Container, TextField , Grid, Paper, Button, Link, CircularProgress, Backdrop} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { loginStyle } from '../common/styles/loginStyle'
import InputMask from 'react-input-mask'
import * as authService from "../../services/authService";


function LoginForm(props) {
    const classes = loginStyle();

    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber ] = useState("")
    const [phoneIncorrect, setPhoneIncorrect] = useState(false);
    const [user_connected, setUser] = useState(null)

    const { user, loading } = props
    
    const phoneChange= function(e) {
        setPhoneNumber(e.target.value);
        phoneNumber ? setPhoneIncorrect(false) : setPhoneIncorrect(true)
    };

    const passwordChange= function(e) {
        setPassword(e.target.value);
    };


    const submitHandle = (e) => {
        e.preventDefault()
        
        if(phoneNumber && password)
        {
            
            props.actions.loginService(phoneNumber, password)
            
            
            // window.location.reload()
        }
    }

    useEffect(() => {
        setUser(user)
        if (user_connected != null) {
            if (user_connected.profile === 1) {
                props.history.push('dashboard')
            }
            else if (user_connected.profile === 2)
            { props.history.push('home') }

            else if (user_connected.profile === 3)
            { props.history.push('admin') }
        }
    })
    
    
    
    return (
        <Container>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        <Grid container component="main" className={classes.root} justify={'center'}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                {
                    props.errorMessage ?
                        <Alert severity="error">{props.errorMessage}</Alert>
                        :
                        null
                }

            <div className={classes.paper}>
                <h2 className={classes.title}>Veuillez vous connecter</h2>
                <form 
                  name="form"
                  className={classes.form}>
                        <InputMask
                            mask="(+221) 99 999 99 99"
                            onChange={phoneChange}
                            disabled={false}
                            maskChar="-">
                            {
                                () =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Téléphone"
                                    />
                            }
                        </InputMask>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            onChange={passwordChange}
                        />
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={submitHandle}
                            > 
                                Se connecter
                        </Button>
                            <br/>
                            <br/>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                Mot de passe oublié ?
                                </Link>
                            </Grid>
                            <Grid item style={{display: 'flex'}} direction={'column'}>
                                Vous n'avez pas encore de compte ? <br/>
                                <Link href="/medecin/register/1" variant="body2" style={{textAlign:'center'}}>
                                  Créer mon compte
                                </Link>
                            </Grid>
                        </Grid>
                  </form>
                </div>
            </Grid>
        </Grid>
    </Container>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.login.user,
      errorMessage: state.login.error,
      loading: state.login.loading,
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
