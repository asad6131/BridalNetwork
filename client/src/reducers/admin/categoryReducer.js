import { ADD_CATEGORIES, GET_CATEGORIES, UPDATE_CATEGORIES } from '../../actions/types';

const initialState = {
  category: {},
  categories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        category: action.payload
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        category: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
}
