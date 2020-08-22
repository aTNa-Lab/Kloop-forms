import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButton() {
	const [value, setValue] = React.useState('');

	const handleChange = (event) => {
		setValue(event.target.value)
	};

	return (
		<div>
			<h2>PSO chairperson male/female</h2>
			<FormControl const='fieldset'>
				<RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
					<FormControlLabel value="female" control={<Radio/>} label="Female"/>
					<FormControlLabel value="male" control={<Radio/>} label="Male"/>
				</RadioGroup>
			</FormControl>
		</div>
	)
		;
}