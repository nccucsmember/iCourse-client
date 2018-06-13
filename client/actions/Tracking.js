import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_TRACKING_COURSES_LIST = 'GET_TRACKING_COURSES_LIST';
export const ADD_TO_SELECTLIST = 'ADD_TO_SELECTLIST';
export const CLEAR_TRACK_STATE = 'CLEAR_TRACK_STATE';
export const DELETE_COURSE = 'DELETE_COURSE';


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
        DELETE_COURSE,
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
        ADD_TO_SELECTLIST,
      ],
      method: 'PUT',
      entrypoint: `/choose/${subjectId}`,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        callBack,
      },
    },
  };
}
