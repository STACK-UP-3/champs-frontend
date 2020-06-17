import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import logo from "../../../../Assets/logo.svg";
import "./ChangePassword.scss";

import Sidebar from "../../../Shared/AuthSidebar/AuthSidebar.jsx";
import { passwordUpdate } from "../../../../Redux/Actions/PasswordReset/passwordResetAction";
import { succcessToast } from "../../../../Utils/toasts";

const loaderCss = css`
  display: inline-block;
`;
/**
 * This class contains methods
 * for signup component
 */
export class UpdatePassword extends Component {
  /**
   * This method has a constructor which calls super() method
   * and initialize state object
   * @param {object} props props passed to this class.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordConfirm: ""
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
    const { passwordResetAction } = this.props;
    const { password, passwordConfirm } = this.state;
    const formData = {
      password,
      passwordConfirm
    };
    passwordResetAction(formData);
  };

  /**
   * This method redirects a user to another page.
   * @returns {void}
   */
  redirect = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { password, passwordConfirm } = this.state;
    const { loading, status } = this.props;
    if (status === 200) {
      succcessToast("The password has been reset successfully.");
      this.redirect();
    }

    return (
      <div className="container">
        <Sidebar active="signIn" />
        <section className="reset-password">
          <div className="update-password">
            <img
              src={`${logo}`}
              alt="Logo"
              className="update-password__mini-logo"
            />
            <h1 className="update-password__title">Change Password</h1>
            <form onSubmit={this.onSubmit} className="update-password__form">
              <input
                type="password"
                name="password"
                id="auth-password"
                value={password}
                placeholder="New Password"
                onChange={this.onChange}
                required
                className="update-password__input"
              />
              <input
                type="password"
                name="passwordConfirm"
                id="auth-passwordConfirm"
                value={passwordConfirm}
                placeholder="Confirm Password"
                onChange={this.onChange}
                required
                className="update-password__input"
              />
              <Link to="/signin" className="update-password__link">
                go back to sign in
              </Link>
              <button type="submit" className="update-password__button">
                <div className="update-password__button-content">
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

UpdatePassword.propTypes = {
  passwordResetAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  status: PropTypes.number,
  loading: PropTypes.bool
};

UpdatePassword.defaultProps = {
  status: 0,
  loading: false
};

export const mapStateToProps = state => ({
  status: state.passwordUpdate.status,
  loading: state.passwordUpdate.loading
});

export const mapDispatchToProps = dispatch => ({
  passwordResetAction: form => dispatch(passwordUpdate(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
