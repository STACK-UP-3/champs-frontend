/* eslint-disable consistent-return */
import axios from "axios";

import {
  GET_PLACES_REQUEST,
  GET_PLACES_SUCCESS,
  GET_PLACES_FAIL
} from "../../ActionTypes/Places/placeActionTypes";
import { errorToast, removeToast } from "../../../Utils/toasts";
import basePath from "../../../Utils/basePath";

export const getPlacesRequest = () => {
  removeToast();
  return {
    type: GET_PLACES_REQUEST
  };
};

export const getPlacesSuccess = payload => {
  removeToast();
  return {
    type: GET_PLACES_SUCCESS,
    payload
  };
};

export const getPlacesFail = payload => {
  errorToast(payload);
  return {
    type: GET_PLACES_FAIL,
    payload
  };
};

export const getPlaces = () => async dispatch => {
  try {
    const authToken = localStorage.getItem("token");
    dispatch(getPlacesRequest());
    const response = await axios.get(`${basePath}/places/?page=1&limit=10`, {
      headers: {
        token: authToken
      }
    });
    const { data } = response;
    const { results } = data.data;
    dispatch(getPlacesSuccess(results));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(getPlacesFail(response.data.error));
      } else {
        dispatch(getPlacesFail(message));
      }
    } else {
      const { message } = error;
      dispatch(getPlacesFail(message));
    }
  }
};
