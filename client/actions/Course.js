import { API_REQUEST } from 'redux-middleware-fetch';
import qs from 'querystring';

export const GET_COURSE_LIST = 'GET_COURSE_LIST';
export const CLEAR_STATE = 'CLEAR_STATE';


export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function getCourseList(query = null) {
  if (query) {
    const {
      type,
      limit,
      dept,
      keyword,
      weekday,
      offset,
    } = query;

    const params = {
      limit: 10,
    };
    if (type) { params.type = type; }
    if (dept) { params.dept = dept; }
    if (weekday) { params.weekday = weekday; }
    if (limit) { params.limit = limit; }
    if (keyword) { params.zh = keyword; }
    if (offset) { params.offset = offset; }

    return {
      [API_REQUEST]: {
        types: [
          GET_COURSE_LIST,
        ],
        entrypoint: `/course?${qs.stringify(params)}`,
      },
    };
  }

  return {
    [API_REQUEST]: {
      types: [
        GET_COURSE_LIST,
      ],
      entrypoint: '/course?limit=10',
    },
  };
}
