import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			width: '40ch',
		},
	},

}));


function BasicTextFields() {
	const classes = useStyles();

	return (
		<div>
			<form noValidate autoComplete="off">
				<h2>PS ID:</h2>
				<TextField className={classes.root}
				           id="standard-basic"
				           label="Мой ответ"/>
			</form>
		</div>
	);
}

export default BasicTextFields