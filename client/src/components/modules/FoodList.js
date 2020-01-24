import React, { Component } from "react";
import { get } from "../../utilities";
import FoodItem from "./FoodItem";

import "./FoodList.css";

/**
 * FoodList is a component for displaying all of the FoodItem cards.
 *
 * Proptypes
 * @param {object} venue
 * @param {Function} filterRating
 * @param {String} search
 * @param {String} orderBy
 */
class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
    };
  }

  componentDidMount() {
    get("/api/foods", { venue_id: this.props.venueId }).then((foodObjs) => {
      this.setState({ foodItems: foodObjs });
    });
  }

  render() {
    let foodCards = this.state.foodItems.map((foodObj) => (
      <FoodItem
        key={foodObj._id}
        venue={foodObj.venue}
        foodRating={foodObj.rating}
        name={foodObj.name}
        foodId={foodObj._id}
      />
    ));
    return <div className="FoodList-cards">{foodCards}</div>;
  }
}

export default FoodList;
