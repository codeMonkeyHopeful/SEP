import React, { Component } from "react";
import axios from "axios";

export default class ModifyCampus extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <label>Address</label>
        <input type="text" name="address" />
        <div>
          <label>ImageURL (optional)</label>
          <input type="text" name="image" />
        </div>
        <div>
          <button type="submit">Create Campus</button>
        </div>
      </form>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, address, image } = event.target;
    axios
      .post("/api/campuses", {
        name: name.value,
        address: address.value,
        imageURL: image.value
      })
      .then(function(response) {
        console.log(response);
        return response;
      })
      .then()
      .catch(e => {
        console.log(e);
      });
  }
}
