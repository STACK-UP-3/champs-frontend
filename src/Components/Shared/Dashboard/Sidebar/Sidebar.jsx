import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SidebarItem from "./SidebarItem.jsx";
import home from "../../../../Assets/DashboardAssets/home_icon.svg";
import profile from "../../../../Assets/DashboardAssets/profile_icon.svg";
import trip from "../../../../Assets/DashboardAssets/trip_icon.svg";
import settings from "../../../../Assets/DashboardAssets/settings_icon.svg";
import users from "../../../../Assets/DashboardAssets/users_icon.svg";
import "./Sidebar.scss";

const Sidebar = props => {
  const { onChange, selectedItem, handleCollapse } = props;
  const onItemClicked = item => {
    return onChange(item);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar__menu">
        <li className="sidebar__menu-item" />
        <Link to="/home">
          <SidebarItem title="Home" image={home} />
        </Link>
        <Link to="/profile">
          <SidebarItem
            title="Profile"
            image={profile}
            onClick={() => onItemClicked("profile")}
            active={selectedItem === "Profile"}
          />
        </Link>
        <SidebarItem title="Trip" image={trip} />
        <Link to="/users">
          <SidebarItem
            title="Users"
            image={users}
            onClick={() => onItemClicked("users")}
            active={selectedItem === "Users"}
          />
        </Link>
        <li className="sidebar__menu-setting" title="Settings">
          <button
            type="button"
            className="toggle-menu-button"
            onClick={() => handleCollapse()}
          />
          <img className="sidebar__icon" src={settings} alt="settings" />
          <span className="sidebar__menu-item-title active active-title">
            Settings
          </span>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired
};

export default Sidebar;
