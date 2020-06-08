/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem.jsx";
import home from "../../../../Assets/DashboardAssets/home_icon.svg";
import profile from "../../../../Assets/DashboardAssets/profile_icon.svg";
import trip from "../../../../Assets/DashboardAssets/trip_icon.svg";
import settings from "../../../../Assets/DashboardAssets/settings_icon.svg";
import users from "../../../../Assets/DashboardAssets/users_icon.svg";
// import rightArrow from "../../../../Assets/DashboardAssets/double-right.svg";
// import leftArrow from "../../../../Assets/DashboardAssets/double-left.svg";
import "./Sidebar.scss";

const Sidebar = ({ onChange, selectedItem }) => {
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
          <span className="toggle-menu-button" />
          <img className="sidebar__icon" src={settings} alt="settings" />
          <span className="sidebar__menu-item-title active active-title">
            Settings
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
