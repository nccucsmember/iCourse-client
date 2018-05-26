import {
  CLEAR_STATE,
  GET_COURSE_LIST,
  ADD_TO_TRACKLIST,
} from '../actions/Course.js';

export default (state = {
  courseList: [],
  addToTrackListMsg: '',
}, action) => {
  switch (action.type) {
    case ADD_TO_TRACKLIST: {
      return {
        ...state,
        addToTrackListMsg: action.message,
      };
    }
    case CLEAR_STATE: {
      return {
        ...state,
        courseList: [],
        addToTrackListMsg: '',
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
