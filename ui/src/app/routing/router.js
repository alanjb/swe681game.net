
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DeviceManagerContainer from '../../device-manager/DeviceManagerContainer';
import AppContainer from '../AppContainer';

export default (
  <AppContainer>
    <Router>
        <Switch>
          <Route path="/device-manager" component={DeviceManagerContainer} />
        </Switch>
    </Router>
  </AppContainer>
);