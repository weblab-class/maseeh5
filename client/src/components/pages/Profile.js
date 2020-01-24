import React, { Component } from "react";
import { get } from "../../utilities";
import Navbar from "../modules/Navbar";
import UserReviewList from "../modules/UserReviewList";

import "./Profile.css";

/**
 * The Profile Page shows users their past reviews as well as their profile pic.
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { user_id: this.props.profileId }).then((user) =>
      this.setState({ user: user })
    );
  }

  render() {
    if (!this.state.user) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <div className="Profile-avatarContainer">
          <div className="Profile-avatar" />
        </div>
        <hr className="Profile-line" />
        <div className="u-flex-justifyCenter Profile-reviews">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle u-underline">Reviews</h4>
          </div>
          <UserReviewList user={this.props.profileId} />
        </div>
      </>
    );
  }
}

export default Profile;
