import React, { Component } from "react";
import { get } from "../../utilities";
import { Link } from "@reach/router";
import Rating from "./Rating";

import "./VenueCard.css";

/**
 * VenueCard is a component for displaying the information for a single venue.
 *
 * Proptypes
 * @param {Object} venue
 */
class VenueCard extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true };
  }

  componentDidMount() {
    get("/api/foods", { venue_id: this.props.venue._id }).then((foods) => {
      this.setState({ active: foods.length > 0 });
    });
  }

  render() {
    return (
      <div className="VenueCard-container u-textCenter">
        <div className="VenueCard-title u-bold">{this.props.venue.name}</div>
        <div className="VenueCard-ratingBox">
          Average Rating: <Rating rating={this.props.venue.rating} className="VenueCard-rating" />
        </div>
        {this.state.active ? (
          <Link to={`/feed/${this.props.venue._id}`}>
            <button className="VenueCard-buttonActive u-pointer">See More</button>
          </Link>
        ) : (
          <button className="VenueCard-buttonInactive">Closed</button>
        )}
      </div>
    );
  }
}

export default VenueCard;
