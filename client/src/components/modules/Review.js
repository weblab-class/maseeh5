import React, { Component } from "react";

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
    return <>{this.props.userName}</>;
  }
}

export default Review;
