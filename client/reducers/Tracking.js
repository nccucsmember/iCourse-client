import {
  CLEAR_TRACK_STATE,
  GET_TRACKING_COURSES_LIST,
  DELETE_TRACKING_COURSE,
  ADD_TO_SELECT_LIST,
} from '../actions/Tracking.js';

export default (state = {
  courseList: [],
}, action) => {
  switch (action.type) {
    case ADD_TO_SELECT_LIST: {
      if (action.message) {
        action.callBack(action.message);
      }
      const deletedIndex = state.courseList
      && state.courseList.findIndex(a => a.subject_id === action.subjectId);
      return {
        ...state,
        courseList: [
          ...state.courseList.slice(0, deletedIndex),
          ...state.courseList.slice(deletedIndex + 1),
        ],
      };
    }
    case CLEAR_TRACK_STATE: {
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
    case DELETE_TRACKING_COURSE: {
      if (action.message) {
        action.callBack(action.message);
      }
      const deletedIndex = state.courseList
      && state.courseList.findIndex(a => a.subject_id === action.subjectId);
      return {
        ...state,
        courseList: [
          ...state.courseList.slice(0, deletedIndex),
          ...state.courseList.slice(deletedIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};
