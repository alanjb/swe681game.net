import {NavLink} from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const MainNav = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0(); 

  return (
    <div className="navbar-nav mr-auto">
      {!isLoading && user && ( <NavLink
        to="/dashboard"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Dashboard
      </NavLink>
      )}

      {!isLoading && user && (<NavLink
        to="/profile"
        exact
        className="nav-link"
        activeClassName="router-link-exact-active"
      >
        Profile
      </NavLink>
      )}

      {!isLoading && !user && (
        <button 
          className="btn btn-primary btn-block"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )} 
      
      {!isLoading && user && (
        <button className="btn btn-warning btn-block"
        onClick={() => logout()}
        >
          Log Out
        </button>
      )} 
    </div>
  );
}

export default MainNav;
