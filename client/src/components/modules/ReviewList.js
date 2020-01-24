import React, { Component } from "react";
import Review from "./Review";

import "./ReviewList.css";

/**
 * ReviewList is a component for displaying all of the reviews for each food item.
 *
 * @param {String} foodId
 * @param {[Object]} reviews
 */
class ReviewList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // reviews not yet loaded
    if (!this.props.reviews) {
      return <div>Loading...</div>;
    }
    // no reviews exist
    if (this.props.reviews.length === 0) {
      return <div className="ReviewList-empty">No Reviews!</div>;
    }
    return (
      <div>
        {this.props.reviews.map((reviewObj) => (
          <Review
            key={reviewObj._id}
            date={reviewObj.timestamp}
            reviewRating={reviewObj.rating}
            content={reviewObj.content}
            user={reviewObj.creator}
          />
        ))}
      </div>
    );
  }
}

export default ReviewList;
