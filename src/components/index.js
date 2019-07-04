import React, { Component } from "react";
import Navbar from "./Navbar";
import AllCampuses from "./AllCampuses";
import Redux from "redux";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <AllCampuses />
      </div>
    );
  }
}

export default App;
