import React, { Component } from "react";
import ReviewList from "./ReviewList";
import NewReview from "./NewReview";
import Rating from "./Rating";

import "./FoodItem.css";
import "../../utilities.css";

import { get } from "../../utilities";

/**
 * FoodItem is a component for creating cards for each foodItem.
 *
 * Proptypes
 * @param {String} userId
 * @param {VenueObj} venue
 * @param {number} foodRating
 * @param {String} name
 * @param {String} foodId
 */

class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, addingReview: false };
  }

  // Adjusts information displayed on cards when + or - is clicked
  expand = () => {
    this.setState({ expanded: true });
  };
  minimize = () => {
    this.setState({ expanded: false });
  };

  // Displays add review portion of card
  changeAddReview = () => {
    if (this.state.addingReview === false) {
      this.setState({ addingReview: true });
    } else {
      this.setState({ addingReview: false });
    }
  };

  render() {
    return (
      <div className="FoodItem-largeContainer">
        <div className="FoodItem-container u-flex-between">
          <Rating rating={this.props.foodRating} />
          <div className="FoodItem-foodName u-bold u-flex-justifyCenter">{this.props.name}</div>
          {this.state.expanded ? (
            <div className="u-flexColumn">
              <div onClick={this.minimize} className="u-pointer">
                -
              </div>
            </div>
          ) : (
            <div onClick={this.expand} className="u-pointer">
              +
            </div>
          )}
        </div>

        {/* displays review list when expanded */}
        {this.state.expanded && (
          <>
            <ReviewList foodId={this.props.foodId} className="FoodItem-reviewList" />
            <div
              className="u-textCenter FoodItem-addReview u-pointer"
              onClick={this.changeAddReview}
            >
              Add Review
            </div>
          </>
        )}

        {/* displays add review functionality when clicked */}
        {this.state.expanded && !this.state.addingReview ? (
          <>
            <div
              className="u-textCenter FoodItem-addReview u-pointer"
              onClick={this.changeAddReview}
            >
              Add Review
            </div>
          </>
        ) : (
          <NewReview />
        )}
      </div>
    );
  }
}

export default FoodItem;
