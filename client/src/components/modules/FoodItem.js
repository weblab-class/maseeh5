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
    this.state = {
      expanded: false,
      addingReview: false,
      reviews: undefined,
    };
  }

  componentDidMount() {
    get("/api/reviews", {food_id: this.props.foodId}).then((data) => {
      this.setState({reviews: data});
    });
  }

  // Adjusts information displayed on cards when + or - is clicked
  expand = () => {
    this.setState({expanded: true});
  };
  minimize = () => {
    this.setState({expanded: false});
  };

  // Displays add review portion of card
  changeAddReview = () => {
    if (this.state.addingReview === false) {
      this.setState({addingReview: true});
    } else {
      this.setState({addingReview: false});
    }
  };

  newReviewSubmit = (newReview) => {
    this.setState({reviews: this.state.reviews.concat(newReview)});
    this.setState({addingReview: false});
  };

  newReviewCancel = (newReview) => {
    this.setState({addingReview: false});
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
          <ReviewList className="FoodItem-reviewList" foodId={this.props.foodId} reviews={this.state.reviews} />
        )}

        {/* displays add review link when not adding review */}
        {this.state.expanded && !this.state.addingReview && (
          <div className="u-textCenter FoodItem-addReview u-pointer" onClick={this.changeAddReview}>
            Add Review
          </div>
        )}

        {/* displays text fields to add review  */}
        {this.state.expanded && this.state.addingReview && (
          <div className="FoodItem-newReview">
            <NewReview venue={this.props.venue} foodId={this.props.foodId} onSubmit={this.newReviewSubmit} onCancel={this.newReviewCancel}/>
          </div>
        )}
      </div>
    );
  }
}

export default FoodItem;
