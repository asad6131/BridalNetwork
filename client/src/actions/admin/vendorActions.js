import axios from "axios";

import {
  GET_ERRORS,
  ADD_VENDORS,
  GET_VENDORS,
  GET_VENDOR,
  UPDATE_VENDORS,
  HANDLE_PROGRESS,
  UPLOADED_IMAGES_LINK,
  CLEAR_ERRORS,
  GET_USERS,
  GET_FAV,
  GET_VIEWS
} from "../types";

import * as firebase from "firebase";
import isEmpty from "../../validation/is-empty";

export const updatevendormainbyadmin = (data, file) => dispatch => {
  // console.log(data, "file", file);
  dispatch(clearErrors());
  if (file === "" || (file === undefined && file === null)) {
    // console.log("aaaaaaaaaaaaaaaaaaaaaa");
    axios
      .post("/api/vendors/updatevendormainbyadmin", data)
      .then(res => {
        dispatch({
          type: UPDATE_VENDORS,
          payload: res.data
        });
        window.location = '/admin/vendors/';
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  } else {
    // console.log("bbbbbbbbbbbbbbbbbbbbb");
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/api/upload/single", file, config)
      .then(pic => {
        // console.log(pic);
        data.avatar = pic.data.file;
        axios
          .post("/api/vendors/updatevendormainbyadmin", data)
          .then(res => {
            dispatch({
              type: UPDATE_VENDORS,
              payload: res.data
            });
          })
          .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
          });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const updateVendorMain = (data, file) => dispatch => {
  // console.log(data, "file", file);
  dispatch(clearErrors());
  if (file === "" || (file === undefined && file === null)) {
    // console.log("aaaaaaaaaaaaaaaaaaaaaa");
    axios
      .post("/api/vendors/updatevendormain", data)
      .then(res => {
        dispatch({
          type: UPDATE_VENDORS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  } else {
    // console.log("bbbbbbbbbbbbbbbbbbbbb");
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("/api/upload/single", file, config)
      .then(pic => {
        // console.log(pic);
        data.avatar = pic.data.file;
        axios
          .post("/api/vendors/updatevendormain", data)
          .then(res => {
            dispatch({
              type: UPDATE_VENDORS,
              payload: res.data
            });
          })
          .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
          });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const addVendor = (file, userData) => dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  // console.log(userData);
  axios
    .post("/api/upload/single", file, config)
    .then(pic => {
      // console.log(pic.data.file);
      const userData2 = {
        handle: userData.handle,
        category: userData.category,
        name: userData.name,
        bio: userData.bio,
        website: userData.website,
        instagram: userData.instagram,
        phone: userData.phone,
        avatar: pic.data.file
      };
      axios
        .post("/api/vendors/create", userData2)
        .then(res => {
          dispatch({
            type: ADD_VENDORS,
            payload: res.data
          });
          window.location = "/admin/vendors";
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

export const handleUploadStorage = imageArr => dispatch => {
  var linkList = [];
  var progress = 0;
  var arr = imageArr;
  imageArr.map(item => {
    let uploadTask = firebase
      .storage()
      .ref(`/image/${item.name}`)
      .put(item);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        arr.forEach(e => {
          if (snapshot.task.blob_.data_.name === e.name) {
            e.progress = snapshot.bytesTransferred / snapshot.totalBytes;
          }
        });
        let newPro = 0;
        arr.map(v => {
          newPro += v.progress;
        });
        // console.log(arr, 'check this')
        dispatch({
          type: HANDLE_PROGRESS,
          progress: (newPro / arr.length) * 100
        });
      },
      function (error) {
        alert(error.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          linkList.push({ imageLink: downloadURL, name: item.name });
          if (linkList.length === imageArr.length) {
            dispatch({
              type: UPLOADED_IMAGES_LINK,
              imageLinks: linkList
            });
            axios
              .post(
                "https://imageuploadingapp.herokuapp.com/api/uploadImageList",
                linkList
              )
              .then(() => console.log("uploaded finish"))
              .catch(e => alert("error" + e.message));
          }
        });
      }
    );
  });
  // console.log(arr, '///')
};

export const addBrochure = (file, userData) => dispatch => {
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
        handle: userData.handle,
        brochure: pic.data.file
      };
      axios
        .post("/api/vendors/addbrochure", userData2)
        .then(res => {
          window.location = "/admin/vendors";
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

export const searchViews = (handle) => dispatch => {
  axios
    .post("/api/vendors/searchviews", { handle })
    .then(details => {
      console.log(' aqqqqqqqqqqqq');
    })
    .catch(err => {
      console.log('errorrrrrrrr');
    });
};

export const getViewsByUserID = (id) => dispatch => {
  axios
    .post("/api/vendors/getsearchviews", { id })
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_VIEWS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('errorrrrrrrr');
    });
};

export const removeBrochure = userData => dispatch => {
  axios
    .post("/api/vendors/removebrochure", userData)
    .then(res => {
      window.location = "/admin/vendors";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateVendor2 = (file, userData) => dispatch => {
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
        handle: userData.handle,
        price: userData.price,
        category: userData.category,
        name: userData.name,
        bio: userData.bio,
        website: userData.website,
        instagram: userData.instagram,
        phone: userData.phone,
        avatar: pic.data.file
      };
      axios
        .post("/api/vendors/update", userData2)
        .then(res => {
          // console.log(res.data, ' api response');
          dispatch({
            type: UPDATE_VENDORS,
            payload: res.data
          });
          window.location = "/admin/vendors";
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

export const updateVendor = userData => dispatch => {
  axios
    .post("/api/vendors/update", userData)
    .then(res => {
      // console.log(res.data, ' api response');
      dispatch({
        type: UPDATE_VENDORS,
        payload: res.data
      });
      window.location = "/admin/vendors";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const uploadMultiSlider = (vendor_id, imageArr) => dispatch => {
  var linkList = [];
  var arr = imageArr;
  imageArr.map(item => {
    let uploadTask = firebase
      .storage()
      .ref(`/${item.name}`)
      .put(item);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        arr.forEach(e => {
          if (snapshot.task.blob_.data_.name === e.name) {
            e.progress = snapshot.bytesTransferred / snapshot.totalBytes;
          }
        });
        let newPro = 0;
        arr.map(v => {
          newPro += v.progress;
        });
        // console.log(arr, 'check this')
        dispatch({
          type: HANDLE_PROGRESS,
          progress: (newPro / arr.length) * 100
        });
      },
      function (error) {
        alert(error.message);
        dispatch({
          type: GET_ERRORS,
          payload: error.message
        });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);
          linkList.push({ img: downloadURL });
          if (linkList.length === imageArr.length) {
            dispatch({
              type: UPLOADED_IMAGES_LINK,
              imageLinks: linkList
            });
            axios
              .post("/api/vendors/slider/", { vendor_id, linkList })
              .then(() => console.log("uploaded finish"))
              .catch(e => console.log("error " + e.message));
            // dispatch({
            //   type: ADD_VENDOR,
            //   payload: addpropertyresponse.data
            // });
            window.location = "/vendor/gallery";
          }
        });
      }
    );
  });
};

export const uploadMultiSliderAdmin = (vendor_id, imageArr) => dispatch => {
  var linkList = [];
  var arr = imageArr;
  imageArr.map(item => {
    let uploadTask = firebase
      .storage()
      .ref(`/${item.name}`)
      .put(item);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        arr.forEach(e => {
          if (snapshot.task.blob_.data_.name === e.name) {
            e.progress = snapshot.bytesTransferred / snapshot.totalBytes;
          }
        });
        let newPro = 0;
        arr.map(v => {
          newPro += v.progress;
        });
        // console.log(arr, 'check this')
        dispatch({
          type: HANDLE_PROGRESS,
          progress: (newPro / arr.length) * 100
        });
      },
      function (error) {
        alert(error.message);
        dispatch({
          type: GET_ERRORS,
          payload: error.message
        });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          linkList.push({ img: downloadURL });
          if (linkList.length === imageArr.length) {
            dispatch({
              type: UPLOADED_IMAGES_LINK,
              imageLinks: linkList
            });
            axios
              .post("/api/vendors/slider/", { vendor_id, linkList })
              .then(() => console.log("uploaded finish " + vendor_id))
              .catch(e => console.log("error " + e.message));
            // dispatch({
            //   type: ADD_VENDOR,
            //   payload: addpropertyresponse.data
            // });
            window.location = "/admin/vendors/slider/" + vendor_id;
          }
        });
      }
    );
  });
};

export const addSlider = (userData, name, tags) => dispatch => {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  // console.log(name);
  axios
    .post("/api/upload/single", userData, config)
    .then(pic => {
      // console.log(pic.data.file);
      axios
        .post("/api/vendors/slider/", {
          avatar: pic.data.file,
          handle: name,
          tags: tags
        })
        .then(res => {
          // console.log(res.data);
          dispatch({
            type: ADD_VENDORS,
            payload: res.data
          });
          window.location = "/admin/vendors/slider/" + name;
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
};

export const getByHandleVendor = userData => dispatch => {
  axios
    .get("/api/vendors/handle/" + userData)
    .then(res => {
      dispatch({
        type: GET_VENDOR,
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

export const getByHandleVendorWithCat = userData => dispatch => {
  axios
    .get("/api/vendors/handleWIthCat/" + userData)
    .then(res => {
      dispatch({
        type: GET_VENDOR,
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

export const getByUserID = id => dispatch => {
  // console.log(id);
  axios
    .get("/api/vendors/vendor/" + id)
    .then(res => {
      dispatch({
        type: GET_VENDOR,
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

export const getByVendorID = id => dispatch => {
  // console.log(id);
  axios
    .get("/api/vendors/vendor/" + id)
    .then(res => {
      dispatch({
        type: GET_VENDOR,
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

export const getByVendorIDAdmin = id => dispatch => {
  // console.log(id);
  axios
    .get("/api/vendors/vendor_id/" + id)
    .then(res => {
      dispatch({
        type: GET_VENDOR,
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

export const deleteSlider = (id, handle) => dispatch => {
  // console.log({id: id, handle: handle});
  axios
    .delete("/api/vendors/slider/" + id + "/" + handle)
    .then(res => {
      // console.log(res.data, ' delete slider');
      dispatch(getByHandleVendor(handle));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteSlider2 = (id, v_id) => dispatch => {
  // console.log({ id: id, v_id: v_id });
  axios
    .delete("/api/vendors/slider2/" + id + "/" + v_id)
    .then(res => {
      window.location = "/vendor/gallery";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteSlider2Admin = (id, v_id) => dispatch => {
  // console.log({ id: id, v_id: v_id });
  axios
    .delete("/api/vendors/slider2/" + id + "/" + v_id)
    .then(res => {
      window.location = "/admin/vendors/slider/" + v_id;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const submitTags = (tags, vendor_id, slider_id) => dispatch => {
  // console.log({ id: id, v_id: v_id });
  axios
    .post("/api/vendors/submittags/", { tags, vendor_id, slider_id })
    .then(res => {
      // console.log(res, " response");
      window.location = "/vendor/gallery";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const submitTagsAdmin = (tags, vendor_id, slider_id) => dispatch => {
  // console.log({ id: id, v_id: v_id });
  axios
    .post("/api/vendors/submittags/", { tags, vendor_id, slider_id })
    .then(res => {
      // console.log(res, " response");
      window.location = "/admin/vendors/slider/" + vendor_id;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getVendors = () => dispatch => {
  axios
    .get("/api/vendors/all")
    .then(res => {
      // console.log(res.data.length);
      dispatch({
        type: GET_VENDORS,
        payload: (res.data.length > 0) ? res.data : []
      })
    })
    .catch(err =>
      // console.log(err.response.data, ' cehcking error')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getVendorsSkipLimit = (cat, skip, limit) => dispatch => {
  axios
    .post("/api/vendors/all", { cat: cat, skip: skip, limit: limit })
    .then(res => {
      // console.log(res.data.length);
      dispatch({
        type: GET_VENDORS,
        payload: (res.data.length > 0) ? res.data : []
      })
    })
    .catch(err =>
      // console.log(err.response.data, ' cehcking error')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getVendorsUser = () => dispatch => {
  axios
    .get("/api/vendors/allVendors")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_USERS,
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

export const getVendors2 = () => dispatch => {
  axios
    .get("/api/vendors/all2")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_VENDORS,
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

export const getVendorsUnderBudget = data => dispatch => {
  axios
    .post("/api/vendors/filter", data)
    .then(res => {
      dispatch({
        type: GET_VENDORS,
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

export const markFeature = data => dispatch => {
  axios
    .post("/api/vendors/feature", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const markUnfeature = data => dispatch => {
  axios
    .post("/api/vendors/unfeature", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const markTop = data => dispatch => {
  axios
    .post("/api/vendors/top", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const markUnTop = data => dispatch => {
  axios
    .post("/api/vendors/untop", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const markEnable = data => dispatch => {
  axios
    .post("/api/vendors/enable", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};
export const markDisable = data => dispatch => {
  axios
    .post("/api/vendors/disable", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const deleteVendor = id => dispatch => {
  axios
    .post("/api/vendors/delete", { _id: id })
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const assignUser = data => dispatch => {
  axios
    .post("/api/vendors/assignuser", data)
    .then(res => {
      window.location = "/admin/vendors/";
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



export const enableMSg = data => dispatch => {
  axios
    .post("/api/vendors/enableMsg", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const disableMsg = data => dispatch => {
  axios
    .post("/api/vendors/disableMsg", data)
    .then(res => {
      // console.log(res.data);
      window.location.reload();
    })
    .catch(err => console.log(err.response.data));
};

export const updateProfileView = id => dispatch => {
  axios
    .post("/api/vendors/view/" + id)
    .then(res => {
      // console.log(res.data);
    })
    .catch(err => console.log(err.response.data));
};

export const markFavourite = handle => dispatch => {
  axios
    .post("/api/vendors/fav/" + handle)
    .then(res => {
      // console.log(res.data, ' ////');
      dispatch({
        type: GET_FAV,
        payload: res.data
      })
    })
    .catch(err => console.log(err.response.data));
};

export const getFavByUserID = handle => dispatch => {
  axios
    .post("/api/vendors/getFavByUserID/" + handle)
    .then(res => {
      // console.log(res.data, ' ////');
      dispatch({
        type: GET_FAV,
        payload: res.data
      })
    })
    .catch(err => console.log(err.response.data));
};

export const myFav = () => dispatch => {
  axios
    .get("/api/vendors/myfav/")
    .then(res => {
      // console.log(res.data, ' ////');
      dispatch({
        type: GET_FAV,
        payload: res.data
      })
    })
    .catch(err => console.log(err.response.data));
};

