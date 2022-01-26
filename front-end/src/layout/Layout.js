import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row col-md m-0 p-0">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col pl-0 ml-0 bg-light">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
