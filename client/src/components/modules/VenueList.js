import React, { Component } from "react";
import VenueCard from "./VenueCard.js";

import "./VenueList.css";
import "../../utilities.css";
import { get } from "../../utilities";

/**
 * VenueList is a component for displaying all of the Venue cards
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [
        {
          _id: "lskdajflka",
          name: "Maseeh",
        },
      ],
    };
  }

  //   componentDidMount() {
  //     get(`/api/venues`).then((data) => {
  //       this.setState({
  //         venues: this.state.venues.concat([data]),
  //       });
  //     });
  //   }

  render() {
    return (
      <div className="VenueList-container">
        {this.state.venues.map((venue) => (
          <VenueCard venue={venue} />
        ))}
      </div>
    );
  }
}

export default Login;
