import React, {Component, useContext} from 'react';
import firebase from '../util/Firebase';
import "../App.css"
import { AuthContext } from "../util/Auth";

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
    showFileUpload: false,
    url: null
  }

  static contextType = AuthContext

  componentDidMount() {
      this.downloadData()
  }

  downloadData = () => {
      let urlString = queryString.parse(window.location.search, {decode: false})
      this.setState({url: this.props.url})
      if (this.state.url) {
          fetch(this.state.url)
              .then((response) => {
                  console.log("RESPONSE", response)
                  return response.json();
              })
              .then((data) => {
                  console.log("DATA", data);
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
  
  loadAttachmentQuestions = () => {
    let rootRef = firebase.database().ref().child('RE:Message')
    let userRef = rootRef.child(this.context.currentUser.uid)
    let formRef = userRef.child(this.state.main_title)
    let answerRef = formRef.child("Answers")

    answerRef.on('value', snap => {
       let answersList = Object.values(snap.val())
       let answer = answersList[answersList.length - 1]
       console.log(answer)
       for (const [key, value] of Object.entries(answer)) {
         if (value.m === "") {
            console.log(key, value)
            let file = [...this.state.files]
            file.push(key)
            this.setState({files: file})
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
    console.log(files)
    Array.from(files).forEach(file => {
      const fileRef = questionRef.child(file.name)
      const task = fileRef.put(file)
      task
      .then(snapshot => {
        console.log("SNAPSHOT", snapshot)
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
    render() {
    return (
        <div>
        <p>Hlello</p>
        {this.state.showFileUpload ? this.state.files.map((key, i) => {
            let el = this.state.questions[key]
            return (
              <div key={i}>
                <h5>{el.title}</h5>
                <input type="file" name="filefield" multiple="multiple" onChange={(e) => this.uploadFiles(e, key.toString())} />
              </div>
            )}) : null}
        </div>
    )
  }
}

export default FileUploader