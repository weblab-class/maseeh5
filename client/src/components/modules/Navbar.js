import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";

const GOOGLE_CLIENT_ID = "391573326550-t7jv56qpqp8gg5j5ntuunn7akl20b58l.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages.
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 */
class NavBar extends Component {
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
            <Link to={`/profile/${this.props.userId}`} className="Navbar-link">
              <div className="Navbar-image" />
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBar;
