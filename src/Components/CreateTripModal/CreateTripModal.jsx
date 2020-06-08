import React, { useState } from "react";
import PropTypes from "prop-types";

import OneWayTripFormContainer from "../OneWayTripForm/OneWayTripForm.jsx";
import "./CreateTripModal.scss";

const CreateTripModal = props => {
  const [tripType, setTripType] = useState("oneWay");
  let displayedForm;
  if (tripType === "oneWay") {
    displayedForm = (
      <OneWayTripFormContainer
        closeModal={props.showModal}
        tripType={tripType}
        setTripType={setTripType}
      />
    );
  } else if (tripType === "multiCity") {
    displayedForm = (
      <div>
        {" "}
        <p>Multi-city form</p>
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
    );
  } else {
    displayedForm = (
      <div>
        {" "}
        <p>Return form</p>
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
    );
  }

  const hideModal = () => {
    props.showModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-contents">
        <div className="modal-header">
          <h1 className="modal-header__title">Create Trip</h1>
          <button
            type="button"
            className="modal-header__close-button"
            onClick={hideModal}
          >
            x
          </button>
        </div>
        {displayedForm}
      </div>
    </div>
  );
};

CreateTripModal.propTypes = {
  showModal: PropTypes.func.isRequired
};

export default CreateTripModal;
