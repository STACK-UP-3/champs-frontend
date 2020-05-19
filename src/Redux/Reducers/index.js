import { combineReducers } from "redux";
import loginReducer from "./Login/loginReducer";
import signUpReducer from "./SignUp/signUpReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer
});

export default rootReducer;
