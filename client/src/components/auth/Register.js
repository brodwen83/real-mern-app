import React, { Component } from "react";
import RegisterForm from "./forms/RegisterForm";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

class Register extends Component {
  state = {
    errors: {}
  };

  submit = newUser => {
    this.props.registerUser(newUser, this.props.history);
  };

  componentWillReceiveProps = ({ errors }) => {
    // desctructure nextProps' {errors}
    if (errors) this.setState({ errors });
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <RegisterForm submit={this.submit} errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
