import React, { Component } from "react";
import Rating from "./Rating";

import "./UserReview.css";

/**
 * UserReview is a component for displaying a single review.
 *
 * Proptypes
 * @param {string} venue
 * @param {string} foodItem
 * @param {Date} date
 * @param {string} content
 * @param {Number} rating
 */
class UserReview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return (
      <div className="User-reviews">
        <div>Dining Hall: {this.props.venue}</div>
        <div>Food Item: {this.props.foodItem}</div>
        <div>Date: {new Date(this.props.date).toLocaleDateString(undefined, options)}</div>
        <div>
          Rating: <Rating rating={this.props.rating} />
        </div>
        <p>Review: {this.props.content}</p>
      </div>
    );
  }
}

export default UserReview;
