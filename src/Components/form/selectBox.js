import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
}));

export default function SelectBox() {
	const classes = useStyles();
	const [n, setN] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		setN(event.target.value);
	};

	const handleClose = (event) => {
		setOpen(false)
	};

	const handleOpen = (event) => {
		setOpen(true)
	}

	return (
		<div>
			<h2>Ps no.:</h2>
			<FormControl className={classes.formControl}>
				<InputLabel id="controlled-open-select-label">Выбрать</InputLabel>
				<Select
					labelId="controlled-open-select-label"
					id="controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={n}
					onChange={handleChange}>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={6}>6</MenuItem>
					<MenuItem value={7}>7</MenuItem>
					<MenuItem value={8}>8</MenuItem>
					<MenuItem value={9}>9</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={11}>11</MenuItem>
					<MenuItem value={12}>12</MenuItem>
					<MenuItem value={13}>13</MenuItem>
					<MenuItem value={14}>14</MenuItem>
					<MenuItem value={15}>15</MenuItem>
					<MenuItem value={16}>16</MenuItem>
				</Select>
			</FormControl>
		</div>
	)

}