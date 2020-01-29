import React, { Component } from "react";
import { get } from "../../utilities";
import { socket } from "../../client-socket.js";
import ReviewList from "./ReviewList";
import NewReview from "./NewReview";
import Rating from "./Rating";

import "./FoodItem.css";

/**
 * FoodItem is a component for creating cards for each foodItem.
 *
 * Proptypes
 * @param {VenueObj} venue
 * @param {String} name
 * @param {String} foodId
 */
class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodRating: undefined,
      expanded: false,
      addingReview: false,
    };
  }

  updateRating = () => {
    get("/api/food_rating", { id: this.props.foodId }).then((result) => {
      this.setState({ foodRating: result.rating });
    });
  };

  componentDidMount() {
    this.updateRating();

    socket.on("review", (newReview) => {
      if (newReview.food._id === this.props.foodId) {
        this.updateRating();
      }
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

  render() {
    return (
      <div className="FoodItem-largeContainer">
        <div className="FoodItem-container u-pointer u-flex-between" onClick={this.toggleExpanded}>
          <Rating rating={this.state.foodRating} />
          <div className="u-bold u-flex-justifyCenter">{this.props.name}</div>
          <div className="FoodItem-empty" />
        </div>

        {/* displays review list when expanded */}
        {this.state.expanded && (
          <ReviewList className="FoodItem-reviewList" foodId={this.props.foodId} />
        )}

        {/* displays add review link when not adding review */}
        {this.state.expanded && !this.state.addingReview && (
          <div className="FoodItem-addReview u-textCenter u-pointer" onClick={this.toggleAdd}>
            + Add Review
          </div>
        )}

        {/* displays text fields to add review  */}
        {this.state.expanded && this.state.addingReview && (
          <div className="FoodItem-newReview">
            <NewReview
              venue={this.props.venue}
              foodId={this.props.foodId}
              onSubmit={this.toggleAdd}
              onCancel={this.toggleAdd}
            />
          </div>
        )}
      </div>
    );
  }
}

export default FoodItem;
