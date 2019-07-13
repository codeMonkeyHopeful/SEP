import React, { Component } from "react";

export class MissingPage extends Component {
  render() {
    return (
      <div>
        <img
          src="https://crajun.com/wp-content/uploads/2014/10/morpheus_meme.jpg"
          alt="Page Not Found"
        />
        <h1>Page does not exist, please try the navigation links above.</h1>
      </div>
    );
  }
}

export default MissingPage;
