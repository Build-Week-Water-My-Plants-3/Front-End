import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_START,
    FETCH_WORKERS_FAIL,
    FETCH_WORKERS_START,
    FETCH_WORKERS_SUCCESS,
    FETCH_USER_FAIL,
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    LOGOUT,
    APP_UPDATE,
    UPDATE_USER_FAIL,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_START,
    REGISTER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    SET_UPDATED_USER_FLAG,
    TIP_FAIL,
    TIP_START,
    TIP_SUCCESS
  } from "../actions/userActions";
  
  const initialState = {
    user: {
      info: "",
      month_at_job: 0,
      name: "",
      tagline: "",
      tip: 0,
      id: 0,
      isServiceWorker: false
    },
  
    isFetchingUser: false,
    fetchUserError: "",
  
    isLoggingIn: false,
    loggedIn: false,
    loginError: "",
  
    isRegistering: false,
    registerError: "",
  
    fetchingWorkers: false,
    fetchWorkersError: "",
    workers: [
      {
        id: 1,
        info: "37 yr Male living in Florida",
        month_at_job: 6,
        name: "Tony",
        tagline: "We are not in Kansas anymore.",
        tip: 3,
        user_id: 1
      }
    ],
  
    isTipping: false,
    tipMessage: "",
  
    isDeleting: false,
    deleteError: "",
  
    isUpdatingUser: false,
    updateUserError: "",
    updatedUser: false
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case TIP_START:
        return { ...state, isTipping: true, tipMessage: "" };
      case TIP_FAIL:
        return { ...state, isTipping: false, tipMessage: "Failed to tip worker" };
  
      case TIP_SUCCESS:
        return { ...state, isTipping: false, tipMessage: "Tipped!" };
      case FETCH_USER_START:
        return { ...state, isFetchingUser: true, fetchUserError: "" };
      case FETCH_USER_FAIL:
        return {
          ...state,
          isFetchingUser: false,
          fetchUserError: action.payload
        };
      case FETCH_USER_SUCCESS:
        return {
          ...state,
          isFetchingUser: false,
          user: {
            ...action.payload
          }
        };
  
      case DELETE_USER_START:
        return { ...state, isDeleting: true, deleteError: "" };
      case DELETE_USER_FAIL:
        return { ...state, isDeleting: false, deleteError: action.payload };
      case DELETE_USER_SUCCESS:
        return { ...state, isDeleting: false };
      case REGISTER_START:
        return { ...state, isRegistering: true, registerError: "" };
      case REGISTER_SUCCESS:
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("userID", action.payload.userN.id);
        return { ...state, isRegistering: false, loggedIn: true };
      case REGISTER_FAIL:
        return { ...state, isRegistering: false, registerError: action.payload };
  
      case UPDATE_USER_START:
        return { ...state, isUpdatingUser: true, updatedUser: false };
      case UPDATE_USER_FAIL:
        return {
          ...state,
          isUpdatingUser: false,
          updateUserError: action.payload
        };
  
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          isUpdatingUser: false,
          updateUserError: "",
          updatedUser: true,
          user: action.payload
        };
      case APP_UPDATE:
        return {
          ...state,
          loggedIn: action.payload.loggedIn,
          user: { ...state.user, id: action.payload.id }
        };
      case LOGOUT:
        localStorage.removeItem("authToken");
        localStorage.removeItem("userID");
        return { ...state, loggedIn: false };
      case LOGIN_FAIL:
        return { ...state, loginError: action.payload, isLoggingIn: false };
      case LOGIN_START:
        return { ...state, isLoggingIn: true, loginError: "" };
      case LOGIN_SUCCESS:
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("userID", action.payload.user.id);
        return {
          ...state,
          isLoggingIn: false,
          loggedIn: true,
          user: {
            ...state.user,
            id: action.payload.user.id,
            isServiceWorker: action.payload.user.isServiceWorker,
            name: action.payload.user.username
          }
        }; //TODO: Set user data from payload.
      case FETCH_WORKERS_START:
        return { ...state, fetchingWorkers: true };
      case FETCH_WORKERS_SUCCESS:
        return {
          ...state,
          fetchingWorkers: false,
          workers: action.payload
        };
      case FETCH_WORKERS_FAIL:
        return {
          ...state,
          fetchingWorkers: false,
          fetchWorkersError: action.payload
        };
      case SET_UPDATED_USER_FLAG:
        return { ...state, updatedUser: action.payload };
      default:
        return state;
    }
  };
  