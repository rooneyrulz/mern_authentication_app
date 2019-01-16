import React, { Component } from 'react';
import { connect } from "react-redux";

import { getDashboard } from "../../actions/authAction";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="my-4">
          <div className="jumbotron text-center bg-danger text-light">
            <div className="container">
              <h1>WELCOME TO DASHBOARD</h1>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              <a href="https://www.github.com/rooneyrulz" className="btn btn.lg btn-light p-3">VISIT REPOSITORY</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer
  };
}


export default connect(mapStateToProps, { getDashboard })(DashBoard);
