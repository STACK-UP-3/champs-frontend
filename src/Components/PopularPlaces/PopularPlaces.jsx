import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Places from "../Shared/PlaceContainer/PlaceContainer.jsx";

import "./PopularPlaces.scss";

const PopularPLaces = props => {
  const { places } = props;
  const displayedPlaces = places.map(place => (
    <Places city={place.city} country={place.country} />
  ));
  return (
    <div className="popular-place">
      <div className="popular-places-header">
        <h1 className="popular-places-header__heading">Popular Places</h1>
        <span className="popular-places-header__link">See all</span>
      </div>
      <div className="popular-place-container">{displayedPlaces}</div>
      <button
        type="button"
        className="popular-place__show-button"
        onClick={() => props.showTripModal(true)}
      >
        + Create Trip
      </button>
    </div>
  );
};

PopularPLaces.propTypes = {
  showTripModal: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    })
  )
};

PopularPLaces.defaultProps = {
  places: []
};

const mapStateToProps = state => ({
  places: state.places.places
});

export default connect(mapStateToProps)(PopularPLaces);
