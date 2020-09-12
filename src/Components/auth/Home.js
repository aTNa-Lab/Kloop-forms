import React, { useEffect, useState } from "react";
import app from "../../util/Firebase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Template from './../Template'

const queryString = require('query-string');


const Home = () => {
  const [forms, setForms] = useState([])
  
  useEffect(() => {
    let urlString = queryString.parse(window.location.search)
		console.log(urlString)
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
                  {() => <Template url={el.url + window.location.search} />}
                </Route>
                ))}
            </Switch>
          </div>
        </Router>
    </>
  );
};

export default Home;
