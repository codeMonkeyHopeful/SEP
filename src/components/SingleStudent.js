import React, { Component, useEffect } from "react";
import { getSingleStudent } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

export const SingleStudent = props => {
  const id = props.match.params.id;
  useEffect(() => {
    props.getSingleStudentReact(id);
  }, []);
  return (
    <div>
      <img
        src={props.student.imageURL}
        alt="there should be an image here"
        height="200"
        width="200"
      />
      <div>
        <b>Name: </b>
        {`${props.student.firstName} ${props.student.lastName}`}
      </div>
      <div>
        <b>Email: </b>
        {`${props.student.email}`}
      </div>
      <div>
        <b>GPA: </b>
        {`${props.student.gpa}`}
      </div>
      <h3>
        <u>Campus</u>
      </h3>
      <div>
        <Link to={`/campuses/${props.student.campus.id}`}>
          <div>{props.student.campus.name}</div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { student: state.singleStudent };
};

const mapDispatchToProps = dispatch => ({
  getSingleStudentReact: id => dispatch(getSingleStudent(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);
