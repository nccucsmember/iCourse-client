import {
  CLEAR_STATE,
  GET_COURSE_LIST,
  ADD_TO_TRACKLIST,
} from '../actions/Course.js';

export default (state = {
  courseList: [],
}, action) => {
  switch (action.type) {
    case ADD_TO_TRACKLIST: {
      if (action.message) {
        action.callBack(action.message);
      }
      return {
        ...state,
      };
    }
    case CLEAR_STATE: {
      return {
        ...state,
        courseList: [],
      };
    }
    case GET_COURSE_LIST: {
      return {
        ...state,
        courseList: action.list,
      };
    }
    default:
      return state;
  }
};
