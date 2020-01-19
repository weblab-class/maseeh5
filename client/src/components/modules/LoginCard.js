import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "391573326550-t7jv56qpqp8gg5j5ntuunn7akl20b58l.apps.googleusercontent.com";

import "./LoginCard.css";
import "../../utilities.css";

/**
 * LoginCard is a component for displaying informationa and logging in
 *
 * Proptypes
 * @param {function} handleLogin
 */

class LoginCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="LoginCard-background u-textCenter">
        <div className="LoginCard-title">Thought for Food</div>
        <div className="LoginCard-subtitle">Rate the food served at your dining halls.</div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <button className="LoginCard-loginButton u-pointer" onClick={renderProps.onClick}>
              <span className="Skele-button-text">Login</span>
            </button>
          )}
          onSuccess={this.props.handleLogin}
          onFailure={(err) => console.log(err)}
        />
      </div>
    );
  }
}

export default LoginCard;