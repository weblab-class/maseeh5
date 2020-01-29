import React, { Component } from "react";
import { get } from "../../utilities";
import Navbar from "../modules/Navbar";
import UserReviewList from "../modules/UserReviewList";
import ProfileFilterBox from "../modules/ProfileFilterBox";

import "./Profile.css";

/**
 * The Profile Page shows users their past reviews as well as their profile pic.
 *
 * Proptypes
 * @param {string} userId
 * @param {string} profileId
 * @param {function} handleLogout
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      filterRating: 0,
      search: "",
      orderBy: "date",
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { user_id: this.props.profileId }).then((user) =>
      this.setState({ user: user })
    );
  }

  updateRating = (value) => {
    this.setState({ filterRating: value });
  };

  updateSearch = (value) => {
    this.setState({ search: value });
  };

  updateOrderBy = (value) => {
    this.setState({ orderBy: value });
  };

  render() {
    if (!this.state.user) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Navbar userId={this.props.userId} handleLogout={this.props.handleLogout} />
        <div className="u-flex Profile-wrap">
          <div className="Profile-leftColumn">
            <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
            <div className="Profile-avatarContainer">
              <div
                className="Profile-avatar"
                style={{
                  backgroundImage: `url(${this.state.user.pictureurl})`,
                }}
              />
            </div>
            <ProfileFilterBox
              rating={this.state.filterRating}
              search={this.state.search}
              orderBy={this.state.orderBy}
              updateRating={this.updateRating}
              updateSearch={this.updateSearch}
              updateOrderBy={this.updateOrderBy}
            />
          </div>
          {/* <hr className="Profile-line" /> */}
          <div className="u-flex-justifyCenter Profile-reviews">
            <div className="Profile-subContainer u-textCenter">
              <h4 className="Profile-subTitle">Reviews</h4>
            </div>
            <UserReviewList
              user={this.props.profileId}
              filterRating={this.state.filterRating}
              search={this.state.search}
              orderBy={this.state.orderBy}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
