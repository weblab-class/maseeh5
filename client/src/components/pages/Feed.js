import React, { Component } from "react";
import Navbar from "../modules/Navbar";
import VenueSelector from "../modules/VenueSelector";
import FilterBox from "../modules/FilterBox";
import FoodList from "../modules/FoodList";

import "./Feed.css";

/**
 * Feed is a component for viewing reviews
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 * @param {String} venueId
 */
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRating: 0,
      search: "",
      orderBy: "name",
    };
  }

  componentDidMount() {
    document.title = "Feed Page";
  }

  updateRating = (value) => {
    this.setState({ filterRating: value });
  };

  updateSearch = (value) => {
    this.setState({ search: value });
  };

  updateOrderBy = (value) => {
    this.setState({ orderBy: value });
  };

  render() {
    return (
      <>
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <div className="Feed-container">
          <div className="Feed-filterContainer">
            <VenueSelector venueId={this.props.venueId} className="Feed-venueSelector" />
            <FilterBox
              rating={this.state.filterRating}
              search={this.state.search}
              orderBy={this.state.orderBy}
              updateRating={this.updateRating}
              updateSearch={this.updateSearch}
              updateOrderBy={this.updateOrderBy}
            />
          </div>
          <FoodList
            venueId={this.props.venueId}
            filterRating={this.state.filterRating}
            search={this.state.search}
            orderBy={this.state.orderBy}
            className="Feed-foodList"
          />
        </div>
      </>
    );
  }
}

export default Feed;
