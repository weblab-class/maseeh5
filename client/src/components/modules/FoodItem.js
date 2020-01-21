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
  expandAddReview = () => {
    addingReview: true;
  };
  minimizeAddReview = () => {
    addingReview: false;
  };

  render() {
    return (
      <>
        <div className="FoodItem-container u-flex-between">
          <Rating rating={this.props.foodRating} />
          <div className="FoodItem-foodName u-bold">{this.props.name}</div>
          {this.state.expanded ? (
            <div className="u-flexColumn">
              <div onClick={this.minimize} className="u-pointer">
                -
              </div>
              <ReviewList
                foodId={this.props.foodId}
                venueId={this.props.venue._id}
                userId={this.props.userId}
              />
            </div>
          ) : (
            <div onClick={this.expand} className="u-pointer">
              +
            </div>
          )}
        </div>
        {this.state.expanded && (
          <div className="u-textCenter FoodItem-addReview u-pointer">Add Review</div>
        )}
      </>
    );
  }
}

export default FoodItem;
