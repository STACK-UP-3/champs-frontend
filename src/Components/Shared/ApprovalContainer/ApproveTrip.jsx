import React from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import PlaceBadgeContainer from "../PlaceBadge/PlaceBadge.jsx";
import tripImage from "../../../Assets/tripImage.svg";
import Header from "../Dashboard/Header/Header.jsx";
import Sidebar from "../Dashboard/Sidebar/Sidebar.jsx";
import user from "../../../Assets/DashboardAssets/user.svg";
import "./ApproveTrip.scss";

const TripContainer = props => {
  const { title, date, departure, destination } = props;
  const displayedDate = new Date(date).toDateString().substr(4, 11);
  const displayedDestinations = destination.map(dest => (
    <PlaceBadgeContainer isDestination place={dest.name} key={dest.id} />
  ));

  const token = localStorage.getItem("token");
  const { username, email, role, department } = jwtDecode(token);

  return (
    <div className="container">
      <Header />
      <Sidebar />
      <section className="content-section">
        <div className="approval-table">
          <div className="approval-table__site-title">
            <h3>Assigned Trips</h3>
            <hr />
          </div>

          <div className="page-filter">
            <div className="page-filter__filter-by-status">
              <span className="page-filter__filter-text">Filter</span>
              <select>
                <option>Status</option>
                <option>Pending</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </select>
            </div>
          </div>

          <div className="approval-item">
            <div className="approval-item__item-space">
              <img src={tripImage} alt="profile" />

              <div className="approval-item__reason">
                <h5 className="approval-item__title">{title}</h5>
                <div className="approval-item__destination">
                  <span className="approval-item__from">
                    <span className="approval-item__label" />
                    <PlaceBadgeContainer place={departure} />
                  </span>
                  <span className="approval-item__to">
                    <span className="approval-item__label" />
                    {displayedDestinations}
                  </span>
                </div>
                <div className="approval-item__date">Date: {displayedDate}</div>
              </div>

              <div className="approval-item__button">
                <button
                  type="button"
                  className="approval-item__button--btn-primary"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="approval-item__button--btn-danger"
                >
                  Reject
                </button>

                <i className="approval-item__arrow-up">&nbsp;</i>
              </div>

              <div className="item-details">
                <img
                  src={user}
                  alt="profile"
                  className="item-details__profile-picture"
                />

                <div className="item-details__text">
                  <h4 className="item-details__username">{username}</h4>
                  <span className="item-details__requester">{role}</span>
                  <br />
                  <span className="item-details__email">{email}</span>
                  <br />
                  <span className="item-details__department">{department}</span>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

TripContainer.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  departure: PropTypes.string,
  destination: PropTypes.arrayOf(PropTypes.object)
};

TripContainer.defaultProps = {
  title: "",
  date: "",
  departure: "",
  destination: []
};

export default TripContainer;
