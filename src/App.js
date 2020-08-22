import React, { Component } from 'react';
import "./App.css"

import Box from '@material-ui/core/Box';
import TextInput from "./Components/form/textInput";
import SelectBox from "./Components/form/selectBox";
import RadioButton from "./Components/form/radiobutton";
import TimePickers from "./Components/form/timePickers";
import Next from "./Components/form/button";

const queryString = require('query-string');


class App extends Component {
  state = {
    data: {},
    answers: {}
  }

  componentDidMount() {
    this.downloadData()
  }

  downloadData = () => {
    let urlString =  queryString.parse(window.location.search, {decode: false})
    console.log(urlString)
    if (urlString.url) {
      fetch(urlString.url)
      .then((response) => {
        console.log("RESPONSE", response)
        return response.json();
    })
      .then((data) => {
        console.log("DATA", data);
        this.setState({data: data})
      });
    }
    else {
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

  getAnswer = (index, answer) => {
    let answers = {...this.state.answers}
    answers[index] = answer
    this.setState({answers: answers})
  }

  render () {
    return (
      <div className="App">
        <button onClick={() => this.uploadData("HELLo")}></button>
        <TextInput/>
        <SelectBox/>
        <RadioButton/>
        <TimePickers/>
        <Next/>
      </div>
    );
  }
}


export default App;
