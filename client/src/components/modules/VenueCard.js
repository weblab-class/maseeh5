import React, { Component } from "react";
import Rating from "./Rating";

import "./VenueCard.css";
import "../../utilities.css";

/**
 * VenueCard is a component for displaying the information for a single venue.
 *
 * Proptypes
 * @param {VenueObject} venue
 */
class VenueCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div className="VenueCard-container u-textCenter">
          <div className="u-bold">{this.props.venue.name}</div>
          <Rating rating={this.props.venue.rating} />
          <button className="VenueCard-button u-pointer">See More</button>
        </div>
      </>
    );
  }
}

export default VenueCard;
