import { combineReducers } from "redux";
import loginReducer from "./dummyReducer";

const rootReducer = combineReducers({
  dummy: loginReducer
});

export default rootReducer;
