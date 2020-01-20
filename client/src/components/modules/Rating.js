import React, { Component } from "react";

import "./NavBar.css";
import "../../utilities.css";

/**
 * Rating is a component for displaying informationa and logging in
 *
 * Proptypes
 * @param {function} handleLogin
 */

class Rating extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    <star-rating rating="rating" />;
  }
}

export default Rating;
