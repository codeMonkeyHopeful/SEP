import React, { Component, useEffect } from "react";
import { getSingleCampus } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

export const ModifyCampus = props => {
  return <h1>1</h1>;
};

const mapStateToProps = state => {
  return { campus: state.singleCampus }; //update
};

const mapDispatchToProps = dispatch => ({
  getSingleCampusReact: id => dispatch(getSingleCampus(id)) //update
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyCampus);
