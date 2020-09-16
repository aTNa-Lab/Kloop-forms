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

class FileUploader extends Component {
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
        if (urlString.url) {
          console.log(urlString)
            fetch(urlString.url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.setState({
                        questions: data.questions,
                        main_title: data.main_title,
                        gateway: data.gateway,
                        period: data.period
                    })
                    if (data.period) {
                      this.timeManager(data)
                    }
                    this.loadAttachmentQuestions()
                });
        } else {
            console.log("ERROR: no url detected")
        }
    }

    loadAttachmentQuestions = () => {
      let rootRef = firebase.database().ref().child('RE:Message')
      let userRef = rootRef.child(this.context.currentUser.uid)
      let formRef = userRef.child(this.state.main_title)
      let answerRef = formRef.child("Answers")

      answerRef.on('value', snap => {
        if (snap.val()) {
          let answersList = Object.values(snap.val())
          let answer = answersList[answersList.length - 1]
          for (const [key, value] of Object.entries(answer)) {
            if (value.m === "") {
              let file = [...this.state.files]
              file.push(key)
              this.setState({files: file})
           }
         }
        }
      })
      this.setState({showFileUpload: true})
    }

    uploadFiles = (event, title) => {
      const storageRef = firebase.storage().ref().child("Forms_files");
      const userRef = storageRef.child(this.context.currentUser.uid)
      const formRef = userRef.child(this.state.main_title)
      const questionRef = formRef.child(title)

      const files = event.target.files
      Array.from(files).forEach(file => {
        const fileRef = questionRef.child(file.name)
        const task = fileRef.put(file)
        task
        .then(snapshot => {
          let rootRef = firebase.database().ref().child('RE:Message')
          let userRef = rootRef.child(this.context.currentUser.uid)
          let formRef = userRef.child(this.state.main_title)
          let filepathsRef = formRef.child("Filepaths")
          filepathsRef.push(snapshot.metadata.fullPath)
          return snapshot.ref.getDownloadURL()
        })
        .then((url) => {
          console.log(url);
        })
        .catch(console.error);
      })
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
    
  
    render () {
      return (
        <div>
          <h1 className="text-align-center">{this.state.main_title}</h1>
          {this.state.files.map((key, i) => {
            let el = this.state.questions[key]
            console.log(key)
            return (
              <div key={i}>
                <h5>{el.title}</h5>
                <input disabled={this.state.locked} type="file" name="filefield" multiple="multiple" onChange={(e) => this.uploadFiles(e, key.toString())} />
              </div>
          )})}
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Full answers: {JSON.stringify(this.state.answers)}</p> : null}
          {this.state.showAnswers ? <p style={{textAlign: "left"}}>Short answers: {JSON.stringify(this.state.shortAnswers)}</p> : null}
        </div>
      );
    }
  }

  export default FileUploader