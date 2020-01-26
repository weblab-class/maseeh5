import React, { Component } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";
import Rating from "./Rating";

import "../../utilities.css";
import "./FilterBox.css";

/**
 * FilterBox is used to switch how the information on the page displays
 *
 * Proptypes
 * @param {String} ratings
 * @param {String} alphabetical
 */
class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  updateRating = (value) => {
    this.setState({ rating: value });
  };

  componentDidMount() {
    get("/api/ratings").then((data) => {
      this.setState({ ratings: data });
    });
  }

  handleSelect = (event) => {
    navigate(`/feed/${event.target.value}`).then(() => window.location.reload());
  };

  render() {
    return (
      <>
        <div className="FilterSelector-card centerText">
          Filter
          <p className="MakeMedium">
            <div>
              Rating:
              <Rating updateRating={this.updateRating} rating={this.state.rating} />
            </div>
          </p>
          <input type="text" className="FilterBar" placeholder="Search" />
          <select className="Orderby-DropDown" value="alphabetical">
            <option>Name</option>
          </select>
        </div>
      </>
    );
  }
}

export default FilterBox;
