/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";

import Option from "../Shared/Option/Option.jsx";
import { createOneWayTrip } from "../../Redux/Actions/Trips/tripAction";
import { errorToast } from "../../Utils/toasts";

import "./OneWayTripForm.scss";

const loaderCss = css`
  display: inline-block;
`;

let today = new Date();
today.setDate(today.getDate() + 1);
today = today.toISOString().substr(0, 10);
const initialState = {
  departure: 0,
  destination: 0,
  tripReason: "",
  departureDate: today
};

/**
 * This class contains methods
 * for OneWayTripForm component
 */
export class OneWayTripForm extends Component {
  /**
   * This method is a constructor which calls super() method
   * and initialize state object
   * @param {object} props props passed to this class.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { isCreateTripSuccess, closeModal } = this.props;
    if (
      prevProps.isCreateTripSuccess !== isCreateTripSuccess &&
      isCreateTripSuccess === true
    ) {
      closeModal(false);
      this.resetForm();
    }
  }

  /**
   * This method handles the the onChange event.
   * @param {object} event event information.
   * @returns {Function} that sets new state
   */
  handleChange = event => {
    const { name, value } = event.target;
    // if (name === "destination") {
    //   return this.setState(oldState => {
    //     const { destination } = oldState;
    //     destination.push(Number(value));
    //     return {
    //       ...oldState,
    //       destination
    //     };
    //   });
    // }
    return this.setState({ [name]: value });
  };

  /**
   * This method handles the the onSubmit event.
   * @param {object} event event information.
   * @returns {Function} that show toast message
   * @returns {Function} that calls an action creator
   */
  handleSubmit = event => {
    event.preventDefault();
    const { departure, destination, tripReason, departureDate } = this.state;
    const { createOneWayTripAction, closeModal } = this.props;
    const isValid = this.validate();
    // destination.shift();
    // const submittedDestinations = [...new Set(destination)];
    if (isValid) {
      const submittedDestinations = [destination];
      const submittedTripData = {
        departure,
        destination: submittedDestinations,
        reasons: tripReason,
        date: departureDate
      };
      createOneWayTripAction(submittedTripData);
    }
  };

  validate = () => {
    const { departure, destination, tripReason } = this.state;
    if (departure === 0) {
      errorToast("Please select departure");
      return false;
    }

    if (destination === 0) {
      errorToast("Please select destination");
      return false;
    }

    if (departure === destination) {
      errorToast("Departure and destination are not allowed to be the same");
      return false;
    }

    if (tripReason === "") {
      errorToast("Please add a reason");
      return false;
    }

    return true;
  };

  resetForm = () => this.setState(initialState);

  /**
   * This method renders content in the DOM
   * @returns {JSX} to be rendered on the screen
   */
  render() {
    const { departure, destination, tripReason, departureDate } = this.state;

    const { places, loading, tripType, setTripType } = this.props;
    const placeOptions = places.map(place => (
      <Option info={place.name} value={place.id} key={place.id} />
    ));
    return (
      <form className="create-trip-form" onSubmit={this.handleSubmit}>
        <div className="input-wrapper">
          <select
            value={tripType}
            onChange={e => setTripType(e.target.value)}
            className="modal-contents__trip-type-select"
            id="trip-type-select"
          >
            <option value="oneWay"> One way</option>
            <option value="return"> Return </option>
            <option value="multiCity"> Multi city </option>
          </select>
        </div>

        <div className="input-wrapper input-wrapper--group">
          <select
            value={departure}
            name="departure"
            onChange={this.handleChange}
            className="input-wrapper__inputs"
            id="departure-input"
            required
          >
            <Option
              info="Select Departure"
              value={0}
              hidden
              disabled
              invalid="invalid"
            />
            {placeOptions}
          </select>
          <select
            value={destination}
            name="destination"
            onChange={this.handleChange}
            className="input-wrapper__inputs"
            id="destination-input"
            required
          >
            <Option
              info="Select Destination"
              value={0}
              hidden
              disabled
              invalid="invalid"
            />
            {placeOptions}
          </select>
        </div>
        <div className="input-wrapper input-wrapper--group">
          <div className="input-wrapper">
            <span className="input-wrapper__inputs input-wrapper__inputs--title">
              {" "}
              Departure Date
            </span>
            <input
              type="date"
              name="departureDate"
              className="input-wrapper__inputs input-wrapper__inputs--date-text"
              value={departureDate}
              min={today}
              id="departure-date-input"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <span
              htmlFor="textarea-title"
              className="input-wrapper__inputs input-wrapper__inputs--title"
            >
              {" "}
              Trip Reason
            </span>
            <input
              value={tripReason}
              className="input-wrapper__inputs input-wrapper__inputs--date-text"
              name="tripReason"
              id="trip-reason-input"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <br />
        <div className="input-wrapper">
          <button type="submit" className="input-wrapper__submit-button">
            <div className="input-wrapper__submit-button--content">
              {loading ? (
                <ScaleLoader
                  loading={loading}
                  size={22}
                  color="white"
                  css={loaderCss}
                />
              ) : (
                "Save"
              )}
            </div>
          </button>
        </div>
      </form>
    );
  }
}

OneWayTripForm.propTypes = {
  createOneWayTripAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  places: PropTypes.arrayOf(PropTypes.object),
  isCreateTripSuccess: PropTypes.bool,
  closeModal: PropTypes.func,
  tripType: PropTypes.string,
  setTripType: PropTypes.func
};

OneWayTripForm.defaultProps = {
  closeModal: () => {},
  setTripType: () => {},
  tripType: "oneWay",
  loading: false,
  places: [],
  isCreateTripSuccess: false
};

export const mapStateToProps = state => ({
  places: state.places.places,
  loading: state.trips.createTripLoading,
  isCreateTripSuccess: state.trips.isCreatedTripSuccess
});

export const mapDispatchToProps = dispatch => ({
  createOneWayTripAction: form => dispatch(createOneWayTrip(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(OneWayTripForm);
