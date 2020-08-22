import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

export default function TimePickers() {
	const classes = useStyles();

	return (
		<div>
			<h2>Time of arrival:</h2>
			<form className={classes.container} noValidate>
				<TextField
					id="time"
					label="Alarm clock"
					type="time"
					defaultValue=""
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						step: 300,
					}}
				/>
			</form>
		</div>
	);
}