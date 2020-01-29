import React, { Component } from "react";
import { get } from "../../utilities";
import VenueCard from "./VenueCard";

import "./VenueList.css";

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
    get("/api/venues").then((venues) => {
      this.setState({ venues: venues });
    });
  }

  render() {
    return (
      <div className="VenueList-container u-flex-justifyCenter">
        {this.state.venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    );
  }
}

export default VenueList;
