import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../../ActionTypes/Login/loginActionTypes";
import { errorToast, removeToast } from "../../../Utils/toasts";
import basePath from "../../../Utils/basePath";

export const loginRequest = () => {
  removeToast();
  return {
    type: LOGIN_REQUEST
  };
};

export const loginSuccess = payload => {
  removeToast();
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const loginFail = payload => {
  errorToast(payload);
  return {
    type: LOGIN_FAIL,
    payload
  };
};

export const login = formData => async dispatch => {
  try {
    dispatch(loginRequest());
    const apiCallConfig = {
      method: "post",
      url: `${basePath}/auth/signin`,
      data: formData
    };
    const response = await axios(apiCallConfig);
    const { data } = response;
    const { token } = data.data;
    localStorage.setItem("token", token);
    dispatch(loginSuccess(data));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(loginFail(response.data.error));
      } else {
        dispatch(loginFail(message));
      }
    } else {
      const { message } = error;
      dispatch(loginFail(message));
    }
  }
};
