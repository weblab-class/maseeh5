import React, { Component } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import Review from "./Review";

import "./ReviewList.css";

/**
 * ReviewList is a component for displaying all of the reviews for a food item.
 *
 * @param {String} foodId
 */
class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: undefined,
    };
  }

  componentDidMount() {
    get("/api/reviews", { food_id: this.props.foodId }).then((data) => {
      this.setState({ reviews: data });
    });

    socket.on("review", (newReview) => {
      if (newReview.food._id === this.props.foodId) {
        this.setState({ reviews: [newReview].concat(this.state.reviews) });
      }
    });
  }

  render() {
    // reviews not yet loaded
    if (!this.state.reviews) {
      return <div classname="ReviewList-pageLoading">Loading...</div>;
    }
    // no reviews exist
    if (this.state.reviews.length === 0) {
      return <div className="ReviewList-empty">No Reviews!</div>;
    }
    return (
      <div>
        {this.state.reviews.map((reviewObj) => (
          <Review
            key={reviewObj._id}
            timestamp={reviewObj.timestamp}
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
