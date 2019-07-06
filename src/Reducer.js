import { combineReducers, createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";

// const GET_CAMPUSES = "GET_CAMPUSES";
const GOT_CAMPUSES = "GOT_CAMPUSES";
// const GET_STUDENTS = "GET_STUDENTS";
const GOT_STUDENTS = "GOT_STUDENTS";

// action creator Campus
export function gotCampuses(campuses) {
  const action = {
    type: GOT_CAMPUSES,
    campuses
  };
  return action;
}
//action creator Students
export function gotStudents(students) {
  const action = {
    type: GOT_STUDENTS,
    students
  };
  return action;
}
// thunk creator Campuses
export function getCampuses() {
  return dispatch => {
    axios
      .get("/api/campuses")
      .then(response => dispatch(gotCampuses(response.data)))
      .catch(e => console.log("get campuses error", e));
  };
}
//thunk creator Students
export function getStudents() {
  return dispatch => {
    return axios
      .get("/api/students")
      .then(response => {
        dispatch(gotStudents(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };
}

function campusReducer(campuses = [], action) {
  switch (action.type) {
    //placeholder
    case GOT_CAMPUSES:
      return action.campuses;
    default:
      return campuses;
  }
}

function studentReducer(students = [], action) {
  switch (action.type) {
    //placeholder
    case GOT_STUDENTS:
      return action.students;
    default:
      return students;
  }
}

const rootReducer = combineReducers({
  campuses: campusReducer,
  students: studentReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));

export default store;
