import React, { Component } from "react";

import "./VenueCard.css";
import "../../utilities.css";

/**
 * VenueCard is a component for displaying the information for a single venue
 *
 * Proptypes
 * @param {VenueObject} venue
 */

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    console.log(this.props);
    return (
      <>
        <div className="VenueCard-container">
          <span className="u-bold">{this.props.venue.name}</span>
        </div>
      </>
    );
  }
}

export default Login;
