import React, { Component } from 'react';
import { connect } from "react-redux";

import { authenticateUser } from "../../actions/authAction";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    }
  }

  componentWillMount() {
   this.setState({
     error: this.props.auth.error
   });
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.authenticateUser(user, this.props.history);
  }

  render() {
    let appendError = this.state.error !== null ? (
      <div className="alert alert-danger text-center">
        <span className="alert-msg">{this.state.error}</span>
      </div>
    ) : (
      <div></div>
    )
    return (
      <div className="container">
        <div className="my-4">
          {appendError}
          <div className="login-header text-center my-3">
            <h2>Login</h2>
          </div>
          <form onSubmit={this.onHandleSubmit.bind(this)} >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" className="form-control" placeholder="Enter Username..."
              onChange={this.onHandleChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="form-control" placeholder="Enter Password..."
              onChange={this.onHandleChange.bind(this)} />
            </div>
            <button type="submit" className="btn btn-success">LOGIN</button>
          </form>
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

export default connect(mapStateToProps, { authenticateUser })(Login);