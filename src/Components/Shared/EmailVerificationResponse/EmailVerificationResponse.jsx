import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logo.svg";
import "./EmailVerificationResponse.scss";
import ResetSideBar from "../ResetSideBar/ResetSideBar.jsx";

const EmailVerificationResponse = () => {
  return (
    <div className="container">
      <ResetSideBar />
      <section className="email-section">
        <div className="email-contents">
          <img
            src={`${logo}`}
            alt="Logo"
            className="email-contents__mini-logo"
          />
          <form className="email-contents__form">
            <h3 className="email-contents__form--title">
              You have successfully verified your email.
            </h3>
            <p className="email-contents__form--text">
              You can now go to the login page
            </p>
            <Link to="/" className="email-contents__form__link">
              <button type="button" className="email-contents__form__button">
                <div className="email-contents__form__button--content">
                  Go to Sign In
                </div>
              </button>
            </Link>
          </form>
          <footer className="email-contents__footer">
            <div className="email-contents__footer--text">
              Copyright © 2020 Barefoot Nomad
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default EmailVerificationResponse;
