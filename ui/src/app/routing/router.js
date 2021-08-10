
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import DeviceManagerContainer from '../../device-manager/DeviceManagerContainer';
import HomeContainer from "../components /HomeContainer";
import ProfileContainer from '../components /ProfileContainer';
import ProtectedRoute from '../security/protected-route'

//should be passed in as a prop to AppContainer

export default (
  <Switch>
    <Route path="/" exact component={HomeContainer} />
    <ProtectedRoute path="/device-manager" component={DeviceManagerContainer} />
    <ProtectedRoute path="/profile" component={ProfileContainer} />
  </Switch>
);