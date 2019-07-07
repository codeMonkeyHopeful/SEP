import React, { Component, useEffect } from "react";
import { getStudents } from "../Reducer";
import { connect } from "react-redux";

const AllStudents = props => {
  useEffect(() => {
    props.getStudentsReact();
  }, []);
  return (
    <div>
      {props.students.map(student => {
        return (
          <div key={student.id}>{`${student.firstName} ${
            student.lastName
          }`}</div>
        );
      })}
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
