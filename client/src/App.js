import React, { Component } from "react";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/layouts/NavBar";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authAction";

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // decode token
  const decoded = jwtDecode(localStorage.jwtToken);

  // autheticate user
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
