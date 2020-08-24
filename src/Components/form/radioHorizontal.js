import React from 'react';
import Radio from '@material-ui/core/Radio';
import {makeStyles} from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		alignItems: 'center'
	},
}))


export default function RadioHorizontal(props) {
	const classes = useStyles()
	const [value, setValue] = React.useState({});
	const index = props.index
	let tmp = {}

	const handleChange = id => event => {
		tmp = {...value}
		tmp[id] = event.target.value
		setValue(tmp)
		props.returnAnswer(tmp, index)
	};

	return (
		<div>
			<h4>{props.title}</h4>
			<div className="question_item">
			{props.subquestion.map((question, id) => 
				<Grid container key={id} className={classes.root} spacing={2}>
					<Grid item>
						<p>{question}</p>
					</Grid>
					<Grid item>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="position" name="position" onChange={handleChange(id)}>
								{props.answers.map((el, i) =>
									<FormControlLabel
										key={i}
										value={el}
										control={<Radio color="primary"/>}
										label={id > 0 ? "" : el}
										labelPlacement="top"
									/>
								)}
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			)}
			</div>
		</div>
	);
}