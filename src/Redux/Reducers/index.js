import { combineReducers } from "redux";
import loginReducer from "./Login/loginReducer";
import signUpReducer from "./SignUp/signUpReducer";
import sendResetLinkReducer from "./ResetPassword/sendLinkReducer";
import passwordUpdateReducer from "./ResetPassword/updatePasswordReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  resetLink: sendResetLinkReducer,
  passwordUpdate: passwordUpdateReducer
});

export default rootReducer;
