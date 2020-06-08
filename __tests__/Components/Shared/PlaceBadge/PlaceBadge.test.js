import React from "react";
import { shallow } from "enzyme";

import PlaceBadge from "../../../../src/Components/Shared/PlaceBadge/PlaceBadge.jsx";

describe("PlaceBadge test suite", () => {
  it("should render the place badge component", () => {
    const wrapper = shallow(<PlaceBadge place="kigali" />);
    expect(wrapper.find(".place-badge").exists()).toBe(true);
  });
  it("should render with the place 'to' identifier instead of from", () => {
    const wrapper = shallow(<PlaceBadge place="kigali" isDestination />);
    expect(wrapper.find(".place-badge__identifier").exists()).toBe(true);
    expect(wrapper.find(".place-badge__identifier").text()).toBe("To");
  });
});
