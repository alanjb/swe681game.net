import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import NavbarContainer from "./components/NavbarContainer";
import {
  Switch,
  Route,
} from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import ProfileContainer from './components/ProfileContainer';
import ProtectedRoute from './security/protected-route';
import DashboardContainer from './components/DashboardContainer';

const AppContainer = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div id="app" className="test">
      <NavbarContainer />
      <div className="">
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <ProtectedRoute path="/dashboard" component={DashboardContainer} />
          <ProtectedRoute path="/profile" component={ProfileContainer} />
        </Switch>
      </div>
    </div>
  );
};

export default AppContainer;