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
      email: "",
      campus: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstname" required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastname" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Campus (optional)</label>
          <input type="number" name="campus" />
        </div>
        <button type="submit">Create Student</button>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const email = event.target.email.value;
    const campus = event.target.campus.value;
    axios
      .post("/api/students", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        campusId: campus
      })
      .then(function(response) {
        console.log(response);
      })
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
