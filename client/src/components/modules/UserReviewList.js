import React, { Component } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import UserReview from "./UserReview";

/**
 * UserReviewList is a component for displaying all of the reviews for a user.
 *
 * @param {Object} user
 * @param {Number} filterRating
 * @param {String} search
 * @param {String} orderBy
 */
class UserReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    get("/api/reviews", { creator_id: this.props.user }).then((reviews) =>
      this.setState({ reviews: reviews })
    );

    socket.on("review", (newReview) => {
      if (newReview.user._id === this.props.user._id) {
        this.setState({ reviews: this.state.reviews.unshift(newReview) });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.reviews.map((review) => (
          <UserReview
            key={review._id}
            rating={review.rating}
            venue={review.food.venue.name}
            foodItem={review.food.name}
            date={review.timestamp}
            content={review.content}
          />
        ))}
      </div>
    );
  }
}

export default UserReviewList;
