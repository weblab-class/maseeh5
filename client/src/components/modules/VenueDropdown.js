import React, { Component } from "react";

import "../../utilities.css";
import "./VenueDropdown.css";

/**
 * VenueDropdown is a component for displaying the venue dropdown menu
 *
 * Proptypes
 * @param {String} venueId
 * @param {String} venueName
 */

class VenueDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="VenueDropdown-venueName">{this.props.venueName}</div>
      </>
    );
  }
}

export default VenueDropdown;
