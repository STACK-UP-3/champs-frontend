/* eslint-disable no-plusplus */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import jwtDecode from "jwt-decode";

// import Trip from "../Shared/TripContainer/TripContainer.jsx";
import { getTrips } from "../../Redux/Actions/Trips/tripAction";
import { getPlaces } from "../../Redux/Actions/Places/placeAction";
import ApproveTrip from "../Shared/ApprovalContainer/ApproveTrip.jsx";

/**
 * This class contains methods
 * for LatestTrips component
 */
export class LatestTrips extends Component {
  /**
   * This method is executed when the component mounts.
   * @returns {void}
   */
  componentDidMount() {
    const { getAllTrips, getPlacesAction } = this.props;
    getAllTrips();
    getPlacesAction();
  }

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    // const token = localStorage.getItem("token");
    // const { role } = jwtDecode(token);

    const { allTrips, allPlaces } = this.props;
    let trips = [];
    if (allTrips.length > 1) {
      for (let i = 0; i < 1; i++) {
        trips.push(allTrips[i]);
      }
    } else {
      trips = allTrips;
    }
    const displayedTrips = trips.map(trip => {
      const destinations = [];
      trip.destination.forEach(element => {
        for (let index = 0; index < allPlaces.length; index++) {
          if (element === allPlaces[index].id) {
            destinations.push(allPlaces[index]);
          }
        }
      });
      return (
        <ApproveTrip
          title={trip.reasons}
          date={trip.date}
          departure={trip.Departure.name}
          destination={destinations}
          key={trip.id}
        />
      );
    });
    return (
      <div>
        {/* <h1>Latest trips</h1> */}
        {displayedTrips.length === 0 ? (
          <p>You haven&apos;t created any trip yet</p>
        ) : (
          displayedTrips
        )}
      </div>
    );
  }
}

LatestTrips.propTypes = {
  allPlaces: PropTypes.arrayOf(PropTypes.object),
  getPlacesAction: PropTypes.func.isRequired,
  getAllTrips: PropTypes.func.isRequired,
  allTrips: PropTypes.arrayOf(PropTypes.object)
};

LatestTrips.defaultProps = {
  allPlaces: [],
  allTrips: []
};

export const mapStateToProps = state => ({
  allPlaces: state.places.places,
  allTrips: state.trips.allTrips
});

export const mapDispatchToProps = dispatch => ({
  getPlacesAction: () => dispatch(getPlaces()),
  getAllTrips: () => dispatch(getTrips())
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestTrips);
