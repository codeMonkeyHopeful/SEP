import { combineReducers } from "redux";
import axios from "axios";

const initialCampuses = axios.get("/campuses").then(result => {
  return result.data;
});

const initialStudents = axios.get("/students").then(result => {
  return result.data;
});

function campusReducer(campuses = initialCampuses, action) {
  switch (action.type) {
    //placeholder
    default:
      return campuses;
  }
}

function studentReducer(students = initialStudents, action) {
  switch (action.type) {
    //placeholder
    default:
      return students;
  }
}

console.log(initialCampuses);

const rootReducer = combineReducers({
  campuses: campusReducer,
  students: studentReducer
});

export default rootReducer;
