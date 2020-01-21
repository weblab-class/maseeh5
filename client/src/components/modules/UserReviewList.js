import React, { Component } from "react";
import { get } from "../../utilities";
import UserReview from "./UserReview";

import "../../utilities.css";

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
