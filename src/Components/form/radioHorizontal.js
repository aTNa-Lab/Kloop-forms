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


export default function RadioHorizontal() {
	const classes = useStyles()

	return (
		<div>
			<h2>Вопрос</h2>
			<div className="question_item">
				<Grid container className={classes.root} spacing={2}>
					<Grid item>
						<p>Вопрос</p>
					</Grid>
					<Grid item>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="position" name="position">
								<FormControlLabel
									value="Yes"
									control={<Radio color="primary"/>}
									label="Yes"
									labelPlacement="top"
								/>
								<FormControlLabel
									value="No"
									control={<Radio color="primary"/>}
									label="No"
									labelPlacement="top"

								/>
								<FormControlLabel
									value="NA"
									control={<Radio color="primary"/>}
									label="NA"
									labelPlacement="top"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</div>
			<div className="question_item">
				<Grid container className={classes.root} spacing={2}>
					<Grid item>
						<p>Вопрос</p>
					</Grid>
					<Grid item>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="position" name="position">
								<FormControlLabel
									value="Yes"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"
								/>
								<FormControlLabel
									value="No"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"

								/>
								<FormControlLabel
									value="NA"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</div>
			<div className="question_item">
				<Grid container className={classes.root} spacing={2}>
					<Grid item>
						<p>Вопрос</p>
					</Grid>
					<Grid item>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="position" name="position">
								<FormControlLabel
									value="Yes"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"
								/>
								<FormControlLabel
									value="No"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"

								/>
								<FormControlLabel
									value="NA"
									control={<Radio color="primary"/>}
									label=""
									labelPlacement="top"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</div>
		</div>

	);
}