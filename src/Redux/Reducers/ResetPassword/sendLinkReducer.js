import {
  RESET_LINK_REQUEST,
  RESET_LINK_SUCCESS,
  RESET_LINK_FAIL
} from "../../ActionTypes/PasswordReset/sendResetLinkActionTypes";

const initialState = {
  loading: false,
  message: "",
  status: 0,
  error: ""
};

const sendResetLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LINK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RESET_LINK_SUCCESS: {
      const { message, status } = action.payload;
      return {
        ...state,
        loading: false,
        message,
        status,
        error: ""
      };
    }
    case RESET_LINK_FAIL:
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

export default sendResetLinkReducer;
