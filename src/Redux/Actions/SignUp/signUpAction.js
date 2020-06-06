import axios from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../../ActionTypes/SignUp/signUpActionTypes.js";
import { errorToast, removeToast } from "../../../Utils/toasts";

const basePath = "https://champs-bn-api.herokuapp.com/api/v1";

export const signUpRequest = () => {
  removeToast();
  return {
    type: SIGNUP_REQUEST
  };
};

export const signUpSuccess = payload => {
  removeToast();
  return {
    type: SIGNUP_SUCCESS,
    payload
  };
};

export const signUpFail = payload => {
  errorToast(payload);
  return {
    type: SIGNUP_FAIL,
    payload
  };
};

export const signUp = formData => async dispatch => {
  try {
    dispatch(signUpRequest());
    const apiCallConfig = {
      method: "post",
      url: `${basePath}/auth/signup`,
      data: formData
    };
    const response = await axios(apiCallConfig);
    const { data } = response;
    dispatch(signUpSuccess(data));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(signUpFail(response.data.error));
      } else {
        dispatch(signUpFail(message));
      }
    } else {
      const { message } = error;
      dispatch(signUpFail(message));
    }
  }
};
