/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Sidebar from "../Shared/Dashboard/Sidebar/Sidebar.jsx";
import Header from "../Shared/Dashboard/Header/Header.jsx";
import "../Shared/Dashboard/Dashboard.scss";
import CreateTripModal from "../CreateTripModal/CreateTripModal.jsx";
import LatestTripsContainer from "../LatestTrips/LatestTrips.jsx";
import TripStatusContainer from "../Shared/TripStatus/TripStatus.jsx";
import PopularPlacesContainer from "../PopularPlaces/PopularPlaces.jsx";
import { getValuesFromToken } from "../../Utils/tokenVerify";

import "./Home.scss";

const Home = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const displayModal = value => {
    setIsModalShown(value);
  };
  const { firstname, lastname } = getValuesFromToken();
  return (
    <div className="App">
      <div className="grid-container">
        <Header className="header" />
        <Sidebar className="grid-sidebar" />
        <div className="content">
          <section className="main">
            <div className="first-grid-wrapper">
              <h1 className="first-grid-wrapper__greetings">
                Hello,{" "}
                <span className="first-grid-wrapper__greetings--names">
                  {firstname}
                </span>{" "}
                <span className="first-grid-wrapper__greetings--names">
                  {lastname}
                </span>
              </h1>
              <div className="trip-status-container">
                <TripStatusContainer status="Accepted" numberOfTrips={5} />
                <TripStatusContainer status="Pending" numberOfTrips={5} />
                <TripStatusContainer status="Rejected" numberOfTrips={5} />
              </div>
            </div>
            <div className="second-grid-wrapper">
              <PopularPlacesContainer showTripModal={displayModal} />
            </div>
            <div className="third-grid-wrapper">
              <LatestTripsContainer />
            </div>
          </section>
          {isModalShown ? <CreateTripModal showModal={displayModal} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
