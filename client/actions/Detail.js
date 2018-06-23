import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
export const DETAIL_CLEAR_STATE = 'DETAIL_CLEAR_STATE';
export const GET_COURSE_COMMENTS = 'GET_COURSE_COMMENTS';
export const GET_COURSE_AVERAGE_SCORE = 'GET_COURSE_AVERAGE_SCORE';
export const CHECK_COURSE_THUMB_UP = 'CHECK_COURSE_THUMB_UP';
export const CLICK_THUMB_UP = 'CLICK_THUMB_UP';

export function clickThumUp(commentId, method) {
  return {
    [API_REQUEST]: {
      types: [
        CLICK_THUMB_UP,
      ],
      entrypoint: `/comment/${commentId}/click_thumbup`,
      method,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        commentId,
        method,
      },
    },
  };
}

export function checkThumbUp(courseId) {
  return {
    [API_REQUEST]: {
      types: [
        CHECK_COURSE_THUMB_UP,
      ],
      entrypoint: `/comment/${courseId}/check_thumbup`,
      headers: {
        authorization: localStorage.authorization,
      },
    },
  };
}

export function clearState() {
  return {
    type: DETAIL_CLEAR_STATE,
  };
}

export function getCourseDetail(id) {
  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_DETAIL,
      ],
      entrypoint: `/course/${id}`,
    },
  };
}

export function getAverageScore(id) {
  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_AVERAGE_SCORE,
      ],
      entrypoint: `/comment/${id}/score`,
    },
  };
}


export function getComments(id, type = 'descent') {
  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_COMMENTS,
      ],
      entrypoint: `/comment/${id}/${type}`,
    },
  };
}
