import React from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Header from "./Header/Header.jsx";
import Content from "./Content/Content.jsx";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="App">
      <div className="grid-container">
        <Header className="header" />
        <Sidebar className="grid-sidebar" />
        <Content />
      </div>
    </div>
  );
};
export default Dashboard;
