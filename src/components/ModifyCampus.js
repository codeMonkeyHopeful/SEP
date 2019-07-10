import React, { Component, useEffect } from "react";
import { getCampuses } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import thunk from "redux-thunk";

class ModifyCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      description: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <label>Address</label>
        <input type="text" name="address" />
        <div>
          <label>ImageURL (optional)</label>
          <input type="text" name="image" />
        </div>
        <div>
          <button type="submit">Create Campus</button>
        </div>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, address, image } = event.target;
    axios
      .post("/api/campuses", {
        name: name.value,
        address: address.value,
        imageURL: image.value
      })
      .then(function(response) {
        console.log(response);
        return response;
      })
      .then()
      .catch(e => {
        console.log(e);
      });
  }
}

const mapStateToProps = state => {
  return { campus: state.campuses }; //update
};

const mapDispatchToProps = dispatch => ({
  getCampusesReact: () => dispatch(getCampuses())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyCampus);
