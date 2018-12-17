import React, { Component } from "react";
import PropTypes from "prop-types";

class LogInForm extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {}
  };

  onChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.user);
  };

  render() {
    const { user } = this.state;

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
                className="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
                value={user.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={this.onChange}
              />
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
