import React, { Component, useEffect } from "react";
import { getSingleCampus } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

export const SingleCampus = props => {
  const id = props.match.params.id;
  useEffect(() => {
    props.getSingleCampusReact(id);
  }, []);
  const hasStudents = props.campus.students ? true : false;
  return (
    <div>
      <div>
        <div key={props.campus.id}>
          <b>University: </b>
          {props.campus.name}
        </div>
        <img
          src={props.campus.imageURL}
          alt="there should be an image here"
          height="200"
          width="200"
        />
        <div>
          <b>Location: </b>
          {props.campus.address}(<a href={props.campus.mapLocation}>Map</a>)
        </div>
        <hr />
        <div>
          <b>Who we are: </b>
          {props.campus.description}
        </div>
      </div>
      <hr />
      <h3>
        <u>Attending Students</u>
      </h3>

      {hasStudents ? (
        props.campus.students.map(student => {
          return (
            <Link to={`/students/${student.id}`}>
              <div>{`${student.firstName} ${student.lastName}`}</div>
            </Link>
          );
        })
      ) : (
        <h1>test</h1>
      )}
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
