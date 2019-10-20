import {
  ADD_VENDORS,
  GET_VENDORS,
  GET_VENDOR,
  UPDATE_VENDORS,
  HANDLE_PROGRESS,
  UPLOADED_IMAGES_LINK,
  GET_USERS,
  GET_FAV,
  GET_VIEWS
} from "../../actions/types";

const initialState = {
  users: {},
  vendor: {},
  vendors: [],
  progress: 0,
  fav: {},
  views: 0,
  uploadedImageLink: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_VENDORS:
      return {
        ...state,
        vendor: action.payload
      };
    case UPDATE_VENDORS:
      return {
        ...state,
        vendor: action.payload
      };
    case GET_VENDORS:
      return {
        ...state,
        vendors: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_FAV:
      return {
        ...state,
        fav: action.payload
      };
    case GET_VIEWS:
      return {
        ...state,
        views: action.payload.views.length
      };
    case GET_VENDOR:
      return {
        ...state,
        vendor: action.payload
      };
    case HANDLE_PROGRESS:
      return {
        ...state,
        progress: action.progress
      };
    case UPLOADED_IMAGES_LINK:
      return {
        ...state,
        uploadedImageLink: action.imageLinks
      };
    default:
      return state;
  }
}
