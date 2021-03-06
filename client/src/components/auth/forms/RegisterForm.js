import React, { Component } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

class RegisterForm extends Component {
  state = {
    newUser: {
      name: "",
      email: "",
      password: "",
      password2: ""
    }
  };

  onChange = e => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.submit(this.state.newUser);
  };

  render() {
    const { newUser } = this.state;
    const { errors } = this.props;

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                placeholder="Name"
                name="name"
                value={newUser.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
                placeholder="Email Address"
                name="email"
                value={newUser.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <small className="form-text text-muted">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password2
                })}
                placeholder="Confirm Password"
                name="password2"
                value={newUser.password2}
                onChange={this.onChange}
              />

              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default RegisterForm;
