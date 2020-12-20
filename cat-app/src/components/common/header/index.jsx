import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import { withRouter, Redirect } from 'react-router-dom';
import AppBarCollapse from "./AppBarCollapse";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import {AppBar, Button, Typography} from "@material-ui/core";
import { getLocalStorage } from '../../../utils/localStorageUtil'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
    navigation: {
      backgroundColor:'#4cba75'
  },
  toggleDrawer: {},
    appTitle: {
      fontSize:18
  }
};

function Header(props) {
  const { classes } = props;
  const user = getLocalStorage('user')
  
  if (user != null)
  {
    if (user.profile === 1)
      <Redirect to="dashboard"/>
  }

  return (
    <AppBar position="fixed" className={classes.navigation}>
      <Toolbar>
        <Button color="inherit" style={{ textTransform: 'none' }}>
        <Typography variant="h6" style={{flexGrow: 1,color: "#fff", fontWeight: 'bold', fontFamily: 'cursive'}}>Centre Africain de Télémédecine</Typography>
        </Button>
        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
