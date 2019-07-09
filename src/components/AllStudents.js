import React, { Component, useEffect } from "react";
import { getStudents } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

const AllStudents = props => {
  useEffect(() => {
    props.getStudentsReact();
  }, []);
  return (
    <div>
      <h3>All Students</h3>
      <ul>
        {props.students.map(student => {
          return (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                <div>{`${student.firstName} ${student.lastName}`}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { students: state.students };
};

const mapDispatchToProps = dispatch => ({
  getStudentsReact: () => dispatch(getStudents())
});
const Students = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);

export default Students;
