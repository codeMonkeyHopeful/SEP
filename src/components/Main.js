import React, { Component } from "react";
import { HashRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import AllStudents from "./AllStudents";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import ModifyCampus from "./ModifyCampus";

export class Navbar extends Component {
  render() {
    return (
      <HashRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <Link to="/campuses">Show All Campuses</Link>
          <Link to="/students">Show All Students</Link>
          <Link to="/modifycampus">Modify A Campus</Link>
        </div>
        <div id="nav">
          <Switch>
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/modifycampus" component={ModifyCampus} />
            <Route path="/campuses/:id" component={SingleCampus} />
            <Route path="/students/:id" component={SingleStudent} />
            <Redirect to="/campuses" />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Navbar;
