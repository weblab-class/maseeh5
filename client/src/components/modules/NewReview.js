import React, { Component } from "react";
import Rating from "./Rating";

import "../../utilities.css";
import "./NewReview.css";

/**
 * NewReview is a component for adding a new review.
 *
 * @param {String} userId
 * @param {Date} venue
 * @param {number} foodId
 */

class NewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      rating: 0,
    };
  }

  updateRating = (value) => {
    this.setState({ rating: value });
  };

  submitReview = () => {};

  render() {
    return (
      <>
        <div className="NewReview-container">
          <div className="u-flex">
            My Rating:{" "}
            <div className="NewReview-rating">
              <Rating updateRating={this.updateRating} rating={this.state.rating} />
            </div>
          </div>
          <div className="NewReview-textarea">
            <textarea type="text" placeholder="Write your review here" id="content" />
          </div>
          <div className="NewReview-flexRight">
            <button className="NewReview-cancel u-pointer">Cancel</button>
            <button className="NewReview-submit u-pointer" onClick={this.submitReview}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default NewReview;
