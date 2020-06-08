import {
  CREATE_TRIP_REQUEST,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAIL,
  GET_TRIPS_REQUEST,
  GET_TRIPS_SUCCESS,
  GET_TRIPS_FAIL
} from "../../ActionTypes/Trips/tripActionTypes.js";

const initialState = {
  getTripgetTripsLoadingLoading: false,
  isCreatedTripSuccess: false,
  createTripLoading: false,
  error: "",
  allTrips: []
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIP_REQUEST:
      return {
        ...state,
        isCreatedTripSuccess: false,
        createTripLoading: true,
        error: ""
      };
    case CREATE_TRIP_SUCCESS: {
      return {
        ...state,
        createTripLoading: false,
        isCreatedTripSuccess: true,
        error: ""
      };
    }
    case CREATE_TRIP_FAIL:
      return {
        ...state,
        createTripLoading: false,
        createdTrips: [],
        isCreatedTripSuccess: false,
        error: action.payload
      };
    case GET_TRIPS_REQUEST:
      return {
        ...state,
        getTripsLoading: true,
        error: ""
      };
    case GET_TRIPS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        getTripsLoading: false,
        allTrips: payload,
        error: ""
      };
    }
    case GET_TRIPS_FAIL:
      return {
        ...state,
        getTripsLoading: false,
        allTrips: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default tripReducer;
