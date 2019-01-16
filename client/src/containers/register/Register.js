import React, { Component } from 'react';
import { connect } from "react-redux";

import { postUser } from "../../actions/authAction";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: ""
    }
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "" || this.state.username === "" || this.state.password === "") {
      alert(`please fill out all fields...`);
      this.props.history.push('/register');
    } else {
      let user = {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      };
      this.props.postUser(user, this.props.history);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="my-4">
        <div className="register-header text-center my-3">
            <h2>Sign Up</h2>
          </div>
          <form onSubmit={this.onHandleSubmit.bind(this)} >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" className="form-control" placeholder="Enter Name..."
              onChange={this.onHandleChange.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="form-control" placeholder="Enter Email..."
              onChange={this.onHandleChange.bind(this)} />
            </div>
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
            <button type="submit" className="btn btn-success">REGISTER</button>
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

export default connect(mapStateToProps, { postUser })(Register);
