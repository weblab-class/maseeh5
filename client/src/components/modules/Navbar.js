import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./NavBar.css";

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
      <nav className="NavBar-container u-flex-between">
        <Link to="/" className="NavBar-link">
          Thought For Food
        </Link>
        {this.props.userId && (
          <Link to={`/profile/${this.props.userId}`} className="NavBar-link" id="NavBar-profile" />
        )}
      </nav>
    );
  }
}
export default NavBar;
