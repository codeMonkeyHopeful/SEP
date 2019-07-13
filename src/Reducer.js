import { combineReducers, createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";

// const GET_CAMPUSES = "GET_CAMPUSES";
const GOT_CAMPUSES = "GOT_CAMPUSES";
const GOT_SINGLE_CAMPUS = "GOT_SINGLE_CAMPUS";
// const GET_STUDENTS = "GET_STUDENTS";
const GOT_STUDENTS = "GOT_STUDENTS";
const GOT_SINGLE_STUDENT = "GOT_SINGLE_STUDENT";

// action creator Campus
export function gotCampuses(campuses) {
  const action = {
    type: GOT_CAMPUSES,
    campuses
  };
  return action;
}

export function gotSingleCampus(singleCampus) {
  const action = {
    type: GOT_SINGLE_CAMPUS,
    singleCampus
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
export function gotSingleStudent(singleStudent) {
  const action = {
    type: GOT_SINGLE_STUDENT,
    singleStudent
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

// thunk creator singleCampus
export function getSingleCampus(id) {
  return dispatch => {
    axios
      .get(`/api/campuses/${id}`)
      .then(response => {
        console.log("get single campus", response.data);
        dispatch(gotSingleCampus(response.data));
      })
      .catch(e => console.log("get single campus error", e));
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
export function getSingleStudent(id) {
  return dispatch => {
    axios
      .get(`/api/students/${id}`)
      .then(response => {
        console.log("get single student", response.data);
        dispatch(gotSingleStudent(response.data));
      })
      .catch(e => console.log("get single campus error", e));
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

const intialSingleCampus = {
  id: 0,
  name: "",
  address: "",
  description: "",
  students: []
};

function singleCampusReducer(singleCampus = intialSingleCampus, action) {
  switch (action.type) {
    case GOT_SINGLE_CAMPUS:
      return action.singleCampus;
    default:
      return singleCampus;
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

const intialSingleStudent = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  gpa: 0,
  campus: {}
};

function singleStudentReducer(singleStudent = intialSingleStudent, action) {
  switch (action.type) {
    case GOT_SINGLE_STUDENT:
      return action.singleStudent;
    default:
      return singleStudent;
  }
}

//root reducer aka subreducer
const rootReducer = combineReducers({
  campuses: campusReducer,
  students: studentReducer,
  singleCampus: singleCampusReducer,
  singleStudent: singleStudentReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));

export default store;
