import React, { Component } from "react";

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
  
  render() {
    return (
      <span
        className={this.props.update ? "u-pointer RatingStar-mutable" : ""}
        onClick={this.props.update || undefined}
        onMouseEnter={this.props.highlight}
        onMouseLeave={this.props.unhighlight}
      >
        {this.props.state ? '\u2605' : '\u2606'}
      </span>
    )
  }
}

export default RatingStar;
