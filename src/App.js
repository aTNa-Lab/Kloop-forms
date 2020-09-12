import React, {Component} from 'react';
import "./App.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./Components/auth/Home";
import Login from "./Components/auth/Login";
import SignUp from "./Components/auth/SignUp";
import { AuthProvider } from "./util/Auth";
import PrivateRoute from "./util/PrivateRoute";


class App extends Component {

  render () {
    return (
      <div className="App">
      <AuthProvider>
         <Router>
          <div>
            {/* <nav>
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
            </nav> */}

            {/* <Switch> */}
              <PrivateRoute exact path={"/"} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              {/* {this.state.forms.map((el, i) => (
                <Route key={i} path={el.path}>
                  {() => <Template url={el.url + window.location.search} />}
                </Route>
                ))} */}
            {/* </Switch> */}
          </div>
        </Router>
        </AuthProvider>
      </div>
    );
  }
}


export default App;
