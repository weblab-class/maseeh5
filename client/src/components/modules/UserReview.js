import React, { Component } from "react";
import "./UserReview.css";

/**
 * The Profile Page shows users their past reviews as well as their profile pic.
 *
 * Proptypes
 * @param {string} venue
 * @param {string} foodItem
 * @param {Date} date
 * @param {string} content
 */
class UserReview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="User-reviews">
        <p>Dining Hall: {this.props.venue}</p>
        <p>Food Item: {this.props.foodItem}</p>
        <p>Date: {this.props.date}</p>
        <p>Rating: {this.props.rating}</p>
        <p>Review: {this.props.content}</p>
      </div>
    );
  }
}

export default UserReview;
