import {
  DETAIL_CLEAR_STATE,
  GET_COURSE_DETAIL,
  GET_COURSE_COMMENTS,
} from '../actions/Detail.js';

export default (state = {
  courseInfo: null,
  comments: [],
}, action) => {
  switch (action.type) {
    case GET_COURSE_COMMENTS: {
      return {
        ...state,
        comments: action.comment,
      };
    }
    case DETAIL_CLEAR_STATE: {
      return {
        ...state,
        courseInfo: null,
        comments: [],
      };
    }
    case GET_COURSE_DETAIL: {
      return {
        ...state,
        courseInfo: action,
      };
    }
    default:
      return state;
  }
};
