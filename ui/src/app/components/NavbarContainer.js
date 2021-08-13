import React from "react";

import MainNav from "./MainNav";

const NavBarContainer = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <MainNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBarContainer;
