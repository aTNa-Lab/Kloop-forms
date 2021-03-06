import React, {Component, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

import TextInput from "./form/textInput";
import SelectBox from "./form/selectBox";
import RadioButton from "./form/radiobutton";
import TimePickers from "./form/timePickers";
import RadioHorizontal from "./form/radioHorizontal";
import { Link, BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom';

const queryString = require('query-string');

class Template extends Component {
    state = {
      questions: [],
      main_title: '',
      gateway: '',
      answers: {},
      shortAnswers: {},
      showAnswers: false,
      response: {},
      period: null,
      locked: false,
      files: [],
      showFileUpload: false
    }

    static contextType = AuthContext
  
    componentDidMount() {
        this.downloadData()
    }

    downloadData = () => {
        let urlString = queryString.parse(window.location.search, {decode: false})
        if (this.props.url) {
            fetch(this.props.url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        questions: data.questions,
                        main_title: data.main_title,
                        gateway: data.gateway,
                        period: data.period
                    })
                    if (urlString.response) {
                      this.initResponse(data, urlString)
                    }
                    if (data.period) {
                      this.timeManager(data)
                    }
                });
        } else {
            console.log("ERROR: no url detected")
        }
    }
  
    uploadData = () => {
      try {
        let rootRef = firebase.database().ref().child('RE:Message')
        let userRef = rootRef.child(this.context.currentUser.uid)
        let usernameRef = userRef.child("Username")
        usernameRef.set(this.context.currentUser.displayName)
        let emailRef = userRef.child("Email")
        emailRef.set(this.context.currentUser.email)
        let formRef = userRef.child(this.state.main_title)
        let answerRef = formRef.child("Answers")
        answerRef.push(this.state.answers)
        console.log("data uploaded")
        this.setState({showAnswers: true})
        this.setState({showFileUpload: true})
      }
      catch (err) {
        alert(err)
        this.setState({showAnswers: true})
      }
    }

    timeManager = (data) => {
      let now = new Date();
      let start = new Date(data.period.start);
      let finish = new Date(data.period.finish)

      if (start > now && data.period.before.nofill) {
        this.setState({locked: true})
      }
      else if (start < now && now < finish && data.period.in.nofill) {
        this.setState({locked: true})
      }
      else if (now > finish && data.period.after.nofill) {
        this.setState({locked: true})
      }
      else {
        this.setState({locked: false})
      }
      console.log("LOCKED ", this.state.locked)
    }

    initResponse = (data, urlString) => {
      let decodedResponse = decodeURI(urlString.response)
      let response = JSON.parse(decodedResponse)
      this.setState({response: response})
      for (const [key, value] of Object.entries(response)) {
        let id = null
        if (key === Object.keys(response)[0]) {
          this.returnAnswer(value, key)
        }
        if (data.questions[key].type === 'input') {
          this.returnAnswer(value, key)
        }
        else if (data.questions[key].type === 'time') {
          this.returnAnswer(value, key, value)
        }
        else if (data.questions[key].type === 'multiradio') {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            let id = data.questions[key].answer.indexOf(nestedValue)
            let idArr = {...this.state.shortAnswers[key]}
            idArr[nestedKey] = id
            this.returnAnswer(value, key, idArr)
          }
        }
        else {
          id = data.questions[key].answer.indexOf(value)
          this.returnAnswer(value, key, id)
        }
      }
    }
  
    returnAnswer = (answer, index, id = null) => {
      let answers = {...this.state.answers}
      if (this.state.questions[index].attachMaterials) {
        answers[index] = {a: answer, m: ""}
      }
      else {
        answers[index] = answer
      }
      this.setState({answers: answers})

      let shortAnswers = {...this.state.shortAnswers}
      shortAnswers[index] = id
      this.setState({shortAnswers: shortAnswers})
    }
    
  
    render () {
      let questionList = this.state.questions.map((el, i) => {
        const r = this.state.response

        if (el.type === 'input') {
          return <TextInput key={i} index={i} title={el.title} response={r[i]} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'select') {
          return <SelectBox key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'radio') {
          return <RadioButton key={i} index={i} title={el.title} response={r[i]} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'time') {
          return <TimePickers key={i} index={i} title={el.title} response={r[i]} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else if (el.type === 'multiradio') {
          return <RadioHorizontal key={i} index={i} title={el.title} response={r[i]} subquestion={el.subquestion} answers={el.answer} returnAnswer={this.returnAnswer} locked={this.state.locked} />
        }
        else {
          return null
        }
      })
  
      return (
        <div>
          <h1 className="text-align-center">{this.state.main_title}</h1>
          {this.state.showFileUpload ? <Redirect to={"/Kloop-forms/files?url=" + this.props.url} /> : null}
          <div>
            {questionList}
            <div style={{paddingTop: 20, paddingBottom: 20, textAlign: "center"}}>
              <button disabled={this.state.locked ? true : false} onClick={this.uploadData}>Send data</button>
            </div>
          </div>
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Full answers: {JSON.stringify(this.state.answers)}</p> : null}
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Short answers: {JSON.stringify(this.state.shortAnswers)}</p> : null}
        </div>
      );
    }
  }

  export default withRouter(Template)