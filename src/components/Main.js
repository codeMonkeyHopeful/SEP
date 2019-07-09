import React, { Component } from "react";
import { HashRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import AllStudents from "./AllStudents";
import SingleCampus from "./SingleCampus";
import SingleStudent from "./SingleStudent";
import ModifyCampus from "./ModifyCampus";
import ModifyStudent from "./ModifyStudent";

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
          <Link to="/modifycampus">Add A Campus</Link>
          <Link to="/modifystudent">Add A Student</Link>
        </div>
        <div id="nav">
          <Switch>
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/modifycampus" component={ModifyCampus} />
            <Route exact path="/modifystudent" component={ModifyStudent} />
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
