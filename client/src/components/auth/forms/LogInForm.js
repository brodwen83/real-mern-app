import React, { Component } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

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
            <div className="form-group">
              <input
                type="email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                placeholder="Email Address"
                name="email"
                value={userData.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
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
