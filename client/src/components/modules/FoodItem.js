import React, { Component } from "react";
import { get } from "../../utilities";
import ReviewList from "./ReviewList";
import NewReview from "./NewReview";
import Rating from "./Rating";

import "./FoodItem.css";

/**
 * FoodItem is a component for creating cards for each foodItem.
 *
 * Proptypes
 * @param {VenueObj} venue
 * @param {number} foodRating
 * @param {String} name
 * @param {String} foodId
 */
class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      addingReview: false,
      reviews: undefined,
    };
  }

  componentDidMount() {
    get("/api/reviews", { food_id: this.props.foodId }).then((data) => {
      this.setState({ reviews: data });
    });
  }

  // Displays review list portion of card
  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  // Displays add review portion of card
  toggleAdd = () => {
    this.setState({ addingReview: !this.state.addingReview });
  };

  newReviewSubmit = (newReview) => {
    this.setState({ reviews: this.state.reviews.concat(newReview) });
    this.setState({ addingReview: false });
  };

  newReviewCancel = (newReview) => {
    this.setState({ addingReview: false });
  };

  render() {
    return (
      <div className="FoodItem-largeContainer">
        <div className="FoodItem-container u-pointer u-flex-between" onClick={this.toggleExpanded}>
          <Rating rating={this.props.foodRating} />
          <div className="u-bold u-flex-justifyCenter">{this.props.name}</div>
          <div className="FoodItem-empty" />
        </div>

        {/* displays review list when expanded */}
        {this.state.expanded && (
          <ReviewList
            className="FoodItem-reviewList"
            foodId={this.props.foodId}
            reviews={this.state.reviews}
          />
        )}

        {/* displays add review link when not adding review */}
        {this.state.expanded && !this.state.addingReview && (
          <div className="FoodItem-addReview u-textCenter u-pointer" onClick={this.toggleAdd}>
            Add Review
          </div>
        )}

        {/* displays text fields to add review  */}
        {this.state.expanded && this.state.addingReview && (
          <div className="FoodItem-newReview">
            <NewReview
              venue={this.props.venue}
              foodId={this.props.foodId}
              onSubmit={this.newReviewSubmit}
              onCancel={this.newReviewCancel}
            />
          </div>
        )}
      </div>
    );
  }
}

export default FoodItem;
