import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

import Sidebar from "../../Shared/AuthSidebar/AuthSidebar.jsx";
import "./SignUp.scss";
import logo from "../../../Assets/logo.svg";
import facebookLogo from "../../../Assets/facebookLogo.svg";
import googleLogo from "../../../Assets/googleLogo.svg";
import { signUp } from "../../../Redux/Actions/SignUp/signUpAction";
import { succcessToast } from "../../../Utils/toasts";

const loaderCss = css`
  display: inline-block;
`;
/**
 * This class contains methods
 * for signup component
 */
export class SignUp extends Component {
  /**
   * This method has a constructor which calls super() method
   * and initialize state object
   * @param {object} props props passed to this class.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: ""
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
    const { signUpAction } = this.props;
    const { firstname, lastname, username, email, password } = this.state;
    const form = {
      firstname,
      lastname,
      username,
      email,
      password
    };
    signUpAction(form);
  };

  /**
   * This method redirects a user to another page.
   * @returns {void}
   */
  redirect = () => {
    const { history } = this.props;
    history.push("/");
  };

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { firstname, lastname, username, email, password } = this.state;
    const { loading, status } = this.props;
    if (status === 201) {
      succcessToast(
        "Account has been created successfully. Check your email for a verification link."
      );
      this.redirect();
    }
    return (
      <div className="container">
        <Sidebar active="signUp" />
        <section className="main-signup">
          <div className="signup-section">
            <img
              src={`${logo}`}
              alt="Logo"
              className="signup-section__app-logo"
            />
            <h1 className="signup-section__title">Sign Up</h1>
            <form onSubmit={this.onSubmit} className="signup-form">
              <div className="signup-form__all-inputs">
                <div className="signup-form__right-inputs">
                  <input
                    type="firstname"
                    name="firstname"
                    id="auth-firstname"
                    value={firstname}
                    placeholder="First Name"
                    onChange={this.onChange}
                    required
                    className="signup-form__all-inputs__input"
                  />
                  <input
                    type="lastname"
                    name="lastname"
                    id="auth-lastname"
                    value={lastname}
                    placeholder="Last Name"
                    onChange={this.onChange}
                    required
                    className="signup-form__all-inputs__input"
                  />
                  <input
                    type="username"
                    name="username"
                    id="auth-username"
                    value={username}
                    placeholder="Username"
                    onChange={this.onChange}
                    required
                    className="signup-form__all-inputs__input"
                  />
                </div>
                <div className="signup-form__left-inputs">
                  <input
                    type="email"
                    name="email"
                    id="auth-email"
                    value={email}
                    placeholder="Email"
                    onChange={this.onChange}
                    required
                    className="signup-form__all-inputs__input"
                  />
                  <input
                    type="password"
                    name="password"
                    id="auth-password"
                    value={password}
                    placeholder="Password"
                    onChange={this.onChange}
                    required
                    className="signup-form__all-inputs__input"
                  />
                </div>
              </div>
              <button type="submit" className="signup-form__button">
                <div className="signup-form__button--content">
                  {loading ? (
                    <ScaleLoader
                      loading={loading}
                      size={22}
                      color="white"
                      css={loaderCss}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </div>
              </button>
            </form>
            <div className="signup-section__oauth">
              <span className="signup-section__oauth__text">
                {" "}
                signup with your social network{" "}
              </span>
              <div>
                <Link to="/#">
                  <img
                    src={`${facebookLogo}`}
                    alt="facebookLogo"
                    className="signup-section__oauth__logos"
                  />
                </Link>
                <Link to="/#">
                  <img
                    src={`${googleLogo}`}
                    alt="googleLogo"
                    className="signup-section__oauth__logos"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  status: PropTypes.number,
  loading: PropTypes.bool
};

SignUp.defaultProps = {
  status: 0,
  loading: false
};

export const mapStateToProps = state => ({
  status: state.signUp.status,
  loading: state.signUp.loading
});

export const mapDispatchToProps = dispatch => ({
  signUpAction: formData => dispatch(signUp(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
