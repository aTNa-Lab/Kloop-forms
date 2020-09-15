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
import FileUploader from './Components/FileUploader'


class App extends Component {

  render () {
    return (
      <div className="App">
      <AuthProvider>
         <Router>
          <div>
            <nav>
            <li>
                <Link to={"/Kloop-forms" + window.location.search}>Home</Link>
            </li>
            </nav>
              <Route path="/Kloop-forms/files" component={FileUploader} />
              <PrivateRoute exact path={"/Kloop-forms"} component={Home} />
              <Route exact path="/Kloop-forms/login" component={Login} />
              <Route exact path="/Kloop-forms/signup" component={SignUp} />
          </div>
        </Router>
        </AuthProvider>
      </div>
    );
  }
}


export default App;
