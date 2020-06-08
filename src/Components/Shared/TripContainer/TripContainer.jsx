import React from "react";
import PropTypes from "prop-types";

import PlaceBadgeContainer from "../PlaceBadge/PlaceBadge.jsx";
import tripImage from "../../../Assets/tripImage.svg";
import "./TripContainer.scss";

const TripContainer = props => {
  const { title, date, departure, destination } = props;
  const displayedDate = new Date(date).toDateString().substr(4, 11);
  const displayedDestinations = destination.map(dest => (
    <PlaceBadgeContainer isDestination place={dest.city} key={dest.id} oval />
  ));
  return (
    <div className="trip-container">
      <img src={tripImage} alt="trip" />
      <div className="trip-container-content">
        <h1 className="trip-container-content__title">{title}</h1>
        <PlaceBadgeContainer place={departure} oval />
        {displayedDestinations}
        <span className="trip-container-content__date">
          Date: {displayedDate}{" "}
        </span>
      </div>
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
