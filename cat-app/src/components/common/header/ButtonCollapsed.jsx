import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {isAuthenticated} from '../../../utils/jwtUtil';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';


const drawerWidth = 240;

const useStyles =  makeStyles(theme =>({
    list: {
      width: 500,
    },
    drawerPaper: {
        width: drawerWidth,
      },
    fullList: {
      width: 'auto',
    },
    buttonCollapse: {
        [theme.breakpoints.up("sm")]: {
          display: "none"
        },
        margin: "10px",
        boxShadow: "none"
      }
}));
 function TemporaryDrawer(props) {
    const classes = useStyles();
  
    const [mobileOpen, setMobileOpen] = React.useState(false);
 
//  console.log(props)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const drawer = (
        <div>
            <Divider />
            <List component="nav">
            {isAuthenticated() ? 
              <>
                <ListItem button>
                  <ListItemIcon><i className="icofont-file-fill"></i></ListItemIcon>
                  <ListItemText primary={'Mes rendez-vous'} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon><i className="icofont-ui-folder"/></ListItemIcon>
                  <ListItemText primary={'Mon dossier'} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon><i className="icofont-user-male"/></ListItemIcon>
                  <ListItemText primary={'Mon compte'} />
                  
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon><i className="icofont-logout"/></ListItemIcon>
                  <ListItemText primary={'Se déconnecter'} />
                </ListItem>
              </> :
              <>
                <ListItem button>
                  <ListItemIcon><i className="icofont-file-fill"></i></ListItemIcon>
                  <ListItemText primary={'A propos'} />
                </ListItem>
                <Divider />
                <ListItem button onClick={()=> {props.history.push('/login')}}>
                  <ListItemIcon><i className="icofont-ui-folder"/></ListItemIcon>
                  <ListItemText primary={'Se connecter'} />
                </ListItem>
              </>
            }
            </List>
          
        </div>
    );
    

  return (
    <div className={classes.buttonCollapse}>
        <React.Fragment>
              {/* <Button onClick={handleDrawerToggle}>Menu</Button> */}
              <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                >
                <MenuIcon />
            </IconButton>
            <Drawer //variant="persistent"
                anchor={'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
            }}>
            {drawer}
          </Drawer>
        </React.Fragment>
     
    </div>
  );
}

export default withRouter(TemporaryDrawer)