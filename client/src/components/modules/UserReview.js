import React, { Component } from "react";
import Rating from "./Rating";

import "./UserReview.css";

/**
 * The Profile Page shows users their past reviews as well as their profile pic.
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
        <p>Dining Hall: {this.props.venue}</p>
        <p>Food Item: {this.props.foodItem}</p>
        <p>Date: {new Date(this.props.date).toLocaleDateString(undefined, options)}</p>
        <p>
          Rating: <Rating rating={this.props.rating} />
        </p>
        <p>Review: {this.props.content}</p>
      </div>
    );
  }
}

export default UserReview;
