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
        <div className="email-content">
          <img
            src={`${logo}`}
            alt="Logo"
            className="email-content__mini-logo"
          />
          <form className="email-content__form">
            <h3 className="email-content__title">
              You have successfully verified your email.
            </h3>
            <p className="email-content__text">
              You can now go to the login page
            </p>
            <Link to="/" className="email-content__link">
              <button type="button" className="email-content__button">
                <div className="email-content__button-content">
                  Go to Sign In
                </div>
              </button>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EmailVerificationResponse;
