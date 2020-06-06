import React from "react";
import { Link } from "react-router-dom";
import miniLogo from "../../../Assets/miniLogo.svg";
import "./EmailVerificationResponse.scss";

const EmailVerificationResponse = () => {
  return (
    <div className="email-contents">
      <img src={miniLogo} alt="Logo" className="email-contents__mini-logo" />
      <div className="email-contents__message">
        <h3>You have successfully verified your email.</h3>
        <p>You can now go to the login page</p>
      </div>
      <div className="email-response">
        <Link to="/signin">
          <button type="button" className="email-response__button">
            <div className="email-response__button--content">go to sign in</div>
          </button>
        </Link>
      </div>
      <footer className="email-contents__footer">
        <div className="email-contents__footer--text">
          Copyright © 2020 Barefoot Nomad
        </div>
      </footer>
    </div>
  );
};

export default EmailVerificationResponse;
