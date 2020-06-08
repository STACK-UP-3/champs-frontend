import { combineReducers } from "redux";
import loginReducer from "./Login/loginReducer";
import signUpReducer from "./SignUp/signUpReducer";
import sendResetLinkReducer from "./ResetPassword/sendLinkReducer";
import passwordUpdateReducer from "./ResetPassword/updatePasswordReducer";
import placeReducer from "./Places/PlaceReducer";
import tripReducer from "./Trips/tripReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  resetLink: sendResetLinkReducer,
  passwordUpdate: passwordUpdateReducer,
  places: placeReducer,
  trips: tripReducer
});

export default rootReducer;
