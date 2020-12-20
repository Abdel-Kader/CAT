import { makeStyles } from "@material-ui/core";

export const loginStyle = makeStyles((theme) => ({
	root: {
		height: "auto",
		paddingTop: 50,
		paddingBottom: 20,
	},
	paper: {
		margin: theme.spacing(2, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#4cba75",
		color: "white",
		textTransform: "capitalize",
		height: 40,
		width: "auto",
		padding: "0 30px",
		fontSize: 15,
	},
	title: {
		fontWeight: "bold",
		color: "#4cba75",
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	gridFull: {
		maxWidth: "49%",
	},
	formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
}));
