import React, { Component } from "react";
import { Link } from "@reach/router";
import Rating from "./Rating";

import "./Review.css";
import "../../utilities.css";

/**
 * Review is a component for displaying a single review.
 *
 * @param {Object} user
 * @param {Date} date
 * @param {number} reviewRating
 * @param {String} content
 */

class Review extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="Review-container">
          <div className="u-flex-between">
            <Link to={`/profile/${this.props.user._id}`} className="Review-userLink u-bold">
              {this.props.user.name}
            </Link>
            <div className="u-flex">
              <div className="Review-rating">
                Rating:&emsp;
                <Rating rating={this.props.reviewRating} />
              </div>
            </div>
          </div>
          <div className="Review-content">{this.props.content}</div>
        </div>
      </>
    );
  }
}

export default Review;
