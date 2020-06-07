import React from "react";
import PropTypes, { func, element } from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import tokenVerify, { getTokenFromParams } from "../../../Utils/tokenVerify";

export const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const token = getTokenFromParams(props.location.search);
      return isAuthenticated === true || tokenVerify(token) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathName: "/signin",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.oneOfType([func, element]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object])
};

ProtectedRoute.defaultProps = {
  isAuthenticated: false,
  location: {}
};

export const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);
