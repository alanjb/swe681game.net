import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

require('dotenv').config({path: '../app/config/.env '})

const Auth0ProviderWithHistory = ({ children }) => {

  //use env vars here once we get it to work
  const domain = 'dev-zug4g8vr.us.auth0.com';
  const clientId = 'F5EuERVao0vUAB2ExXVCZUcV9J3sySkx';

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin + '/device-manager'}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;