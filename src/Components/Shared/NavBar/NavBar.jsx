import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <Fragment>
    <h1>Barefoot Nomad</h1>
    <nav className="header">
      <ul className="header">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
    <hr />
  </Fragment>
);

export default NavBar;
