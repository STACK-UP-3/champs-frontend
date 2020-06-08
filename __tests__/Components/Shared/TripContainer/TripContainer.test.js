import React from "react";
import { mount } from "enzyme";

import TripContainer from "../../../../src/Components/Shared/TripContainer/TripContainer.jsx";

describe("TripContainer test suite", () => {
  it("Should render without any problem", () => {
    const props = {
      title: "Going home",
      date: "20-04-2020",
      departure: "new york",
      destination: [
        {
          id: 1,
          name: "Kigali"
        }
      ]
    };
    const wrapper = mount(<TripContainer {...props} />);
    expect(wrapper.find(".trip-container").exists()).toBe(true);
  });
});
