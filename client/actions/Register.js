import { API_REQUEST } from 'redux-middleware-fetch';

export const REGISTER = Symbol('REGISTER');

export function register(payload) {
  return {
    [API_REQUEST]: {
      types: [
        REGISTER,
      ],
      body: payload,
      json: true,
      method: 'POST',
      entrypoint: '/api/v1/register',
    },
  };
}
