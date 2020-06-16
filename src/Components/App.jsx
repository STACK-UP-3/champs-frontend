import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import store from "../Redux/store";
import Home from "./Home/Home.jsx";
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
          <Route exact path="/" component={SignInComponent} />
          <Route exact path="/signin" component={SignInComponent} />
          <Route
            exact
            path="/verify-email"
            component={EmailVerificationResponse}
          />
          <Protected exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUpComponent} />
          <Route
            exact
            path="/forgot-password"
            component={ResetPasswordComponent}
          />
          <Route exact path="/reset-password" component={ChangePassword} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
