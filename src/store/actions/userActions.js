// TO DO: REFACTOR WITH PLANTS INSTEAD OF WORKERS, MATCH UP OR EDIT BE ENDPOINTS IF NECESSARY

import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosAuth";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGOUT = "LOGOUT";

export const APP_UPDATE = "APP_UPDATE";

export const FETCH_PLANTS_START = "FETCH_PLANTS_START";
export const FETCH_PLANTS_SUCCESS = "FETCH_PLANTS_SUCCESS";
export const FETCH_PLANTS_FAIL = "FETCH_PLANTS_FAIL";
// MAKE PLANTS UPDATE AND DELETE 

export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const WATER_START = "WATER_START"; 
export const WATER_SUCCESS = "WATER_SUCCESS";
export const WATER_FAIL = "WATER_FAIL";

export const SET_UPDATED_USER_FLAG = "SET_UPDATED_USER_FLAG";

//login action will handle all login types.
export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  console.log("Starting login... for: ", credentials);
  axios
    .post("https://water-my-plants-bw-3.herokuapp.com/login", credentials) /*THIS WILL BE BE HEROKU URL*/
    .then(res => {
      //Pass token to reducer.
      console.log("LOGIN RESPONSE: ", res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response }));
};

export const deleteUser = id => dispatch => {
  dispatch({ type: DELETE_USER_START });

  axiosWithAuth()
    .delete(`/api/auth/${id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_USER_FAIL, payload: err });
    });
};

export const setUpdatedUserFlag = flag => dispatch => {
  dispatch({ type: SET_UPDATED_USER_FLAG, payload: flag });
};

export const register = credentials => dispatch => {
  dispatch({ type: REGISTER_START });

  axios
    .post(
      "https://water-my-plants-bw-3.herokuapp.com/register", /*THIS WILL BE BE HEROKU URL*/
      credentials
    )
    .then(res => {
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      getUser(res.data.user.id);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REGISTER_FAIL, payload: err });
    });
};

export const getPlants = () => dispatch => {
  dispatch({ type: FETCH_PLANTS_START });
  axiosWithAuth()
    .get("/api/plants/all")
    .then(res => {
      dispatch({ type: FETCH_PLANTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_PLANTS_FAIL, payload: err.message });
    });
};

export const getUser = (id=1) => dispatch => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .get(`/api/user/${id}`)
    .then(res => {
      console.log("GET USER: ", res);
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_USER_FAIL, payload: err });
    });
};

export const updateApp = () => dispatch => {
  const loggedIn = localStorage.getItem("authToken") ? true : false;
  const id = 1
  // parseInt(localStorage.getItem("userID"), 10);
  dispatch(getUser(id));
  const updates = { loggedIn, id };
  dispatch({ type: APP_UPDATE, payload: updates });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const updateUser = (id, updatedUser) => dispatch => {
  dispatch({ type: UPDATE_USER_START });

  axiosWithAuth()
    .put(`/api/edituser/${id}`, { id, ...updatedUser })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
      setTimeout(() => {
        dispatch(setUpdatedUserFlag(false));
      }, 6000);
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_USER_FAIL, payload: err.message });
    });
};
// WATER 
export const waterPlant = (id, amount) => dispatch => {
  dispatch({ type: WATER_START });

  axiosWithAuth()
    .get(`/api/plant/${id}`)
    .then(res => {
      let currentWater = res.data.water;
      currentWater += Math.abs(amount);
      axiosWithAuth()
        .put(`/plants/edit/${id}`, { water: currentWater })
        .then(res => {
          console.log(res);
          dispatch({ type: WATER_SUCCESS });
        })
        .catch(err => {
          console.log(err);
          dispatchEvent({ type: WATER_FAIL, payload: err });
        });
    })
    .catch(err => {
      console.log(err);
      dispatchEvent({ type: WATER_FAIL, payload: err });
    });
};
