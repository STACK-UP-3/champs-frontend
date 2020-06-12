import React from "react";
import Sidebar from "../Shared/Dashboard/Sidebar/Sidebar.jsx";
import Header from "../Shared/Dashboard/Header/Header.jsx";
import "../Shared/Dashboard/Dashboard.scss";

const Home = () => (
  <div className="App">
    <div className="grid-container">
      <Header className="header" />
      <Sidebar className="grid-sidebar" />
      <div className="content">Home</div>
    </div>
  </div>
);

export default Home;
