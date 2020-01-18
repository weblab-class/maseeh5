import React, { Component } from "react";
import LoginCard from "../modules/LoginCard.js";

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
        <LoginCard />
      </div>
    );
  }
}

export default Login;
