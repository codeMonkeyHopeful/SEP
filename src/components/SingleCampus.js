import React, { Component, useEffect } from "react";
import { getSingleCampus } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

export const SingleCampus = props => {
  const id = props.match.params.id;
  useEffect(() => {
    props.getSingleCampusReact(id);
  }, []);
  return (
    <div>
      <div>
        <div key={props.campus.id}>{`University: ${props.campus.name}`}</div>
        <img
          src={props.campus.imageURL}
          alt="there should be an image here"
          height="200"
          width="200"
        />
        <div>{`Location: ${props.campus.address}`}</div>
        <div>{`Who we are: ${props.campus.description}`}</div>
      </div>
      <h3>Attending Students</h3>
      {props.campus.students.map(student => {
        return (
          <Link to={`/students/${student.id}`}>
            <div>{`${student.firstName} ${student.lastName}`}</div>
          </Link>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { campus: state.singleCampus };
};

const mapDispatchToProps = dispatch => ({
  getSingleCampusReact: id => dispatch(getSingleCampus(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);
