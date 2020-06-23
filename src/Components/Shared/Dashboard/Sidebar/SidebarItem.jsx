import React from "react";
import { string, bool } from "prop-types";
import "./Sidebar.scss";

function SidebarItem(props) {
  const { title, image, active } = props;
  return (
    <li
      className={`sidebar__menu-item ${
        active ? "sidebar__menu-item__selected" : ""
      }`}
    >
      <img className="sidebar__icon" src={image} alt={title} />
      <span className="sidebar__menu-item-title active active-title">
        {title}
      </span>
    </li>
  );
}

SidebarItem.propTypes = {
  title: string,
  active: bool,
  image: string.isRequired
};

SidebarItem.defaultProps = {
  title: string,
  active: false
};

export default SidebarItem;
