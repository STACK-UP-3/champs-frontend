import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import store from "../Redux/store";
import HomeComponent from "./Home/Home.jsx";
import SignUpComponent from "./Auth/SignUp/SignUp.jsx";
import SignInComponent from "./Auth/SignIn/SignIn.jsx";
import Protected from "./Shared/ProtectedRoute/ProtectedRoute.jsx";
import EmailVerificationResponse from "./Shared/EmailVerificationResponse/EmailVerificationResponse.jsx";
import ResetPasswordComponent from "./Auth/ForgetPassword/ResetPassword/ResetPassword.jsx";
import ChangePassword from "./Auth/ForgetPassword/ChangePassword/ChangePassword.jsx";

toast.configure();

const App = () => (
  <Provider store={store}>
    <div>
      <Router>
        <Switch>
          <Protected exact path="/home" component={HomeComponent} />
          <Route exact path="/signup" component={SignUpComponent} />
          <Route
            exact
            path="/forgot-password"
            component={ResetPasswordComponent}
          />
          <Route
            exact
            path="/verify-email"
            component={EmailVerificationResponse}
          />
          <Route exact path="/reset-password" component={ChangePassword} />
          <Route exact path="/signin" component={SignInComponent} />
          <Route exact path="/" component={SignInComponent} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
