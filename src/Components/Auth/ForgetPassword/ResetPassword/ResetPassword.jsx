import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import logo from "../../../../Assets/logo.svg";
import "./ResetPassword.scss";

import Sidebar from "../../../Shared/AuthSidebar/AuthSidebar.jsx";
import { resetLink } from "../../../../Redux/Actions/PasswordReset/sendLinkAction";
import { succcessToast } from "../../../../Utils/toasts";

const loaderCss = css`
  display: inline-block;
`;
/**
 * This class contains methods
 * for signup component
 */
export class ResetPassword extends Component {
  /**
   * This method has a constructor which calls super() method
   * and initialize state object
   * @param {object} props props passed to this class.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  /**
   * This method handles onChange event.
   * @param {object} event event information.
   * @returns {void}
   */
  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  /**
   * This method handles onSubmit event.
   * @param {object} event event information.
   * @returns {void}
   */
  onSubmit = event => {
    event.preventDefault();
    const { sendLinkAction } = this.props;
    this.setState({ email: "" });
    const { email } = this.state;
    const formData = {
      email
    };
    sendLinkAction(formData);
  };

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { email } = this.state;
    const { status, loading } = this.props;
    if (status === 200) {
      succcessToast(
        "Password reset link has been sent to your email. Check it out!"
      );
    }

    return (
      <div className="container">
        <Sidebar active="signIn" />
        <section className="forget-password">
          <div className="change-password">
            <img
              src={`${logo}`}
              alt="Logo"
              className="change-password__mini-logo"
            />
            <h1 className="change-password__title">Reset Password</h1>
            <form onSubmit={this.onSubmit} className="change-password__form">
              <input
                type="email"
                name="email"
                id="auth-email"
                value={email}
                placeholder="Enter your email"
                onChange={this.onChange}
                required
                className="change-password__input"
              />
              <Link to="/signin" className="change-password__link">
                go back to sign in
              </Link>
              <button type="submit" className="change-password__button">
                <div className="change-password__button-content">
                  {loading ? (
                    <ScaleLoader
                      loading={loading}
                      size={22}
                      color="white"
                      css={loaderCss}
                    />
                  ) : (
                    "Send"
                  )}
                </div>
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  sendLinkAction: PropTypes.func.isRequired,
  status: PropTypes.number,
  loading: PropTypes.bool
};

ResetPassword.defaultProps = {
  status: 0,
  loading: false
};

export const mapStateToProps = state => ({
  status: state.resetLink.status,
  loading: state.resetLink.loading
});

export const mapDispatchToProps = dispatch => ({
  sendLinkAction: form => dispatch(resetLink(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
