import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_SELECT_COURSES_LIST = Symbol('GET_SELECT_COURSES_LIST');
export const CLEAR_SELECT_STATE = Symbol('CLEAR_SELECT_STATE');
export const DELETE_SELECT_COURSE = Symbol('DELETE_SELECT_COURSE');
export const TOGGLE_SELECT_STUTUS = Symbol('TOGGLE_SELECT_STUTUS');
export const SORT_COURSES = Symbol('SORT_COURSES');

export function sortCourses(payload, sortedCourses) {
  return {
    [API_REQUEST]: {
      types: [
        SORT_COURSES,
      ],
      entrypoint: '/choose/setorder',
      method: 'POST',
      body: payload,
      json: true,
      headers: {
        authorization: localStorage.authorization,
      },
      dispatchPayload: {
        payload,
        sortedCourses,
      },
    },
  };
}

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
        DELETE_SELECT_COURSE,
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
