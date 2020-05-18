import { DUMMY_ACTION } from "../ActionTypes/dummyAction";

const initialState = {
  isDummy: false
};

const dummyReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case DUMMY_ACTION:
      return {
        ...state,
        isDummy: true
      };
    default:
      return state;
  }
};

export default dummyReducer;
