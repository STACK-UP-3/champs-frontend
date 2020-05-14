import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Redux/store';

import './App.scss';
import NavBar from './Shared/NavBar/NavBar.jsx';
import Home from './Home/Home.jsx';
import SignIn from './SignIn/SignIn.jsx';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
