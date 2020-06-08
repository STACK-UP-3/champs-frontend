import React from "react";
import { shallow } from "enzyme";

import CreateTripModal from "../../../src/Components/CreateTripModal/CreateTripModal.jsx";
import OneWayTripFormContainer from "../../../src/Components/OneWayTripForm/OneWayTripForm.jsx";

describe("CreateTripModal test suite", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateTripModal showModal={jest.fn()} />);
  });
  it("should render with no errors and show one way trip form", () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find(OneWayTripFormContainer).exists()).toBe(true);
  });

  it("should simulate change one trip type select", () => {
    const tripTypeSelect = wrapper.find("#trip-type-select");
    expect(tripTypeSelect.exists()).toBe(true);
    tripTypeSelect.simulate("change", {
      target: {
        value: "return"
      }
    });
    expect(wrapper.find("p").text()).toBe("return form");
    tripTypeSelect.simulate("change", {
      target: {
        value: "multiCity"
      }
    });
    expect(wrapper.find("p").text()).toBe("Multi-city form");
  });

  it("should simulate onclick event that closes the modal", () => {
    const showModal = jest.fn();
    const component = shallow(<CreateTripModal showModal={showModal} />);
    const closeButton = component.find(".modal-header__close-button");
    closeButton.simulate("click");
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(showModal).toHaveBeenCalledWith(false);
  });
});
