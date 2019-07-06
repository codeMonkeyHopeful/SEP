import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import AllStudents from "./AllStudents";

export class Navbar extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Link to="/campuses">Show All Campuses</Link>
          <Link to="/students">Show All Students</Link>
        </div>
        <div id="nav">
          <Route path="/campuses" component={AllCampuses} />
          <Route path="/students" component={AllStudents} />
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;
