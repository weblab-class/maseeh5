import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";

const GOOGLE_CLIENT_ID = "391573326550-t7jv56qpqp8gg5j5ntuunn7akl20b58l.apps.googleusercontent.com";

/**
 * Navbar is a component for displaying the navigation bar at the top of all pages.
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="Navbar-container u-flex-between">
        <Link to="/" className="Navbar-link Navbar-home">
          Thought For Food
        </Link>
        {this.props.userId && (
          <div className="Navbar-linkContainer">
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button className="Navbar-link Navbar-logout" onClick={renderProps.onClick}>
                  Logout
                </button>
              )}
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
            />
            <Link to="/profile" className="Navbar-link">
              <div className="Navbar-image" />
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
