import React, { Component, useEffect } from "react";
import { getCampuses } from "../Reducer";
import { connect } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import ModifyCampus from "./ModifyCampus";

export const AllCampuses = props => {
  useEffect(() => {
    props.getCampusesReact();
  }, []);
  return (
    <div>
      {props.campuses.map(campus => {
        return (
          <div key={campus.id}>
            <Link to={`/campuses/${campus.id}`}>
              <div>{campus.name}</div>
              <img
                src={campus.imageURL}
                alt="there should be an image here"
                height="200"
                width="200"
              />
            </Link>
            <button
              type="submit"
              onClick={() =>
                axios
                  .delete("/api/campuses", {
                    data: {
                      id: campus.id
                    }
                  })
                  .then(function(response) {
                    console.log(response);
                  })
                  .then(props.getCampusesReact())
                  .catch(e => {
                    console.log(e);
                  })
              }
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const mapDispatchToProps = dispatch => ({
  getCampusesReact: () => dispatch(getCampuses())
});
const Campuses = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);

export default Campuses;
