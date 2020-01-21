import React, { Component } from "react";

// import "./RatingStar.css";
import "../../utilities.css";

/**
 * Rating is a component for displaying a single star.
 *
 * Proptypes
 * @param {Boolean} state
 * @param {Number} index
 * @param {function} update
 */
class RatingStar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleClick = (event) => {
    if (this.props.update) {
      this.props.update(this.props.index);
    }
  };

  render() {
    return (
      <span
        className={this.props.update ? "u-pointer RatingStar-mutable" : ""}
        onClick={this.handleClick}
      >
        {this.props.state ? "\u2605" : "\u2606"}
      </span>
    );
  }
}

export default RatingStar;
