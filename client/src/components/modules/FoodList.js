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
      foodItems: [
        {
          venue: "Maseeh",
          foodRating: "4",
        },
        {
          venue: "Maseeh",
          foodRating: "3",
        },
        {
          venue: "Maseeh",
          foodRating: "2",
        },
        {
          venue: "Maseeh",
          foodRating: "5",
        },
      ],
    };
  }

  componentDidMount() {
    get("/api/food").then((foodObjs) => {
      let reversedFoodObjs = foodObjs.reverse();
      reversedFoodObjs.map((foodObjs) => {
        this.setState({ foodItems: this.state.stories.concat([foodObj]) });
      });
    });
  }

  render() {
    let food = this.state.stories.map((foodObj) => (
      <FoodItem
        key={`Card_${foodObj._id}`}
        venue={foodObj.venue}
        foodRating={foodObj.foodRating}
        userId={this.props.userId}
      />
    ));
    return (
      <>
        <div>{food}</div>
      </>
    );
  }
}

export default FoodList;
