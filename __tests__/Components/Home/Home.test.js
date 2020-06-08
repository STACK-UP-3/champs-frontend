import React from "react";
import { shallow } from "enzyme";

import LatestTripsContainer from "../../../src/Components/LatestTrips/LatestTrips.jsx";
import CreateTripModal from "../../../src/Components/CreateTripModal/CreateTripModal.jsx";
import Home from "../../../src/Components/Home/Home";

describe("<Home />", () => {
  it("renders home component", () => {
    const testHome = shallow(<Home />);
    expect(testHome.find(".main").length).toEqual(1);
  });
  it("renders LatestTrips component", () => {
    const testHome = shallow(<Home />);
    expect(testHome.find(LatestTripsContainer).exists()).toBe(true);
  });
  it("Should simulate on click metod and display createTripModal", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(CreateTripModal).exists()).toBe(false);
    const createTripButton = wrapper.find(".main__show-button");
    expect(createTripButton.exists()).toBe(true);
    createTripButton.simulate("click");
    expect(wrapper.find(CreateTripModal).exists()).toBe(true);
  });
});
