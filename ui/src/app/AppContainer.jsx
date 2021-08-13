import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import NavbarContainer from "./components/NavbarContainer";
import "../app.css";
import {
  Switch,
  Route,
} from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import ProfileContainer from './components/ProfileContainer';
import ProtectedRoute from './security/protected-route';
import DeviceManagerContainer from '../device-manager/DeviceManagerContainer';

const AppContainer = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavbarContainer />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <ProtectedRoute path="/device-manager" component={DeviceManagerContainer} />
          <ProtectedRoute path="/profile" component={ProfileContainer} />
        </Switch>
      </div>
    </div>
  );
};

export default AppContainer;