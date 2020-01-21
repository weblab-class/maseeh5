import React, { Component } from "react";
import FoodItem from "./FoodItem";

import "./FoodList.css";
import "../../utilities.css";
import { get } from "../../utilities";

/**
 * FoodList is a component for displaying all of the FoodItem cards.
 *
 * Proptypes
 * @param {String} userId
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
        key={`Card_${foodObj._id}`}
        venue={foodObj.venue}
        foodRating={foodObj.foodRating}
        userId={this.props.userId}
        name={foodObj.name}
        foodId={foodObj._id}
      />
    ));
    return (
      <>
        <div className="FoodList-cards">{foodCards}</div>
      </>
    );
  }
}

export default FoodList;
