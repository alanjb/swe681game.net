import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import NavbarContainer from "./components/navigation/NavbarContainer";
import {
  Switch,
  Route,
} from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import ProfileContainer from '../profile/components/ProfileContainer';
import ProtectedRoute from './security/protected-route';
import DashboardContainer from './components/DashboardContainer';
import GameContainer from '../game/components/GameContainer';

const AppContainer = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="app-container">
      <NavbarContainer />
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <ProtectedRoute path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute path="/profile" component={ProfileContainer} />
        <ProtectedRoute path="/game/:gameId" component={GameContainer} />
      </Switch>
    </div>
  );
};

export default AppContainer;