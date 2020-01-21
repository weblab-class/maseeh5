import React, { Component } from "react";
import NavBar from "../modules/NavBar";
import FilterBox from "../modules/FilterBox";
import FoodList from "../modules/FoodList";
import VenueSelector from "../modules/VenueSelector";

import "../../utilities.css";
import "./Feed.css";

/**
 * Feed is a component for viewing reviews
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 * @param {VenueObject} venue
 */

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRating: 0,
      search: "",
      orderBy: "",
    };
  }

  componentDidMount() {
    document.title = "Feed Page";
  }

  render() {
    return (
      <>
        <NavBar userId={this.props.userId} handleLogout={this.props.handleLogout} />
      </>
    );
  }
}

export default Feed;
