import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import { Provider } from "react-redux";

import Navbar from "./containers/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import DashBoard from "./containers/dashboard/Dashboard";

import Store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div>
          <Router>
            <div className="App">
              <Navbar/>
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/dashboard" component={ DashBoard } />
                <Route exact path="/about" component={ About } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
