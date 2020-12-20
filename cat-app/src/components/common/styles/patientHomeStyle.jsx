import { makeStyles } from "@material-ui/core";


export const patientHomeStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: theme.spacing(0, 3)
  },
  errorContainer: {
    marginTop: theme.spacing(20)
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),

  },
  large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      // marginLeft: 25
    },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  detail_btn: {
    backgroundColor: '#121f3e !important',
    fontSize: 13,
    position: 'absolute',
    bottom: 30,
    right: 30,
    color:'#fff',
    padding: '8px 20px',
    borderRadius:30
  },
  submit: {
		backgroundColor: "#4cba75",
		color: "white",
		textTransform: "capitalize",
    height: 40,
    marginRight: 15,
    fontSize: 15
  },
  gridFull: {
    maxWidth: '49.5%'
},
}))
