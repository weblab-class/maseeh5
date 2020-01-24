import React, { Component } from "react";
import { post } from "../../utilities";
import Rating from "./Rating";

import "./NewReview.css";

/**
 * NewReview is a component for adding a new review.
 *
 * @param {Date} venue
 * @param {Number} foodId
 * @param {function} onSubmit
 * @param {function} onCancel
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

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  };

  submit = () => {
    if (this.state.content && this.state.rating) {
      post("/api/review", {
        food_id: this.props.foodId,
        rating: this.state.rating,
        content: this.state.content,
      }).then((result) => this.props.onSubmit(result));
    }
  };

  render() {
    return (
      <>
        <div className="NewReview-container">
          <div className="u-flex">
            <div>
              My Rating:&emsp;
              <Rating updateRating={this.updateRating} rating={this.state.rating} />
            </div>
          </div>
          <div className="NewReview-textarea">
            <textarea
              type="text"
              placeholder="Write your review here"
              onChange={this.updateContent}
            />
          </div>
          <div className="NewReview-flexRight">
            <button className="NewReview-cancel u-pointer" onClick={this.props.onCancel}>
              Cancel
            </button>
            <button className="NewReview-submit u-pointer" onClick={this.submit}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default NewReview;
