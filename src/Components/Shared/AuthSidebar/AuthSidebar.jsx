import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./AuthSidebar.scss";
import hamburger from "../../../Assets/hamburger.svg";
import miniLogo from "../../../Assets/miniLogo.svg";

const AuthSidebar = props => {
  const { active } = props;
  if (active === undefined) {
    return undefined;
  }

  const [blurBackground, setBlurBackground] = useState("blur-background");
  const [sideBarClassName, setSideBarClassName] = useState("auth-sidebar");

  const showSidebar = () => {
    const activeClass = "active";
    setSideBarClassName(`auth-sidebar auth-sidebar--${activeClass}`);
    setBlurBackground(`blur-background blur-background--${activeClass}`);
  };

  const hideSidebar = () => {
    setSideBarClassName("auth-sidebar");
    setBlurBackground("blur-background");
  };

  return (
    <div className="auth-sidebar-container">
      <nav className="auth-navbar">
        <img src={miniLogo} alt="Logo" className="auth-navbar__mini-logo" />
        <span className="auth-navbar__appname">Barefoot Nomad</span>
        <button
          type="button"
          onClick={showSidebar}
          className="auth-navbar__hamburger"
        >
          <img
            src={hamburger}
            alt="hamburger"
            className="auth-navbar__hamburger__image"
          />
        </button>
      </nav>
      <div className={blurBackground} id="blur-background">
        <button
          type="button"
          className="blur-background__button"
          onTouchEnd={hideSidebar}
          aria-label="buttton"
        />
      </div>
      <div className={sideBarClassName} id="side-bar">
        <h1 className="auth-sidebar__app-name">Barefoot Nomad</h1>
        <div className="auth-sidebar__nav">
          <Link
            to="/"
            className={
              active === "signIn"
                ? "auth-sidebar__nav__links auth-sidebar__nav__links--active"
                : "auth-sidebar__nav__links"
            }
            id="sign-in-link"
          >
            <span className="auth-sidebar__nav__links__link-text">Sign In</span>
          </Link>
          <Link
            to="/signup"
            className={
              active === "signUp"
                ? "auth-sidebar__nav__links auth-sidebar__nav__links--active"
                : "auth-sidebar__nav__links"
            }
            id="sign-up-link"
          >
            <span className="auth-sidebar__nav__links__link-text">Sign Up</span>
          </Link>
        </div>
        <footer className="auth-sidebar__footer">
          Copyright © 2020 Barefoot Nomad
        </footer>
      </div>
    </div>
  );
};

AuthSidebar.propTypes = {
  active: PropTypes.string
};

AuthSidebar.defaultProps = {
  active: undefined
};

export default AuthSidebar;
