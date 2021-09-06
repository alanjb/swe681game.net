import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Auth0ProviderWithHistory from "./app/security/auth0Provider";
import { Router } from "react-router-dom";
import AppContainer from "./app/AppContainer";
import dotenv from 'dotenv';
import history from './app/routing/history';

dotenv.config();

ReactDOM.render(
    <Router history={history}>
      <Auth0ProviderWithHistory>
        <AppContainer/>
      </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();