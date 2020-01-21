import React, { Component } from "react";
import Review from "./Review";

import "./ReviewList.css";
import "../../utilities.css";
import { get } from "../../utilities";

/**
 * ReviewList is a component for displaying all of the reviews for each food item.
 *
 * @param {String} foodId
 * @param {String} food
 */

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    get("/api/reviews", { food_id: this.props.foodId }).then((data) => {
      this.setState({ reviews: data });
    });
  }

  render() {
    let reviewCards = this.state.reviews.map((reviewObj) => (
      <Review
        key={`Card_${reviewObj._id}`}
        //date={reviewObj.timestamp}
        reviewRating={reviewObj.reviewRating}
        content={reviewObj.content}
        userName={reviewObj.user.name}
      />
    ));
    return <div>{reviewCards}</div>;
  }
}

export default ReviewList;
