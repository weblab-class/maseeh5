import React, { Component } from "react";
import RatingStar from "./RatingStar";

import "./Rating.css";
import "../../utilities.css";

/**
 * Rating is a component for displaying and submit a number of stars.
 *
 * Proptypes
 * @param {Number} rating
 * @param {function} updateRating - undefined indicates an immutable rating
 */
class Rating extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  update = (index) => {
    if (this.props.updateRating) {
      this.props.updateRating(index);
    }
  }

  render() {
    const indices = [1,2,3,4,5];
    return (
      <div className="Rating-box">
        {indices.map(index => <RatingStar key={index} index={index} state={this.props.rating >= index} update={this.props.updateRating && this.update} />)}
      </div>
    )
  }
}

export default Rating;
