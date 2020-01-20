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
  }

  componentDidMount() {
    document.title = "Home Page";
  }

  render() {
    let currentDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    return (
      <>
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <div className="Home-container ">
          <div className="u-flex-justifyCenter">
            <div className="Home-dateCard u-textCenter u-bold">
              {day}, {month} {currentDate.getDate()}, {currentDate.getFullYear()}: Lunch
            </div>
          </div>
          <VenueList />
        </div>
      </>
    );
  }
}

export default Home;
