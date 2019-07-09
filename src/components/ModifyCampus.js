import React, { Component, useEffect } from "react";
import { getSingleCampus } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

export class ModifyCampus extends Component {
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
        <label>Description</label>
        <input type="text" name="description" />
        <button type="submit">Create Campus</button>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const newCampus = {
      name: event.target.name.value,
      address: event.target.address.value,
      description: event.target.description
    };
    console.log(newCampus);
    //createCampusReact(newCampus)
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
