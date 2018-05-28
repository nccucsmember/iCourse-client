import { API_REQUEST } from 'redux-middleware-fetch';
import qs from 'querystring';

export const GET_COURSE_LIST = 'GET_COURSE_LIST';
export const CLEAR_STATE = 'CLEAR_STATE';
export const ADD_TO_TRACKLIST = 'ADD_TO_TRACKLIST';


export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function addToTrackList(subjectId, callBack) {
  return {
    [API_REQUEST]: {
      types: [
        ADD_TO_TRACKLIST,
      ],
      method: 'PUT',
      entrypoint: `/managecourse/${subjectId}`,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        callBack,
      },
    },
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
    } = query;

    const params = {
      limit: 10,
    };
    if (type) { params.type = type; }
    if (dept) { params.dept = dept; }
    if (weekday) { params.weekday = weekday; }
    if (limit) { params.limit = limit; }
    if (keyword) { params.zh = keyword; }

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
