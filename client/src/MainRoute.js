import App from "./App";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

class MainRoute extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default MainRoute;
