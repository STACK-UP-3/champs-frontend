import React from "react";
import PropTypes from "prop-types";
import defaultPLace from "../../../Assets/defaultPlaceImage.svg";

import "./PlaceContainer.scss";

export const PlaceContainer = props => {
  const { placeImage, country, city } = props;
  return (
    <div className="Place-container">
      <img src={placeImage} alt="place" />
      <div className="place-info">
        <span className="place-info__country">{country}</span>
        <span className="place-info__city"> {city} </span>
      </div>
    </div>
  );
};

PlaceContainer.propTypes = {
  placeImage: PropTypes.node,
  country: PropTypes.string,
  city: PropTypes.string
};

PlaceContainer.defaultProps = {
  placeImage: defaultPLace,
  country: "",
  city: ""
};

export default PlaceContainer;
