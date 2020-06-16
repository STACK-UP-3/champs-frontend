import axios from "axios";

import {
  RESET_LINK_REQUEST,
  RESET_LINK_SUCCESS,
  RESET_LINK_FAIL
} from "../../ActionTypes/PasswordReset/sendResetLinkActionTypes";
import { errorToast, removeToast } from "../../../Utils/toasts";

const basePath = "https://champs-bn-api.herokuapp.com/api/v1";

export const resetLinkRequest = () => {
  removeToast();
  return {
    type: RESET_LINK_REQUEST
  };
};

export const resetLinktSuccess = payload => {
  removeToast();
  return {
    type: RESET_LINK_SUCCESS,
    payload
  };
};

export const resetLinkFail = payload => {
  errorToast(payload);
  return {
    type: RESET_LINK_FAIL,
    payload
  };
};

export const resetLink = formData => async dispatch => {
  try {
    dispatch(resetLinkRequest());
    const apiCallConfig = {
      method: "post",
      url: `${basePath}/auth/reset-link`,
      data: formData
    };
    const response = await axios(apiCallConfig);
    const { data } = response;
    dispatch(resetLinktSuccess(data));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(resetLinkFail(response.data.error));
      } else {
        dispatch(resetLinkFail(message));
      }
    } else {
      const { message } = error;
      dispatch(resetLinkFail(message));
    }
  }
};
