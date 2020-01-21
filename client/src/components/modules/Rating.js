import React, { Component } from "react";
import RatingStar from "./RatingStar";

import "./Rating.css";
import "../../utilities.css";

/**
 * Rating is a component for displaying and submitting a number of stars.
 *
 * Proptypes
 * @param {Number} rating
 * @param {function} updateRating - undefined indicates an immutable rating
 */
class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {highlighted: 0}
  }

  updateFactory = (index) => {
    return () => {
      if (this.props.updateRating) {
        this.props.updateRating(index);
      }
    }
  }

  highlightFactory = (index) => {
    return () => {
      if (this.props.updateRating) {
        this.setState({highlighted: index})
      }
    }
  }

  unhighlight = () => {
    if (this.props.updateRating) {
      this.setState({highlighted: 0})
    }
  }

  render() {
    const indices = [1,2,3,4,5];
    return (
      <div className="Rating-box">
        {indices.map(index => <RatingStar
          key={index}
          state={this.state.highlighted >= index || !this.state.highlighted && this.props.rating && this.props.rating >= index}
          update={this.props.updateRating && this.updateFactory(index)}
          highlight={this.props.updateRating && this.highlightFactory(index)}
          unhighlight={this.props.updateRating && this.unhighlight}
        />)}
      </div>
    )
  }
}

export default Rating;
