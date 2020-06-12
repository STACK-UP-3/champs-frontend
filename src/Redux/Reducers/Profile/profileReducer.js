import {
  GET_USER_PROFILE__SUCCESS,
  UPDATE_PROFILE_REQUEST,
  REQUEST_FAILURE,
  UPDATE_PROFILE__SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CHANGE_STATE
} from "../../ActionTypes/Profile/ProfileActionTypes";

const initialState = {
  user: {
    loading: false,
    isProfileUpdated: false,
    lastname: "",
    firstname: "",
    email: "",
    username: "",
    gender: "",
    birthDate: "",
    preferredLanguage: "",
    preferredCurrency: "",
    location: "",
    department: "",
    emailNotifications: false,
    inAppNotifications: true
  }
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_USER_PROFILE__SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isProfileUpdated: true
      };
    case REQUEST_FAILURE: {
      const { status, message } = action.payload;
      return {
        ...state,
        loading: false,
        status,
        message,
        isProfileUpdated: false,
        error: ""
      };
    }
    case UPDATE_PROFILE__SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }
    case UPDATE_PROFILE_FAILURE: {
      const { status, message } = action.payload;
      return {
        ...state,
        loading: false,
        status,
        message,
        error: ""
      };
    }
    case CHANGE_STATE: {
      const changeStateData = action.payload;
      return {
        ...state,
        user: { ...state.user, ...changeStateData }
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
