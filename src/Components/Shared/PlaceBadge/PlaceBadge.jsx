import React from "react";
import PropTypes from "prop-types";
import "./PlaceBadge.scss";

const PlaceBadge = props => {
  const { place, isDestination, oval } = props;
  const componentClassName = oval
    ? "place-badge place-badge--oval"
    : "place-badge";
  return (
    <div className={componentClassName}>
      <span className="place-badge__identifier">
        {isDestination === true ? "To" : "From"}
      </span>
      {place}
    </div>
  );
};

PlaceBadge.propTypes = {
  place: PropTypes.string.isRequired,
  isDestination: PropTypes.bool,
  oval: PropTypes.bool
};

PlaceBadge.defaultProps = {
  isDestination: false,
  oval: false
};

export default PlaceBadge;
