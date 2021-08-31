
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import DashboardContainer from '../components/DashboardContainer';
import HomeContainer from "../components/HomeContainer";
import ProfileContainer from '../components/ProfileContainer';
import ProtectedRoute from '../security/protected-route'

export default (
  <Switch>
    <Route path="/" exact component={HomeContainer} />
    <ProtectedRoute path="/dashboard" component={DashboardContainer} />
    <ProtectedRoute path="/profile" component={ProfileContainer} />
  </Switch>
);