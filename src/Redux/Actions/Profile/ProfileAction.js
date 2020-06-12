import axios from "axios";
import jwtDecode from "jwt-decode";
import verifyToken from "../../../Utils/tokenVerify";
import {
  GET_USER_PROFILE__SUCCESS,
  UPDATE_PROFILE__SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  REQUEST_FAILURE
} from "../../ActionTypes/Profile/ProfileActionTypes";
import { errorToast, removeToast } from "../../../Utils/toasts";

const basePath = "http://localhost:3000/api/v1";

export const CHANGE_STATE = "CHANGE_STATE";

export const profileUpdateRequest = () => {
  removeToast();
  return {
    type: UPDATE_PROFILE_REQUEST
  };
};

export const profileUpdateSuccess = payload => {
  removeToast();
  return {
    type: UPDATE_PROFILE__SUCCESS,
    payload
  };
};

export const profileUpdateFail = payload => {
  errorToast(payload);
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload
  };
};

export const updateUserProfileDetails = (
  token,
  userUpdates
) => async dispatch => {
  const config = { headers: { token } };
  const {
    id,
    email,
    isVerified,
    role,
    authType,
    lineManager,
    googleId,
    facebookId,
    createdAt,
    updatedAt,
    ...data
  } = userUpdates;
  const tokenUserName = verifyToken(token)
    ? jwtDecode(token).username
    : errorToast("You are not authorized");
  const username =
    userUpdates.username === tokenUserName
      ? tokenUserName
      : userUpdates.username;
  try {
    dispatch(profileUpdateRequest);
    await axios.patch(`${basePath}/user/${username}/profile/`, data, config);
    dispatch(profileUpdateSuccess(data));
  } catch (error) {
    const { response } = error;

    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(profileUpdateFail(error.response.data.error));
      } else {
        dispatch(profileUpdateFail(message));
      }
    } else {
      const { message } = error;
      dispatch(profileUpdateFail(message));
    }
  }
};

export const fetchUserProfileDetails = (token, formData) => async dispatch => {
  const config = { headers: { token } };
  const tokenUserName = verifyToken(token)
    ? jwtDecode(token).username
    : errorToast("You are not authorized");
  const username = formData.username === "" ? tokenUserName : formData.username;

  try {
    const response = await axios.get(
      `${basePath}/user/${username}/profile/`,
      config
    );
    dispatch({
      type: GET_USER_PROFILE__SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: REQUEST_FAILURE,
      payload: error.response.data.error
    });
  }
};

export const changeFieldValues = data => dispatch => {
  dispatch({
    type: CHANGE_STATE,
    payload: data
  });
};
