import { REGISTER } from '../actions/Register.js';
import { updateAccessToken } from '../helper/localStorage.js';

export default (state = {
  account: null,
  accessToken: localStorage.authorization || null,
}, action) => {
  switch (action.type) {
    case REGISTER: {
      updateAccessToken('authorization', action.auth_token);
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
