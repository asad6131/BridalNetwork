import {
  GET_MESSAGES,
  GET_USERS,
  UPDATE_USER,
  UPDATE_CHAT,
  IMAGE_LOADER,
  GET_CONTACTS,
  GET_CHAT_NOTIFICATION
} from "../actions/types";

const initialState = {
  contacts: [],
  messages: [],
  allUsers: [],
  notify: false,
  imageLoader: false
};

export default function ChatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT_NOTIFICATION:
      return (state = {
        ...state,
        notify: true
      });
    case GET_MESSAGES:
      return { ...state, messages: action.messages };
    case GET_CONTACTS:
      return { ...state, contacts: action.payload };
    case GET_USERS:
      return (state = { ...state, allUsers: action.allUsers });
    case UPDATE_USER:
      return (state = { ...state, allUsers: [...state.allUsers, action.user] });
    case UPDATE_CHAT:
      return (state = {
        ...state,
        messages: [...state.messages, action.chat],
        imageLoader: false
      });
    case IMAGE_LOADER:
      return (state = { ...state, imageLoader: true });
    default:
      return state;
  }
}
