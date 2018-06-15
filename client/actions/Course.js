import { API_REQUEST } from 'redux-middleware-fetch';
import qs from 'querystring';

export const GET_COURSE_LIST = Symbol('GET_COURSE_LIST');
export const CLEAR_COURSELIST_STATE = Symbol('CLEAR_COURSELIST_STATE');
export const SAVE_SUBMIT_DATA = Symbol('SAVE_SUBMIT_DATA');
export const ADD_TO_TRACKLIST = Symbol('ADD_TO_TRACKLIST');

export function saveSubmitData(data) {
  return {
    type: SAVE_SUBMIT_DATA,
    data,
  };
}

export function clearState() {
  return {
    type: CLEAR_COURSELIST_STATE,
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
