import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateProfileForm from "./CreateProfileForm";
import { createProfile } from "../../redux/actions/profileActions";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
  state = {
    errors: {}
  };

  submit = profileData => {
    this.props.createProfile(profileData, this.props.history);
  };

  componentWillReceiveProps = ({ errors }) => {
    this.setState({ errors });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <CreateProfileForm submit={this.submit} errors={errors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
