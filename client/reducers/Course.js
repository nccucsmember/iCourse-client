import {
  CLEAR_COURSELIST_STATE,
  GET_COURSE_LIST,
  SAVE_SUBMIT_DATA,
} from '../actions/Course.js';

export default (state = {
  courseList: [],
  count: 0,
  submittedData: null,
}, action) => {
  switch (action.type) {
    case SAVE_SUBMIT_DATA: {
      return {
        ...state,
        submittedData: action.data,
      };
    }
    case CLEAR_COURSELIST_STATE: {
      return {
        ...state,
        courseList: [],
        submittedData: null,
        count: 0,
      };
    }
    case GET_COURSE_LIST: {
      return {
        ...state,
        courseList: action.course_list,
        count: action.count,
      };
    }
    default:
      return state;
  }
};
