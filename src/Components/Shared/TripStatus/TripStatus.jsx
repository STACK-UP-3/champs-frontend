import React from "react";
import PropTypes from "prop-types";

import pendingTripIcon from "../../../Assets/pendingTripIcon.svg";
import acceptedTripIcon from "../../../Assets/acceptedTripIcon.svg";
import rejectedTripIcon from "../../../Assets/rejectedTripIcon.svg";

import "./TripStatus.scss";

const TripStatus = props => {
  const { status, numberOfTrips } = props;
  let tripIcon;
  if (status === "Pending") {
    tripIcon = pendingTripIcon;
  } else if (status === "Rejected") {
    tripIcon = rejectedTripIcon;
  } else {
    tripIcon = acceptedTripIcon;
  }
  return (
    <div className="trip-status">
      <img src={tripIcon} alt="status" className="trip-status__icon" />
      <span className="trip-status__number-of-trips">{numberOfTrips}</span>
      <span className="trip-status__status-text">{status}</span>
    </div>
  );
};

TripStatus.propTypes = {
  status: PropTypes.string.isRequired,
  numberOfTrips: PropTypes.number.isRequired
};

export default TripStatus;
