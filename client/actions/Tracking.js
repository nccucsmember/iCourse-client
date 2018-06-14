import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_TRACKING_COURSES_LIST = Symbol('GET_TRACKING_COURSES_LIST');
export const CLEAR_TRACK_STATE = Symbol('CLEAR_TRACK_STATE');
export const DELETE_TRACKING_COURSE = Symbol('DELETE_TRACKING_COURSE');
export const ADD_TO_SELECT_LIST = Symbol('ADD_TO_SELECT_LIST');


export function clearState() {
  return {
    type: CLEAR_TRACK_STATE,
  };
}

export function getCourseList() {
  return {
    [API_REQUEST]: {
      types: [
        GET_TRACKING_COURSES_LIST,
      ],
      entrypoint: '/managecourse',
      headers: {
        authorization: localStorage.authorization,
      },
    },
  };
}

export function deleteCourse(subjectId, callBack) {
  return {
    [API_REQUEST]: {
      types: [
        DELETE_TRACKING_COURSE,
      ],
      method: 'DELETE',
      entrypoint: `/managecourse/${subjectId}`,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        callBack,
        subjectId,
      },
    },
  };
}

export function addToSelectList(subjectId, callBack) {
  return {
    [API_REQUEST]: {
      types: [
        ADD_TO_SELECT_LIST,
      ],
      method: 'PUT',
      entrypoint: `/choose/${subjectId}`,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        subjectId,
        callBack,
      },
    },
  };
}
