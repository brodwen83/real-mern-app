import React, { Component } from "react";
import RegisterForm from "./forms/RegisterForm";
import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

class Register extends Component {
  state = {
    errors: {}
  };

  submit = newUser => {
    this.props.registerUser(newUser);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <RegisterForm submit={this.submit} errors={this.state.errors} />
          {user ? user.name : null}
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
