import axios from "axios";

import {
  PASSWORD_UPDATE_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "../../ActionTypes/PasswordReset/PasswordResetActionTypes";
import { errorToast, removeToast } from "../../../Utils/toasts";

const basePath = "https://champs-bn-api.herokuapp.com/api/v1";

export const passwordResetRequest = () => {
  removeToast();
  return {
    type: PASSWORD_UPDATE_REQUEST
  };
};

export const passwordResetSuccess = payload => {
  removeToast();
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload
  };
};

export const passwordResetFail = payload => {
  errorToast(payload);
  return {
    type: RESET_PASSWORD_FAIL,
    payload
  };
};

export const passwordUpdate = formData => async dispatch => {
  try {
    dispatch(passwordResetRequest());
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const token = urlParams.get("token");

    const apiCallConfig = {
      method: "post",
      url: `${basePath}/auth/update-password/${email}/${token}`,
      data: formData
    };
    const response = await axios(apiCallConfig);
    const { data } = response;
    dispatch(passwordResetSuccess(data));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(passwordResetFail(response.data.error));
      } else {
        dispatch(passwordResetFail(message));
      }
    } else {
      const { message } = error;
      dispatch(passwordResetFail(message));
    }
  }
};
