import React, { Component } from "react";
import rootReducer from "../Reducer";

export class AllCampuses extends Component {
  render() {
    return <div>{rootReducer.name}</div>;
  }
}

export default AllCampuses;
