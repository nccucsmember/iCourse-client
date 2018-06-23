import {
  DETAIL_CLEAR_STATE,
  GET_COURSE_DETAIL,
  GET_COURSE_COMMENTS,
  GET_COURSE_AVERAGE_SCORE,
  CHECK_COURSE_THUMB_UP,
  CLICK_THUMB_UP,
} from '../actions/Detail.js';

export default (state = {
  courseInfo: null,
  comments: [],
  averageScore: null,
  commentsWithClickedThumbup: [],
}, action) => {
  switch (action.type) {
    case CLICK_THUMB_UP: {
      const editCommentIndex = state.comments &&
      state.comments[0] &&
      state.comments.findIndex(item => item.id === action.commentId);
      const editThumbIndex = state.commentsWithClickedThumbup &&
      state.commentsWithClickedThumbup[0] &&
      state.commentsWithClickedThumbup.findIndex(item => item === action.commentId);
      switch (action.method) {
        case 'DELETE':
          return {
            ...state,
            comments: [
              ...state.comments.slice(0, editCommentIndex),
              action.comment_status,
              ...state.comments.slice(editCommentIndex + 1),
            ],
            commentsWithClickedThumbup: [
              ...state.commentsWithClickedThumbup.slice(0, editThumbIndex),
              ...state.commentsWithClickedThumbup.slice(editThumbIndex + 1),
            ],
          };
        case 'PUT':
          return {
            ...state,
            commentsWithClickedThumbup: editThumbIndex ? [...state.commentsWithClickedThumbup, action.commentId] : [action.commentId],
            comments: [
              ...state.comments.slice(0, editCommentIndex),
              action.comment_status,
              ...state.comments.slice(editCommentIndex + 1),
            ],
          };
        default:
          return {
            ...state,
          };
      }
    }
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
        averageScore: action.score[0]['ROUND(avg(comments.score),1)'],
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
