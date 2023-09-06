import { ActionTypes } from '../constants/action-types';

export const storeToken = (token) => {
  return {
    type: ActionTypes.STORE_TOKEN,
    payload: token,
  };
};