import { combineReducers } from "redux";
import loginReducer from "./Login/loginReducer";
import signUpReducer from "./SignUp/signUpReducer";
import sendResetLinkReducer from "./ResetPassword/sendLinkReducer";
import passwordUpdateReducer from "./ResetPassword/updatePasswordReducer";
import profileReducer from "./Profile/profileReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  resetLink: sendResetLinkReducer,
  passwordUpdate: passwordUpdateReducer,
  profile: profileReducer
});

export default rootReducer;
