import React from 'react'
import firebase from '../util/Firebase';


const FileUploader = (props) => {
    const uploadFiles = (event) => {
        const storageRef = firebase.storage().ref().child("Forms_files");
        const userRef = storageRef.child(this.context.currentUser.uid)
        const formRef = userRef.child(this.state.main_title)
  
        const files = event.target.files
        console.log(files)
        Array.from(files).forEach(file => {
          const fileRef = formRef.child(file.name)
          const task = fileRef.put(file)
          task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            console.log(url);
          })
          .catch(console.error);
        })
      }

    return (
        <div>
        <p>HELLLO</p>
            <p style={{textAlign: "left"}}>Full answers: {JSON.stringify(props.answers)}</p>
            <p style={{textAlign: "left"}}>Short answers: {JSON.stringify(props.shortAnswers)}</p>
            {props.questions.map((el, i) => {
                return (
                <div key={i}>
                {el.attachMaterials ? <div>
                    <h5>{el.title}</h5>
                    <input type="file" name="filefield" multiple="multiple" onChange={uploadFiles} />
                </div> : null}
                </div>
                )
            })}
        </div>
    )
}

export default FileUploader