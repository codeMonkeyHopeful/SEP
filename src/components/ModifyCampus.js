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
        <label>Name</label>
        <input type="text" name="name" />
        <label>Address</label>
        <input type="text" name="address" />
        <button type="submit">Create Campus</button>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const address = event.target.address.value;
    axios
      .post("/api/campuses", (req, res, next) => {
        req.send({
          name: name,
          address: address
        });
      })
      .then(function(response) {
        console.log(response);
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
  createCampusReact: campus => dispatch(getSingleCampus(id)) //update
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyCampus);
