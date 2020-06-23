import axios from "axios";

import {
  APPROVAL_SENT,
  APPROVAL_SUCCESS,
  APPROVAL_FAILED
} from "../../ActionTypes/ApprovalTable/approvalTableActionType";
import basePath from "../../../Utils/basePath";

export const approvalRequest = () => {
  return {
    type: APPROVAL_SENT
  };
};

export const approvalSuccess = payload => {
  return {
    type: APPROVAL_SUCCESS,
    payload
  };
};

export const approvalFailed = payload => {
  return {
    type: APPROVAL_FAILED,
    payload
  };
};

export const approvalResponse = () => async dispatch => {
  try {
    const authenticationToken = localStorage.getItem("token");

    dispatch(approvalRequest());
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get("tripId");

    const response = await axios.patch(`${basePath}/trips/${tripId}`, {
      headers: {
        token: authenticationToken
      }
    });

    const { data } = response;
    const { results } = data.data;
    dispatch(approvalSuccess(results));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(approvalFailed(response.data.error));
      } else {
        dispatch(approvalFailed(message));
      }
    } else {
      const { message } = error;
      dispatch(approvalFailed(message));
    }
  }
};
