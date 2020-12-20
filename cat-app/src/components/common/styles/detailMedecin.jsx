import { makeStyles } from "@material-ui/core";

export const detailMedecinStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5, 0, 0, 0),
        
    },
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
    },
    paper2: {
        marginBottom: theme.spacing(3),
    },
    checkboxLabel: {
        fontSize: 14
    },
    btnSubmit: {
        padding: 10, 
        color:'#fff', 
        fontSize: 13, 
        fontWeight: 'bold', 
        backgroundColor: '#4cba75', 
        float: 'right',
        textTransform:'none'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
