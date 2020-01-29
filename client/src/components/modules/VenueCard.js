import React, { Component } from "react";
import { Link } from "@reach/router";
import Rating from "./Rating";

import "./VenueCard.css";

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

  render() {
    return (
      <div className="VenueCard-container u-textCenter">
        <div className="VenueCard-title u-bold">{this.props.venue.name}</div>
        <div className="VenueCard-ratingBox">
          Average Rating: <Rating rating={this.props.venue.rating} className="VenueCard-rating" />
        </div>
        <Link to={`/feed/${this.props.venue._id}`}>
          <button className="VenueCard-button u-pointer">See More</button>
        </Link>
      </div>
    );
  }
}

export default VenueCard;
