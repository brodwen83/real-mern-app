import React, { Component } from "react";
import RegisterForm from "./forms/RegisterForm";

class Register extends Component {
  submit = data => {
    console.log(data);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <RegisterForm submit={this.submit} />
        </div>
      </div>
    );
  }
}

export default Register;
