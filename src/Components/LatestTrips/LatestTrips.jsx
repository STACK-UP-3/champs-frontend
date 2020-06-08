/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";

import Pagination from "react-js-pagination";
import Trip from "../Shared/TripContainer/TripContainer.jsx";
import { getTrips } from "../../Redux/Actions/Trips/tripAction";
import { getPlaces } from "../../Redux/Actions/Places/placeAction";

import "./LatestTrips.scss";

/**
 * This class contains methods
 * for LatestTrips component
 */
export class LatestTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripsPerPage: 2,
      trips: [],
      currentPage: 1
    };
  }

  /**
   * This method is executed when the component mounts.
   * @returns {void}
   */
  componentDidMount() {
    const { getAllTrips, getPlacesAction } = this.props;
    getAllTrips();
    getPlacesAction();
  }

  updateTrips = newTrips => {
    this.setState({
      trips: newTrips
    });
  };

  handlePageChange = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { allTrips, allPlaces, getTripsLoading } = this.props;
    const { trips, currentPage, tripsPerPage } = this.state;
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    const latestTrips = allTrips.filter(trip => {
      const currentMonth = new Date().getMonth();
      const tripMonth = new Date(trip.date).getMonth();
      return currentMonth === tripMonth;
    });
    if (JSON.stringify(trips) !== JSON.stringify(latestTrips)) {
      this.updateTrips(latestTrips);
    }
    const paginatedTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
    const displayedTrips = paginatedTrips.map(trip => {
      const destinations = [];
      trip.destination.forEach(element => {
        for (let index = 0; index < allPlaces.length; index++) {
          if (element === allPlaces[index].id) {
            destinations.push(allPlaces[index]);
          }
        }
      });
      return (
        <Trip
          title={trip.reasons}
          date={trip.date}
          departure={trip.Departure.city}
          destination={destinations}
          key={trip.id}
        />
      );
    });

    return (
      <div className="latest-trips-container">
        <h1 className="latest-trips-container__title">Latest trips</h1>
        {displayedTrips.length === 0 ? (
          <p>You haven&apos;t created any trip yet</p>
        ) : (
          displayedTrips
        )}
        <div className="loader">
          <HashLoader loading={getTripsLoading} size={100} color="#9D83E5" />
        </div>
        <Pagination
          activePage={currentPage}
          onChange={this.handlePageChange}
          itemsCountPerPage={2}
          totalItemsCount={latestTrips.length}
          hideFirstLastPages
          innerClass="pagination"
          itemClass="pagination-number"
          linkClass="pagination-number__link"
          activeLinkClass="pagination-number__link--active"
          prevPageText="PREV"
          nextPageText="NEXT"
        />
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
  allTrips: state.trips.allTrips,
  getTripsLoading: state.trips.getTripsLoading
});

export const mapDispatchToProps = dispatch => ({
  getPlacesAction: () => dispatch(getPlaces()),
  getAllTrips: () => dispatch(getTrips())
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestTrips);
