import { makeStyles, TableCell, TableRow, withStyles } from "@material-ui/core";

export const consultationStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing(1),
      },

}))

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgb(76, 186, 117)',
        color: theme.palette.common.white,
        fontSize: 15,
        textAlign: 'center'
    },
    body: {
        fontSize: 15,
        textAlign: 'center'
    },
}))(TableCell);


export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
