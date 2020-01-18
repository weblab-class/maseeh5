import React, { Component } from "react";
import LoginCard from "../modules/LoginCard";
import Navbar from "../modules/Navbar";

import "../../utilities.css";
import "./Login.css";

/**
 * Login is a component for logging in to the app
 *
 * Proptypes
 * @param {string} handleLogin
 * @param {string} handleLogout
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Login Page";
  }

  render() {
    return (
      <div className="Login-background">
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <LoginCard />
      </div>
    );
  }
}

export default Login;
