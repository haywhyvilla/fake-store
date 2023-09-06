// authReducer.js
import { ActionTypes } from '../constants/action-types';

const initialState = {
  token: '', // Initialize the token as an empty string
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

