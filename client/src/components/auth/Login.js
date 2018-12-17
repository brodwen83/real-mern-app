import React, { Component } from "react";
import LogInForm from "./forms/LogInForm";

class Login extends Component {
  submit = data => {
    console.log(data);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <LogInForm submit={this.submit} />
        </div>
      </div>
    );
  }
}

export default Login;
