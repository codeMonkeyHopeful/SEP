import React, { Component } from "react";
import { getStudents } from "../Reducer";
import { connect } from "react-redux";
import { useEffect } from "react";

const AllStudents = props => {
  useEffect(() => {
    props.getStudentsReact();
  }, []);
  return (
    <div>
      {props.students.map(student => {
        return <div>{student.firstName}</div>;
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
