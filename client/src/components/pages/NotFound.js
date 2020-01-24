import React, { Component } from "react";
import Navbar from "../modules/Navbar";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-textCenter">
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <h1>404 Not Found</h1>
        <div>The page you requested couldn't be found :(.</div>
      </div>
    );
  }
}

export default NotFound;
