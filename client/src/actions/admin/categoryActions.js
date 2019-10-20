import axios from 'axios';

import { GET_ERRORS, ADD_CATEGORIES, GET_CATEGORIES } from '../types';


export const addCategory = (userData, name) => dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  // console.log(name);
  axios
    .post("/api/upload/single", userData, config)
    .then(pic => {
      console.log(pic.data.file)
      axios
        .post("/api/category/", { avatar: pic.data.file, name })
        .then(res => {
          // console.log(res.data);
          dispatch({
            type: ADD_CATEGORIES,
            payload: res.data
          });
          window.location = "/admin/categories";
        })
        .catch(err => {
          // console.log(err.response.data);
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  // axios
  //   .post('/api/category/', userData)
  //   .then(res => {
  //     dispatch({
  //       type: ADD_CATEGORIES,
  //       payload: res.data
  //     });
  //     window.location = "/admin/categories";
  //   })
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );
};

export const getCategories = () => dispatch => {
  axios
    .get('/api/category/')
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
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


export const updateCategory2 = (file, userData) => dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  // console.log(name);
  axios
    .post("/api/upload/single", file, config)
    .then(pic => {
      // console.log(pic.data.file);
      const userData2 = {
        id: userData.id,
        title: userData.title,
        avatar: pic.data.file
      };
      axios
      .post('/api/category/update', userData2)
      .then(res => {
        window.location = "/admin/categories";
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    })
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateCategory = (userData) => dispatch => {
  axios
    .post('/api/category/update', userData)
    .then(res => {
      window.location = "/admin/categories";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};