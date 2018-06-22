import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
export const DETAIL_CLEAR_STATE = 'DETAIL_CLEAR_STATE';
export const GET_COURSE_COMMENTS = 'GET_COURSE_COMMENTS';
export const GET_COURSE_AVERAGE_SCORE = 'GET_COURSE_AVERAGE_SCORE';


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
