import axios from "axios";

import {
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAIL,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  GET_TRIPS_FAIL
} from "../../ActionTypes/Trips/tripActionTypes";
import { errorToast, removeToast, succcessToast } from "../../../Utils/toasts";
import basePath from "../../../Utils/basePath";

export const getTripsRequest = () => ({
  type: GET_TRIPS_REQUEST
});

export const getTripsSuccess = payload => ({
  type: GET_TRIPS_SUCCESS,
  payload
});
export const getTripsFail = payload => ({
  type: GET_TRIPS_FAIL,
  payload
});
export const getTrips = () => async dispatch => {
  try {
    const authToken = localStorage.getItem("token");
    dispatch(getTripsRequest());
    const response = await axios.get(`${basePath}/trips/`, {
      headers: {
        token: authToken
      }
    });
    const { data } = response;
    const { results } = data.data;
    dispatch(getTripsSuccess(results));
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      if (!message) {
        dispatch(getTripsFail(response.data.error));
      } else {
        dispatch(getTripsFail(message));
      }
    } else {
      const { message } = error;
      dispatch(getTripsFail(message));
    }
  }
};

export const createTripRequest = () => {
  removeToast();
  return {
    type: CREATE_TRIP_REQUEST
  };
};

export const createTripSuccess = payload => {
  removeToast();
  succcessToast("trip was created successfuly");
  return {
    type: CREATE_TRIP_SUCCESS,
    payload
  };
};

export const createTripFail = payload => {
  errorToast(payload);
  return {
    type: CREATE_TRIP_FAIL,
    payload
  };
};

export const createOneWayTrip = formData => async dispatch => {
  try {
    dispatch(createTripRequest());
    const authToken = localStorage.getItem("token");
    const apiCallConfig = {
      method: "post",
      url: `${basePath}/trips`,
      data: formData,
      headers: {
        token: authToken
      }
    };
    const response = await axios(apiCallConfig);
    const { data } = response;

    dispatch(createTripSuccess(data));
    dispatch(getTrips());
  } catch (error) {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      dispatch(createTripFail(message));
    } else {
      const { message } = error;
      dispatch(createTripFail(message));
    }
  }
};
