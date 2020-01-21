import React, { Component } from "react";
import VenueDropdown from "./VenueDropdown";

import "../../utilities.css";
import "./VenueSelector.css";
import { get } from "../../utilities";

/**
 * VenueSelector is a component for switching the venue the user is viewing
 *
 * Proptypes
 * @param {object} venue
 */

class VenueSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      currentVenue: "",
      dropdown: false,
    };
  }

  componentDidMount() {
    get("/api/venues").then((data) => {
      this.setState({
        currentVenue: data.filter((venue) => venue._id === this.props.venueId)[0].name,
      });
      this.setState({
        venues: data.filter((venue) => venue._id !== this.props.venueId),
      });
    });
  }

  dropdownOn = () => {
    this.setState({ dropdown: true });
  };

  dropdownOff = () => {
    this.setState({ dropdown: false });
  };

  render() {
    let venueList = this.state.venues.map((venueObj) => (
      <VenueDropdown venueId={venueObj._id} venueName={venueObj.name} />
    ));
    return (
      <>
        {this.state.currentVenue ? (
          this.state.dropdown ? (
            <div className="VenueSelector-card">
              <div className="u-pointer" onClick={this.dropdownOff}>
                {this.state.currentVenue}
                <span> &#9660;</span>
                {venueList}
              </div>
            </div>
          ) : (
            <div className="VenueSelector-card u-pointer" onClick={this.dropdownOn}>
              {this.state.currentVenue}
              <span> &#9660;</span>
            </div>
          )
        ) : (
          <div className="VenueSelector-pageLoading">Page Loading!</div>
        )}
      </>
    );
  }
}

export default VenueSelector;
