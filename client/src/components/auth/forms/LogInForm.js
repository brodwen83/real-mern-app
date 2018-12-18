import React, { Component } from "react";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";

class LogInForm extends Component {
  state = {
    userData: {
      email: "",
      password: ""
    }
  };

  onChange = e => {
    this.setState({
      userData: { ...this.state.userData, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.userData);
  };

  render() {
    const { userData } = this.state;
    const { errors } = this.props;

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">
            Sign in to your DevConnector account
          </p>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="email"
              value={userData.email}
              onChange={this.onChange}
              name="email"
              error={errors.email}
            />
            <TextFieldGroup
              type="password"
              value={userData.password}
              onChange={this.onChange}
              name="password"
              error={errors.password}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

LogInForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LogInForm;
