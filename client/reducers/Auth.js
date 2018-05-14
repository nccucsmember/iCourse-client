import { LOGIN } from '../actions/Auth.js';

export default (state = {
  account: null,
  accessToken: null,
}, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        account: action.user_id,
        accessToken: action.auth_token,
      };
    }
    default:
      return state;
  }
};
