import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
  clearCurrentProfile
} from "../../redux/actions/profileActions";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import { logoutUser } from "../../redux/actions/authAction";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAccount();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if loginuser has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User is loggedin but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, clearCurrentProfile, logoutUser }
)(Dashboard);
