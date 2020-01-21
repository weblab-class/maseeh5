import React, { Component } from "react";
import VenueCard from "./VenueCard";

import "./VenueList.css";
import "../../utilities.css";
import { get } from "../../utilities";

/**
 * VenueList is a component for displaying all of the Venue cards.
 */
class VenueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
    };
  }

  componentDidMount() {
    get(`/api/venues`).then((venues) => {
      this.setState({venues: venues});
    });
  }

  render() {
    return (
      <div className="VenueList-container u-flex u-flex-justifyCenter">
        {this.state.venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    );
  }
}

export default VenueList;
