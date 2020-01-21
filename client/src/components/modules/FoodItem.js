import React, { Component } from "react";
import ReviewList from "./ReviewList";
import NewReview from "./NewReview";
import Rating from "./Rating";

import "./FoodItem.css";
import "../../utilities.css";

/**
 * Rating is a component for displaying and submit a number of stars.
 *
 * Proptypes
 * @param {String} userId
 * @param {VenueObj} venue
 * @param {number} foodRating
 */

class FoodItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    <>{this.props._id}</>;
  }
}

export default FoodItem;
