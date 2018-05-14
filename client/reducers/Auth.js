import { LOGIN, LOGOUT } from '../actions/Auth.js';
import { updateAccessToken } from '../helper/localStorage.js';

export default (state = {
  account: null,
  accessToken: localStorage.authorization || null,
}, action) => {
  switch (action.type) {
    case LOGIN: {
      updateAccessToken('authorization', action.auth_token);
      return {
        ...state,
        account: action.user_id,
        accessToken: action.auth_token,
      };
    }
    case LOGOUT: {
      updateAccessToken('authorization', null);
      return {
        account: null,
        accessToken: null,
      };
    }
    default:
      return state;
  }
};
