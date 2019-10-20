import axios from 'axios';

import { GET_ERRORS, ADD_SURVEY } from './types';

// Register User
export const surveySubmit = userData => dispatch => {
  localStorage.setItem("BridalNetworkSearch", JSON.stringify(userData));
  window.location = "/search";
};