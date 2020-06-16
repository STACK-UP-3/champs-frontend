import React, { useState } from "react";
import "./ResetSideBar.scss";
import miniLogo from "../../../Assets/miniLogo.svg";

const ResetSideBar = () => {
  const [blurBackground, setBlurBackground] = useState("blur-background");
  const [sideBarClassName, setSideBarClassName] = useState("auth-sidebars");

  const hideSidebars = () => {
    setSideBarClassName("auth-sidebars");
    setBlurBackground("blur-background");
  };

  return (
    <div className="auth-sidebars-container">
      <nav className="auth-navbar">
        <img src={miniLogo} alt="Logo" className="auth-navbar__mini-logo" />
        <span className="auth-navbar__appname">Barefoot Nomad</span>
      </nav>
      <div className={blurBackground} id="blur-background">
        <button
          type="button"
          className="blur-background__button"
          onTouchEnd={hideSidebars}
          aria-label="buttton"
        />
      </div>
      <div className={sideBarClassName} id="side-bar">
        <h1 className="auth-sidebars__app-name">Barefoot Nomad</h1>
        <footer className="auth-sidebars__footer">
          Copyright © 2020 Barefoot Nomad
        </footer>
      </div>
    </div>
  );
};

export default ResetSideBar;
