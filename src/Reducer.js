import { combineReducers, createStore, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";

const GET_CAMPUSES = "GET_CAMPUSES";

const initialStudents = axios.get("/students").then(result => {
  return result.data;
});

// action creator
export function gotCampuses(campuses) {
  const action = {
    type: GET_CAMPUSES,
    campuses
  };
  return action;
}
// thunk creator
export function getCampuses() {
  return dispatch => {
    axios
      .get("/campuses")
      .then(response => dispatch(gotCampuses(response.data)))
      .catch(e => console.log("get campuses error", e));
  };
}

function campusReducer(campuses = [], action) {
  switch (action.type) {
    //placeholder
    case GET_CAMPUSES:
      console.log(action.campuses);
      return action.campuses;
    default:
      return campuses;
  }
}

function studentReducer(students = [], action) {
  switch (action.type) {
    //placeholder
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
