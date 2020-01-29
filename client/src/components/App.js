import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import { socket } from "../client-socket";
import { get, post } from "../utilities";

import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

import "../utilities.css";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    console.log("Logged out");
    this.setState({ userId: undefined });
    post("/api/logout");
    navigate("/");
  };

  render() {
    return (
      <>
        <Router>
          {this.state.userId ? (
            <Home path="/" userId={this.state.userId} handleLogout={this.handleLogout} />
          ) : (
            <Login
              path="/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
          )}
          <Feed path="/feed/:venueId" userId={this.state.userId} handleLogout={this.handleLogout} />
          <Profile
            path="/profile/:profileId"
            userId={this.state.userId}
            handleLogout={this.handleLogout}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
