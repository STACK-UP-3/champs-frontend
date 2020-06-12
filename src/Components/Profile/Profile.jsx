import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes, { object } from "prop-types";
import Sidebar from "../Shared/Dashboard/Sidebar/Sidebar.jsx";
import Header from "../Shared/Dashboard/Header/Header.jsx";
import user from "../../Assets/DashboardAssets/user_icon_big.svg";
import editIcon from "../../Assets/DashboardAssets/edit_icon.svg";
import saveIcon from "../../Assets/DashboardAssets/save_icon.svg";
import canselIcon from "../../Assets/DashboardAssets/cancel_icon.svg";
import {
  changeFieldValues,
  fetchUserProfileDetails,
  updateUserProfileDetails
} from "../../Redux/Actions/Profile/ProfileAction";
import "./Profile.scss";
import "../Shared/Dashboard/Dashboard.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "Profile",
      isCollapsed: false,
      isEditable: false,
      changed: false
    };
  }

  componentDidMount() {
    const {
      fetchUserProfileDetail,
      user: { isProfileUpdated, ...formData }
    } = this.props;

    const token = localStorage.getItem("token");
    fetchUserProfileDetail(token, formData);
  }

  handleChange = e => {
    const { changeValues } = this.props;
    this.setState({ changed: true });
    changeValues({ [e.target.name]: e.target.value });
  };

  toggleEditButton() {
    const { isEditable } = this.state;
    this.setState({ isEditable: !isEditable });
  }

  saveButton(e) {
    e.preventDefault();
    const {
      updateUserProfileData,
      user: { isProfileUpdated, ...formData }
    } = this.props;
    const { isEditable } = this.state;
    const token = localStorage.getItem("token");
    updateUserProfileData(token, formData);
    this.setState({ isEditable: !isEditable });
  }

  render() {
    const {
      user: { ...fields }
    } = this.props;
    const { selectedItem, isEditable, changed, isCollapsed } = this.state;
    return (
      <div className="App">
        <div className={`grid-container ${isCollapsed ? "collapsed" : ""}`}>
          ;
          <Header className="header" title={selectedItem} />
          <Sidebar
            className="grid-sidebar"
            selectedItem={selectedItem}
            handleCollapse={() => {
              this.setState({
                isCollapsed: !isCollapsed
              });
            }}
            isCollapsed={isCollapsed}
            onChange={selectItem => this.setState({ selectedItem: selectItem })}
          />
          <div className="content">
            <div className="content-container">
              <div className="profile-identity">
                <div className="profile-identity__profile">
                  <img src={user} className="image" alt="Profile" />
                  <div
                    className={`profile-identity__labels  ${
                      isEditable ? "isEditable" : ""
                    }`}
                  >
                    <div className="full-name">{`${
                      fields.firstname || "Full names"
                    } ${fields.lastname !== null ? fields.lastname : ""}`}</div>
                    <div className="role exceptional">
                      {fields.role || "Role"}
                    </div>
                    <div className="role exceptional">
                      {fields.email || "email"}
                    </div>
                  </div>
                </div>
                {isEditable ? (
                  <div className="profile-identity__edit-button">
                    <button
                      type="button"
                      onClick={e => this.saveButton(e)}
                      style={{ display: changed ? "block" : "none" }}
                    >
                      <img src={saveIcon} alt="Save" />
                    </button>
                    <button
                      type="button"
                      onClick={e => this.toggleEditButton(e)}
                      style={{ display: !changed ? "block" : "none" }}
                    >
                      <img src={canselIcon} alt="Cansel" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="profile-identity__edit-button"
                    type="button"
                    onClick={e => this.toggleEditButton(e)}
                  >
                    <img src={editIcon} alt="Edit" />
                  </button>
                )}
              </div>
              <div
                className={`profile-details ${isEditable ? "isEditable" : ""}`}
              >
                <div className="left-part">
                  <div className="input-field">
                    <div className="label-field">First name</div>
                    <div>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Your firstname"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={
                          fields.firstname !== null ? fields.firstname : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Last name</div>
                    <div>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Your lastname"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={fields.lastname !== null ? fields.lastname : ""}
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <div className="label-field">Birthday</div>
                    <div>
                      <input
                        type="date"
                        name="birthDate"
                        readOnly={!isEditable}
                        className="inputs"
                        onChange={e => this.handleChange(e)}
                        value={
                          fields.birthDate === null ? "" : fields.birthDate
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Gender</div>
                    <div>
                      <select
                        disabled={!isEditable}
                        name="gender"
                        onChange={e => this.handleChange(e)}
                        value={fields.gender === null ? "" : fields.gender}
                      >
                        <option value="">Select gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Username</div>
                    <div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Your username"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={fields.username !== null ? fields.username : ""}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Location</div>
                    <div>
                      <input
                        type="text"
                        name="location"
                        readOnly={!isEditable}
                        placeholder="Your city"
                        onChange={e => this.handleChange(e)}
                        value={fields.location !== null ? fields.location : ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="right-part">
                  <div className="input-field">
                    <div className="label-field">Email Notifications</div>
                    <div>
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        disabled={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={!!fields.emailNotifications}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">In App notifications</div>
                    <div>
                      <input
                        type="checkbox"
                        name="inAppNotifications"
                        disabled={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={!!fields.inAppNotifications}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Department</div>
                    <div>
                      <input
                        type="text"
                        name="department"
                        placeholder="Your department"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={
                          fields.department !== null ? fields.department : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Prefered language</div>
                    <div>
                      <input
                        type="text"
                        name="preferredLanguage"
                        placeholder="Your language"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={
                          fields.preferredLanguage !== null
                            ? fields.preferredLanguage
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <div className="label-field">Prefered currency</div>
                    <div>
                      <input
                        type="text"
                        name="preferredCurrency"
                        placeholder="Your currency"
                        readOnly={!isEditable}
                        onChange={e => this.handleChange(e)}
                        value={
                          fields.preferredCurrency !== null
                            ? fields.preferredCurrency
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.oneOfType([object]).isRequired,
  updateUserProfileData: PropTypes.func.isRequired,
  fetchUserProfileDetail: PropTypes.func.isRequired,
  changeValues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.login.loading,
  user: state.profile.user
});

export default connect(mapStateToProps, {
  changeValues: changeFieldValues,
  fetchUserProfileDetail: fetchUserProfileDetails,
  updateUserProfileData: updateUserProfileDetails
})(Profile);
