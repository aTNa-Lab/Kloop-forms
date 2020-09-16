import React, { useEffect, useState } from "react";
import app from "../../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Template from './../Template'
import FileUploader from './../FileUploader'

const queryString = require('query-string');


const Home = () => {
  const [forms, setForms] = useState([])
  const [home, setHome] = useState("")
  
  useEffect(() => {
    let urlString = queryString.parse(window.location.search)
    console.log(urlString)
    setHome(urlString.url)
		if (urlString.url) {
			fetch(urlString.url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
          setForms(data)
				});
		} else {
			console.log("ERROR: no url detected")
		}
  },[])

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <Router>
          <div>
            <nav>
              <ul>
              <li>
                  <Link to={"/?url=" + window.location.search}>Home</Link>
              </li>
                {forms.map((el, i) => (
                  <li key={i}>
                    <Link to={el.path + window.location.search}>{el.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Switch>
              {forms.map((el, i) => (
                <Route key={i} path={el.path}>
                  {() => <Template url={el.url} path={el.path} />}
                </Route>
                ))}
                <Route exact path="/files" component={withRouter(FileUploader)} />
            </Switch>
          </div>
        </Router>
    </>
  );
};

export default Home;
