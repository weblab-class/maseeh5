import React, { Component } from "react";
import Rating from "./Rating";

import "./FilterBox.css";

/**
 * FilterBox is used to switch how the information on the page displays
 *
 * Proptypes
 * @param {Number} rating
 * @param {String} search
 * @param {String} orderBy
 * @param {Function} updateRating
 * @param {Function} updateSearch
 * @param {Function} updateOrderBy
 */
class FilterBox extends Component {
  constructor(props) {
    super(props);
  }

  handleSearch = (event) => {
    this.props.updateSearch(event.target.value);
  };

  handleSelect = (event) => {
    this.props.updateOrderBy(event.target.value);
  };

  render() {
    return (
      <div className="FilterBox-card u-textCenter">
        <div className="FilterBox-title">Filter</div>
        <div className="FilterBox-rating">
          Minimum Rating:
          <Rating updateRating={this.props.updateRating} rating={this.props.rating} />
        </div>
        <input
          className="FilterBox-search"
          type="text"
          placeholder="Search"
          value={this.props.search}
          onChange={this.handleSearch}
        />
        <div className="FilterBox-ordering">
          <div className="FilterBox-orderBy">Order By:</div>
          <select
            className="FilterBox-dropdown"
            value={this.props.orderBy}
            onChange={this.handleSelect}
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    );
  }
}

export default FilterBox;
