import React, { Component } from "react";
import { get } from "../../utilities";
import FoodItem from "./FoodItem";

import "./FoodList.css";

/**
 * FoodList is a component for displaying all of the FoodItem cards.
 *
 * Proptypes
 * @param {object} venue
 * @param {Number} filterRating
 * @param {String} search
 * @param {String} orderBy
 */
class FoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: undefined,
    };
  }

  fetchFoods = () => {
    get("/api/foods", {
      venue_id: this.props.venueId,
      search: this.props.search,
      min_rating: this.props.filterRating,
      sort_by: this.props.orderBy,
    }).then((foodObjs) => this.setState({ foodItems: foodObjs }));
  };

  componentDidMount() {
    this.fetchFoods();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.search !== prevProps.search ||
      this.props.filterRating !== prevProps.filterRating ||
      this.props.orderBy !== prevProps.orderBy
    ) {
      this.fetchFoods();
    }
  }

  render() {
    if (!this.state.foodItems) {
      return <div className="FoodList-pageLoading">Loading...</div>;
    }
    return (
      <div className="FoodList-cards">
        {this.state.foodItems.length
          ? this.state.foodItems.map((foodObj) => (
              <FoodItem
                key={foodObj._id}
                venue={foodObj.venue}
                name={foodObj.name}
                foodId={foodObj._id}
              />
            ))
          : "No items match your search."}
      </div>
    );
  }
}

export default FoodList;
