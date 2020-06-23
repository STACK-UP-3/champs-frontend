import {
  APPROVAL_SENT,
  APPROVAL_SUCCESS,
  APPROVAL_FAILED
} from "../../ActionTypes/ApprovalTable/approvalTableActionType";

const initialState = {
  loading: false,
  token: "",
  user: {},
  error: ""
};

const approvalTableReducer = (state = initialState, action) => {
  let responseData;
  if (action.payload && action.payload.data) {
    const { data } = action.payload;
    responseData = data;
  }
  switch (action.type) {
    case APPROVAL_SENT:
      return {
        ...state,
        loading: true
      };
    case APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        token: responseData.token,
        user: responseData.user,
        error: ""
      };
    case APPROVAL_FAILED:
      return {
        ...state,
        loading: false,
        token: "",
        user: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default approvalTableReducer;
