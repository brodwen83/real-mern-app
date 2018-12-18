import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LogInForm from "./forms/LogInForm";
import { loginUser } from "../../redux/actions/authAction";

class Login extends Component {
  state = {
    errors: {}
  };

  submit = credentials => {
    this.props.loginUser(credentials);
  };

  componentWillReceiveProps = ({
    errors,
    auth: { isAuthenticated },
    history
  }) => {
    if (isAuthenticated) history.push("/dashboard");
    if (errors) this.setState({ errors });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <LogInForm submit={this.submit} errors={errors} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser }
)(Login);
