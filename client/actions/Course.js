import { API_REQUEST } from 'redux-middleware-fetch';
import qs from 'querystring';

export const GET_COURSE_LIST = 'GET_COURSE_LIST';
export const CLEAR_STATE = 'CLEAR_STATE';


export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function getCourseList(
  payload = null,
  params = {
    limit: 10,
    offset: 0,
  }) {
  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_LIST,
      ],
      json: true,
      body: payload,
      method: 'POST',
      entrypoint: `/course/search?${qs.stringify(params)}`,
    },
  };
}
