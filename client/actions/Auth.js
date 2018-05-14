import { API_REQUEST } from 'redux-middleware-fetch';

export const LOGIN = Symbol('LOGIN');

export function login(payload, onFailed) {
  return {
    [API_REQUEST]: {
      types: [
        LOGIN,
      ],
      body: payload,
      json: true,
      method: 'POST',
      entrypoint: '/api/v1/login',
      onFailed: () => {
        onFailed('帳號密碼錯誤');
      },
    },
  };
}
