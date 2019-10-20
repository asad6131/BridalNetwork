import axios from "axios";

import { GET_ERRORS, GET_CONTACTS } from "./types";

export const chatInit = id => dispatch => {
  axios
    .get("/api/users/checkreceiver/" + id)
    .then(res => {
      window.location = "/inbox/" + id;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteContact = id => dispatch => {
  axios
    .post("/api/users/deleteContact/", { id: id })
    .then(res => {
      window.location = "/inbox/";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const allContacts = () => dispatch => {
  axios
    .get("/api/users/contacts/")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_CONTACTS,
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
