import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_COURSE_LIST = 'GET_COURSE_LIST';
export const CLEAR_STATE = 'CLEAR_STATE';


export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function getCourseList(limit = 10) {
  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_LIST,
      ],
      entrypoint: `/course?limit=${limit}`,
    },
  };
}
