import {
  GET_PLACES_REQUEST,
  GET_PLACES_SUCCESS,
  GET_PLACES_FAIL
} from "../../ActionTypes/Places/placeActionTypes";

const initialState = {
  places: [],
  loading: false,
  error: ""
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case GET_PLACES_SUCCESS:
      return {
        ...state,
        places: action.payload,
        loading: false,
        error: ""
      };
    case GET_PLACES_FAIL:
      return {
        ...state,
        places: [],
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default placeReducer;
