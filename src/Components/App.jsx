import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../Redux/store";
import "./App.scss";

import Home from "./Home/Home.jsx";
import SignInComponent from "./Auth/SignIn/SignIn.jsx";
import Protected from "./Shared/ProtectedRoute/ProtectedRoute.jsx";

toast.configure();

const App = () => (
  <Provider store={store}>
    <div>
      <Router>
        <Switch>
          <Protected path="/home" component={Home} />
          <Route path="/" component={SignInComponent} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
