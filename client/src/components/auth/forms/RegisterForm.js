import React, { Component } from "react";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";

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
            <TextFieldGroup
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={this.onChange}
              name="name"
              error={errors.name}
            />

            <TextFieldGroup
              type="email"
              placeholder="example@example.com"
              value={newUser.email}
              onChange={this.onChange}
              name="email"
              error={errors.email}
              info="This site uses Gravatar so if you want a profile image, use a
            Gravatar email"
            />

            <TextFieldGroup
              type="password"
              placeholder="Make it secure"
              value={newUser.password}
              onChange={this.onChange}
              name="password"
              error={errors.password}
            />

            <TextFieldGroup
              type="password"
              placeholder="Make it secure"
              value={newUser.password2}
              onChange={this.onChange}
              name="password2"
              error={errors.password2}
            />
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
