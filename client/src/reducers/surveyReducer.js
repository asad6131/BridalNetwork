import { ADD_SURVEY } from '../actions/types';

const initialState = {
  survey: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SURVEY:
      return {
        ...state,
        survey: action.payload
      };
    default:
      return state;
  }
}
