import React, { Component, useEffect } from "react";
import { getStudents } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

const AllStudents = props => {
  useEffect(() => {
    props.getStudentsReact();
  }, []);
  return (
    <div>
      <h3>
        <u>All Students</u>
      </h3>
      <ul>
        {props.students.map(student => {
          return (
            <li key={student.id}>
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "row"
                }}
              >
                <Link to={`/students/${student.id}`}>
                  <div>{`${student.firstName} ${student.lastName}`}</div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    axios
                      .delete("/api/students", { data: { id: student.id } })
                      .then(response => {
                        console.log(response);
                      })
                      .then(props.getStudentsReact())
                      .catch(e => {
                        console.log(e);
                      });
                  }}
                >
                  &times;
                </button>
              </div>
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
