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
            <nav>
            <li>
                <Link to={"/" + window.location.search}>Home</Link>
            </li>
            </nav>

              <PrivateRoute exact path={"/"} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
        </AuthProvider>
      </div>
    );
  }
}


export default App;
