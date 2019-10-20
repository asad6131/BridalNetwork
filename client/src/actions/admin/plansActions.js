import axios from 'axios';

import { GET_ERRORS, GET_PLANS } from '../types';


export const getPlans = () => dispatch => {
  axios
    .get('/api/plans/')
    .then(res => {
      dispatch({
        type: GET_PLANS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};