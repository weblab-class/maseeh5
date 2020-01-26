import React, { Component } from "react";
import Navbar from "../modules/Navbar";
import LoginCard from "../modules/LoginCard";

import "./Login.css";

/**
 * Login is a page for logging in to the app
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogin
 * @param {function} handleLogout
 */
class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Login Page";
  }

  render() {
    return (
      <div className="Login-background">
        <LoginCard handleLogin={this.props.handleLogin} />
      </div>
    );
  }
}

export default Login;
