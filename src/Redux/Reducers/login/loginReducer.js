import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../../ActionTypes/login/loginActionTypes";

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: "",
  user: {},
  error: ""
};

const loginReducer = (state = initialState, action) => {
  let responseData;
  if (action.payload && action.payload.data) {
    const { data } = action.payload;
    responseData = data;
  }
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: responseData.token,
        user: responseData.user,
        error: ""
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: "",
        user: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;
