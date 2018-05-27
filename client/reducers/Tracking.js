import {
  CLEAR_STATE,
  GET_TRACKING_COURSES_LIST,
  DELETE_COURSE,
} from '../actions/Tracking.js';

export default (state = {
  courseList: [],
}, action) => {
  switch (action.type) {
    case CLEAR_STATE: {
      return {
        ...state,
        courseList: [],
      };
    }
    case GET_TRACKING_COURSES_LIST: {
      return {
        ...state,
        courseList: action.course_list,
      };
    }
    case DELETE_COURSE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};