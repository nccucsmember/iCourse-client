import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_SELECT_COURSES_LIST = 'GET_SELECT_COURSES_LIST';
export const CLEAR_SELECT_STATE = 'CLEAR_SELECT_STATE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const TOGGLE_SELECT_STUTUS = 'TOGGLE_SELECT_STUTUS';

export function clearState() {
  return {
    type: CLEAR_SELECT_STATE,
  };
}

export function getCourseList() {
  return {
    [API_REQUEST]: {
      types: [
        GET_SELECT_COURSES_LIST,
      ],
      entrypoint: '/choose',
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
      entrypoint: `/choose/${subjectId}`,
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

export function toggleSelectStatus(subjectId, callBack) {
  return {
    [API_REQUEST]: {
      types: [
        TOGGLE_SELECT_STUTUS,
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
