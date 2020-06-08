import React from "react";
import { Row } from "simple-flexbox";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import notification from "../../../../Assets/DashboardAssets/notification_icon.svg";
import userIcon from "../../../../Assets/DashboardAssets/user.svg";
import "./Header.scss";
import logo from "../../../../Assets/miniLogo.svg";

const Header = props => {
  const { title, ...otherProps } = props;
  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);
  return (
    <Row {...otherProps}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <span className="title">{title}</span>
      <Row vertical="center">
        <span className="name cursor-pointer">{username || "User"}</span>
        <div className="icon-styles">
          <img src={notification} alt="logo" />
        </div>
        <img src={userIcon} alt="avatar" className="avatar cursorPointer" />
      </Row>
    </Row>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: "Barefoot Nomad"
};

export default Header;
