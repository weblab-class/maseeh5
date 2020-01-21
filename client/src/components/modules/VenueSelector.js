import React, { Component } from "react";
import { navigate } from "@reach/router"
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./VenueSelector.css";


/**
 * VenueSelector is a component for switching the venue the user is viewing
 *
 * Proptypes
 * @param {String} venueId
 */
class VenueSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: undefined,
    };
  }

  componentDidMount() {
    get("/api/venues").then((data) => {
      this.setState({venues: data});
    });
  }

  handleSelect = (event) => {
    navigate(`/feed/${event.target.value}`).then(() => window.location.reload());
  }

  render() {
    return (
      <>
        {this.state.venues ? (
          <select className="VenueSelector-card" value={this.props.venueId} onChange={this.handleSelect}>
            {this.state.venues.map((venueObj) => <option className="VenueSelector-option" key={venueObj._id} value={venueObj._id}>{venueObj.name}</option>)}
          </select>
        ) : (
          <div className="VenueSelector-pageLoading">Loading...</div>
        )}
      </>
    );
  }
}

export default VenueSelector;
