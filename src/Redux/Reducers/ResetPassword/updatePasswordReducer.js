import {
  PASSWORD_UPDATE_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "../../ActionTypes/PasswordReset/PasswordResetActionTypes";

const initialState = {
  loading: false,
  message: "",
  status: 0,
  error: ""
};

const passwordUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RESET_PASSWORD_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        message,
        status,
        error: ""
      };
    }
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        message: "",
        status: 0,
        error: action.payload
      };
    default:
      return state;
  }
};

export default passwordUpdateReducer;
