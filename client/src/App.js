import React, { Component } from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
