import { API_REQUEST } from 'redux-middleware-fetch';

export const REGISTER = Symbol('REGISTER');

export function register(payload, onFailed) {
  return {
    [API_REQUEST]: {
      types: [
        REGISTER,
      ],
      body: payload,
      json: true,
      method: 'POST',
      entrypoint: '/api/v1/register',
      onFailed: () => {
        onFailed('請確認密碼是否大於六個字元');
      },
    },
  };
}
