import React, { Component } from "react";
import Review from "./Review";

import "./ReviewList.css";
import "../../utilities.css";
import { get } from "../../utilities";

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
    let reviewCards = null;
    if (this.props.reviews) {
      if (this.props.reviews.length !== 0) {
        reviewCards = this.props.reviews.map((reviewObj) => (
          <Review
            key={`Card_${reviewObj._id}`}
            //date={reviewObj.timestamp}
            reviewRating={reviewObj.rating}
            content={reviewObj.content}
            userName={reviewObj.creator.name}
          />
        ));
      } else {
        reviewCards = <div className="ReviewList-empty">No Reviews!</div>;
      }
    }
    return <div>{reviewCards}</div>;
  }
}

export default ReviewList;