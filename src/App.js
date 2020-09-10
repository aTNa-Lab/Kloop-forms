import React, {Component} from 'react';
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Template from './Components/Template'

const queryString = require('query-string');


class App extends Component {
  state = {
    forms: [],
    mainUrl: ''
  }

	componentDidMount() {
		this.downloadData()
	}

	downloadData = () => {
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
					this.setState({
            forms: data,
            mainUrl: urlString.url
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}

  Home = () => {
    return <h2>Home</h2>;
  }
  
  FormA = () => {
    return <Template url={'https://raw.githubusercontent.com/aTNa-Lab/kloop-forms-config/master/form_A.json'} />
  }
  
  FormB = () => {
    return <Template url={'https://raw.githubusercontent.com/aTNa-Lab/kloop-forms-config/master/form_B.json'} />
  }
  
  FormC = () => {
    return <Template url={'https://raw.githubusercontent.com/aTNa-Lab/kloop-forms-config/master/form_C.json'} />
  }

  render () {
    return (
      <div className="App">
         <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to={"/" + window.location.search}>Home</Link>
                </li>
                {this.state.forms.map((el, i) => (
                  <li key={i}>
                    <Link to={el.path + window.location.search}>{el.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Switch>
              {this.state.forms.map((el, i) => (
                <Route key={i} path={el.path}>
                  {() => <Template url={el.url + window.location.search} />}
                </Route>
                ))}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
