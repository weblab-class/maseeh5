import React, { Component } from "react";
import Navbar from "../modules/Navbar";
import VenueList from "../modules/VenueList";

import "../../utilities.css";
import "./Home.css";

/**
 * Home displays all venue information after logging in
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 */

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: "Lunch",
    };
  }

  componentDidMount() {
    document.title = "Home Page";
  }

  render() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return (
      <>
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <div className="Home-container ">
          <div className="u-flex-justifyCenter">
            <div className="Home-dateCard u-textCenter u-bold">
              {new Date().toLocaleDateString(undefined, options)}: {this.state.meal}
            </div>
          </div>
          <VenueList />
        </div>
      </>
    );
  }
}

export default Home;
