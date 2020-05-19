import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../../ActionTypes/SignUp/signUpActionTypes.js";

const initialState = {
  loading: false,
  status: 0,
  message: "",
  error: ""
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SIGNUP_SUCCESS: {
      const { status, message } = action.payload;
      return {
        ...state,
        loading: false,
        status,
        message,
        error: ""
      };
    }
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        status: 0,
        message: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default signUpReducer;
