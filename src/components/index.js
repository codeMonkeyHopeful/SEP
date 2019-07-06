import React, { Component } from "react";
import Main from "./Main";
import store from "../Reducer";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;
