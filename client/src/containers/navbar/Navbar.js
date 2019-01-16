import React, { Component } from 'react';
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logOutUser } from "../../actions/authAction";

import "./Navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    onLogOut = () => {
        this.props.logOutUser(this.props.history);
    }

    render() {
        const authenticatedHeaderLink = localStorage.getItem('access_token') ? (
          <Link className="navbar-brand" to="/dashboard">AUTHENTICATION</Link>
        ) : (
          <Link className="navbar-brand" to="/">AUTHENTICATION</Link>
        )

      const authenticatedLink = localStorage.getItem('access_token') ? (
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">DASHBOARD</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">ABOUT</NavLink>
                  </li>
              </ul>
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                      <a href="#!" onClick={this.onLogOut.bind(this)} className="nav-link">LOGOUT</a>
                  </li>
              </ul>
            </div>
      ) : (
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/register">SIGNUP</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                  </li>
              </ul>
          </div>
      )
      
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark px-lg-5">
            {authenticatedHeaderLink}
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span></button>
              { authenticatedLink }
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
};

export default withRouter(connect(mapStateToProps, { logOutUser })(Navbar));