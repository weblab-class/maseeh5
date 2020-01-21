import React, { Component } from "react";
import Rating from "./Rating";

import "./Review.css";
import "../../utilities.css";
import { get } from "../../utilities";

/**
 * Review is a component for displaying a single review.
 *
 * @param {String} userName
 * @param {Date} date
 * @param {number} reviewRating
 * @param {String} content
 */

class Review extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      console.log(this.props.userName);
    }
    return (
      <>
        <div className="Review-container">
          <div className="u-flex-between">
            <div className="Review-userName u-bold">{this.props.userName}</div>
            <Rating rating={this.props.reviewRating} />
          </div>
          <div>{this.props.content}</div>
        </div>
      </>
    );
  }
}

export default Review;
