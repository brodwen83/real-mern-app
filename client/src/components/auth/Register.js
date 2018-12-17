import React, { Component } from "react";
import RegisterForm from "./forms/RegisterForm";

import axios from "axios";

class Register extends Component {
  state = {
    errors: {}
  };

  submit = newUser => {
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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

export default Register;
