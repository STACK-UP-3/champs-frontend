import React from "react";
import { shallow } from "enzyme";

import Option from "../../../../src/Components/Shared/Option/Option.jsx";

describe("PlaceBadge test suite", () => {
  it("should render the Option block ", () => {
    const wrapper = shallow(<Option info="select me" />);
    expect(wrapper.find("option").exists()).toBe(true);
  });
});
