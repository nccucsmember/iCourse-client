import { API_REQUEST } from 'redux-middleware-fetch';

export const GET_TRACKING_COURSES_LIST = 'GET_TRACKING_COURSES_LIST';
export const CLEAR_STATE = 'CLEAR_STATE';
export const DELETE_COURSE = 'DELETE_COURSE';


export function clearState() {
  return {
    type: CLEAR_STATE,
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

export function deleteCourse(subjectId) {
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
    },
  };
}
