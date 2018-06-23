import {
  DETAIL_CLEAR_STATE,
  GET_COURSE_DETAIL,
  GET_COURSE_COMMENTS,
  GET_COURSE_AVERAGE_SCORE,
  CHECK_COURSE_THUMB_UP,
} from '../actions/Detail.js';

export default (state = {
  courseInfo: null,
  comments: [],
  averageScore: null,
  commentsWithClickedThumbup: [],
}, action) => {
  switch (action.type) {
    case CHECK_COURSE_THUMB_UP: {
      return {
        ...state,
        commentsWithClickedThumbup:
          action.list &&
          action.list[0] &&
          action.list.filter(item => item.have_thumbup).map(item => item.id),
      };
    }
    case GET_COURSE_AVERAGE_SCORE: {
      return {
        ...state,
        averageScore: action.score[0]['avg(comments.score)'],
      };
    }
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
