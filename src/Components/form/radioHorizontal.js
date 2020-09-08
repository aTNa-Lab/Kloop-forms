import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import '../../App.css'

export default function RadioHorizontal(props) {
	const [value, setValue] = useState({});
	const [idx, setIdx] = useState({});
	let tmp = {}
	let idTmp = {}

	const {index, response} = props

	useEffect(() => {
		if (response) {
			setValue(response)
		}
	}, [response])

	const handleChange = id => event => {
		tmp = {...value}
		tmp[id] = event.target.value
		setValue(tmp)

		idTmp ={...idx}
		let i = props.answers.indexOf(event.target.value)
		idTmp[id] = i
		setIdx(idTmp)

		props.returnAnswer(tmp, index, idTmp)
	};

	const handleClear = () => {
		setValue({})
		props.returnAnswer({}, index)
	}

	return (
		<div className="radioHorizontal">
			<h4>{props.title}</h4>
			<button onClick={handleClear}>clear</button>
			<div className="question_item">
				{props.subquestion.map((question, id) =>
					<div className="question_item_" key={id}>
						<p>{question}</p>
						<FormControl component="fieldset" className="question_item__answer">
							<RadioGroup aria-label="position" name="position" className="question_item__answer_" value={value[id] ? value[id] : ""}
							            onClick={handleChange(id)}>
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
					</div>
				)}
			</div>
		</div>

	);
}
