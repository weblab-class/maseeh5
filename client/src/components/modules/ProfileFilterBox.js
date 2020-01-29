import React, { Component } from "react";
import Rating from "./Rating";

import "./ProfileFilterBox.css";

/**
 * ProfileFilterBox is used to switch how the information on the page displays
 *
 * Proptypes
 * @param {Number} rating
 * @param {String} search
 * @param {String} orderBy
 * @param {Function} updateRating
 * @param {Function} updateSearch
 * @param {Function} updateOrderBy
 */
class ProfileFilterBox extends Component {
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
      <div className="ProfileFilterBox-card u-textCenter">
        <div className="ProfileFilterBox-title">Filter</div>
        <div className="ProfileFilterBox-rating">
          <div className="ProfileFilterBox-minReview">Minimum Rating:</div>
          <Rating updateRating={this.props.updateRating} rating={this.props.rating} />
        </div>
        <input
          className="ProfileFilterBox-search"
          type="text"
          placeholder="Search"
          value={this.props.search}
          onChange={this.handleSearch}
        />
        <div className="ProfileFilterBox-orderBy">
          <div className="ProfileFilterBox-orderBy">Order By:</div>
          <select
            className="ProfileFilterBox-dropdown"
            value={this.props.orderBy}
            onChange={this.handleSelect}
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
            {/* <option value="food">Food (A-Z)</option> */}
            {/* <option value="venue">Dining Hall (A-Z)</option> */}
          </select>
        </div>
        <button className="ProfileFilterBox-reset u-pointer" onClick={this.props.reset}>
          Reset
        </button>
      </div>
    );
  }
}

export default ProfileFilterBox;
