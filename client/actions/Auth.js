import { API_REQUEST } from 'redux-middleware-fetch';

export const LOGIN = Symbol('LOGIN');

export function login(payload) {
  return {
    [API_REQUEST]: {
      types: [
        LOGIN,
      ],
      body: payload,
      json: true,
      method: 'POST',
      entrypoint: '/api/v1/login',
    },
  };
}
