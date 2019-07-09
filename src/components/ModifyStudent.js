import React, { Component, useEffect } from "react";
import { getCampuses } from "../Reducer"; //update
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import thunk from "redux-thunk";

class ModifyStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>First Name</label>
        <input type="text" name="firstname" />
        <label>Last Name</label>
        <input type="text" name="lastname" />
        <label>Email</label>
        <input type="email" name="email" />
        <button type="submit">Create Student</button>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const email = event.target.email.value;
    axios
      .post("/api/students", (req, res, next) => {
        req.send({
          firstname: firstName,
          lastname: lastName,
          email: email
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
  return { student: state.students }; //update
};

const mapDispatchToProps = dispatch => ({
  createStudentReact: student => dispatch(getSingleCampus(id)) //update
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyStudent);
