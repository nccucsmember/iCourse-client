import {
  DETAIL_CLEAR_STATE,
  GET_COURSE_DETAIL,
} from '../actions/Detail.js';

export default (state = {
  courseInfo: null,
}, action) => {
  switch (action.type) {
    case DETAIL_CLEAR_STATE: {
      return {
        ...state,
        courseInfo: null,
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
