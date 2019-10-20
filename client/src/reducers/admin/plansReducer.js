import { GET_PLANS } from '../../actions/types';

const initialState = {
  plan: {},
  plans: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload
      };
    default:
      return state;
  }
}
