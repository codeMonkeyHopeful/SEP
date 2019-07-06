import React, { Component } from "react";
import { getCampuses } from "../Reducer";
import { connect } from "react-redux";

export const AllCampuses = state => {
  getCampuses();
  console.log(state.campuses);
  return (
    <div>
      {state.campuses.map(campus => {
        return <div>{campus}</div>;
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { campuses: state.campuses };
};

const mapDispatchToProps = dispatch => ({
  getCampuses: () => dispatch(getCampuses())
});
const Campuses = connect(mapStateToProps)(AllCampuses);

export default Campuses;
