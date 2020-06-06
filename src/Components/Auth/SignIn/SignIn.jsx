import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

import SocialAuth from "../SocialAuth/SocialAuth.jsx";
import Sidebar from "../../Shared/AuthSidebar/AuthSidebar.jsx";
import "./SignIn.scss";
import logo from "../../../Assets/logo.svg";
import { login } from "../../../Redux/Actions/Login/loginAction";
import { errorToast } from "../../../Utils/toasts";

const loaderCss = css`
  display: inline-block;
`;
/**
 * This class contains methods
 * for signin component
 */
export class SignIn extends Component {
  /**
   * This method is a constructor which calls super() method
   * and initialize state object
   * @param {object} props props passed to this class.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  /**
   * This method is executed everytime the component updates.
   * @param {object} prevProps previous props of the component.
   * @returns {object} with a new state
   */
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state !== undefined && location.state.from !== undefined) {
      errorToast("Sign in to continue.");
      const state = { ...location.state };
      delete state.from;
      history.replace({ ...location, state });
    }
  }

  /**
   * This method handles the the onSubmit event.
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
   * This method handles the the onSubmit event.
   * @param {object} event event information.
   * @returns {void}
   */
  onSubmit = event => {
    event.preventDefault();
    const { loginAction } = this.props;
    const { email, password } = this.state;
    const formData = {
      email,
      password
    };
    loginAction(formData);
  };

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { email, password } = this.state;
    const { location, history, isAuthenticated, loading } = this.props;
    const { from } = location.state || { from: { pathname: "/home" } };
    if (isAuthenticated === true) {
      setTimeout(() => history.push(from.pathname), 500);
    }

    return (
      <div className="container">
        <Sidebar active="signIn" />
        <section className="main-signin">
          <div className="signin-section">
            <img
              src={`${logo}`}
              alt="Logo"
              className="signin-section__app-logo"
            />
            <h1 className="signin-section__text">Sign In</h1>
            <form onSubmit={this.onSubmit} className="signin-form">
              <input
                type="email"
                name="email"
                id="auth-email"
                value={email}
                placeholder="Email"
                onChange={this.onChange}
                required
                className="signin-form__input"
              />
              <input
                type="password"
                name="password"
                id="auth-password"
                value={password}
                placeholder="Password"
                onChange={this.onChange}
                required
                className="signin-form__input"
              />
              <Link to="/forgot" className="signin-form__forgot-password">
                Forgot password ?
              </Link>
              <button type="submit" className="signin-form__button">
                <div className="signin-form__button--content">
                  {loading ? (
                    <ScaleLoader
                      loading={loading}
                      size={22}
                      color="white"
                      css={loaderCss}
                    />
                  ) : (
                    "Sign In"
                  )}
                </div>
              </button>
            </form>
            <SocialAuth />
          </div>
        </section>
      </div>
    );
  }
}

SignIn.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.oneOfType([object]),
  loading: PropTypes.bool
};

SignIn.defaultProps = {
  isAuthenticated: false,
  location: {},
  loading: false
};

export const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  loading: state.login.loading
});

export const mapDispatchToProps = dispatch => ({
  loginAction: form => dispatch(login(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
