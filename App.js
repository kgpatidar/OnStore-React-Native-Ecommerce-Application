import React, { Component } from "react";

import Navigator from "./Source/Screens/index";
import { Provider } from "react-redux";

import ReduxStore from "./Source/ReduxStore/ConfigureStore";

const store = ReduxStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
