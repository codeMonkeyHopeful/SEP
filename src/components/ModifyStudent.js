import React, { Component } from "react";
import axios from "axios";

export default class ModifyStudent extends Component {
  constructor() {
    super();

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
