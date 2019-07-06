import React, { Component, useEffect } from "react";
import { getCampuses } from "../Reducer";
import { connect } from "react-redux";

export const AllCampuses = props => {
  useEffect(() => {
    props.getCampusesReact();
  }, []);
  return (
    <div>
      {props.campuses.map(campus => {
        return (
          <div>
            <div>{campus.name}</div>
            <img
              src={campus.imageURL}
              alt="there should be an image here"
              height="200"
              width="200"
            />
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
