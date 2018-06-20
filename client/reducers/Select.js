import {
  CLEAR_SELECT_STATE,
  GET_SELECT_COURSES_LIST,
  DELETE_SELECT_COURSE,
  TOGGLE_SELECT_STUTUS,
  SORT_COURSES,
} from '../actions/Select.js';

export default (state = {
  courseList: [],
}, action) => {
  switch (action.type) {
    case SORT_COURSES: {
      return {
        ...state,
        courseList: action.sortedCourses,
      };
    }
    case TOGGLE_SELECT_STUTUS: {
      return {
        ...state,
        courseList: action.chosen_courses_list,
      };
    }
    case CLEAR_SELECT_STATE: {
      return {
        ...state,
        courseList: [],
      };
    }
    case GET_SELECT_COURSES_LIST: {
      return {
        ...state,
        courseList: action.chosen_courses_list,
      };
    }
    case DELETE_SELECT_COURSE: {
      if (action.message) {
        action.callBack(action.message);
      }
      const deletedIndex = state.courseList
      && state.courseList.findIndex(a => a.subject_id === action.subjectId);
      return {
        ...state,
        courseList: [
          ...state.courseList.slice(0, deletedIndex),
          ...state.courseList.slice(deletedIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};
