import React, { Component } from "react";
import Sidebar from "../Shared/Dashboard/Sidebar/Sidebar.jsx";
import Header from "../Shared/Dashboard/Header/Header.jsx";
import "../Shared/Dashboard/Dashboard.scss";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: "Users" };
  }

  render() {
    const { selectedItem } = this.state;
    return (
      <div className="App">
        <div className="grid-container">
          <Header className="header" title={selectedItem} />
          <Sidebar
            className="grid-sidebar"
            selectedItem={selectedItem}
            onChange={selectItem => this.setState({ selectedItem: selectItem })}
          />
          <div className="content">Users</div>
        </div>
      </div>
    );
  }
}

export default Users;
