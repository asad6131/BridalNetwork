import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, ADD_SOCKET } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  socket: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
