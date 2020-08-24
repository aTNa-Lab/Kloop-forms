import React, {Component} from 'react';
import "./App.css"

import Box from '@material-ui/core/Box';
import TextInput from "./Components/form/textInput";
import SelectBox from "./Components/form/selectBox";
import RadioButton from "./Components/form/radiobutton";
import TimePickers from "./Components/form/timePickers";
import RadioHorizontal from "./Components/form/radioHorizontal";
import Next from "./Components/form/button";

const queryString = require('query-string');


class App extends Component {
	state = {
		questions: [],
		main_title: '',
		gateway: '',
		answers: {}
	}

	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (urlString.url) {
			fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						questions: data.questions,
						main_title: data.main_title,
						gateway: data.gateway
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}

	uploadData = (data) => {
		fetch('https://example.com/profile', {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(
			response => response.json()
		).then(
			success => console.log(success)
		).catch(
			error => console.log("Error", error)
		);
	}

	returnAnswer = (answer, index) => {
		let answers = {...this.state.answers}
		answers[index] = answer
		this.setState({answers: answers})
	}

  render () {
    let questionList = this.state.questions.map((el, i) => {
      if (el.type === 'input') {
        return <TextInput key={i} index={i} title={el.title} returnAnswer={this.returnAnswer} />
      }
      else if (el.type === 'select') {
        return <SelectBox key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer} />
      }
      else if (el.type === 'radio') {
        return <RadioButton key={i} index={i} title={el.title} answers={el.answer} returnAnswer={this.returnAnswer} />
      }
      else if (el.type === 'time') {
        return <TimePickers key={i} index={i} title={el.title} returnAnswer={this.returnAnswer} />
      }
      else if (el.type === 'multiradio') {
        return <RadioHorizontal key={i} index={i} title={el.title} subquestion={el.subquestion} answers={el.answer} returnAnswer={this.returnAnswer} />
      }
    })

    return (
      <div className="App">
        <h1 className="text-align-center">{this.state.main_title}</h1>
        <button onClick={() => this.uploadData("HELLo")}></button>
        <button onClick={() => console.log(this.state)}>Show state</button>
        {questionList}
      </div>
    );
  }
}


export default App;
