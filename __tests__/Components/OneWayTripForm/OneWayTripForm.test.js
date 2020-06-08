import React from "react";
import { mount } from "enzyme";

import {
  OneWayTripForm,
  mapDispatchToProps,
  mapStateToProps
} from "../../../src/Components/OneWayTripForm/OneWayTripForm";

const setup = props => {
  const component = mount(<OneWayTripForm {...props} />);
  return component;
};

const simulateChangeOnInput = (
  component,
  inputSelector,
  inputName,
  newValue
) => {
  const input = component.find(inputSelector);
  input.simulate("change", {
    target: {
      name: inputName,
      value: newValue
    }
  });
  return component.find(inputSelector);
};

describe("OneWayTripModal test suite", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      places: [
        {
          id: 1,
          name: "kigali branch",
          country: "Rwanda",
          city: "kigali city",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        },
        {
          id: 2,
          name: "new york branch",
          country: "USA",
          city: "new york",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        },
        {
          id: 3,
          name: "paris branch",
          country: "France",
          city: "paris",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        }
      ],
      createOneWayTripAction: jest.fn()
    };
    wrapper = setup(props);
  });
  it("should render without errors", () => {
    const component = wrapper;
    expect(component.length).toBe(1);
    expect(component.find("form").exists()).toBe(true);
  });
  it("Should render the input and test onChange function", () => {
    const component = wrapper;
    const departure = component.find("#departure-input");
    const destination = component.find("#destination-input");
    const tripReason = component.find("#trip-reason-input");
    const departureDate = component.find("#departure-date-input");

    expect(departure.exists()).toBe(true);
    expect(destination.exists()).toBe(true);
    expect(tripReason.exists()).toBe(true);
    expect(departureDate.exists()).toBe(true);

    simulateChangeOnInput(component, "#departure-input", "departure", "2");
    simulateChangeOnInput(component, "#destination-input", "destination", "1");
    simulateChangeOnInput(
      component,
      "#trip-reason-input",
      "tripReason",
      "Going home"
    );
    simulateChangeOnInput(
      component,
      "#departure-date-input",
      "departureDate",
      "2020-08-02"
    );
    const componentInstance = component.instance();
    const expectedState = {
      departure: "2",
      destination: "1",
      tripReason: "Going home",
      departureDate: "2020-08-02"
    };
    expect(componentInstance.state).toStrictEqual(expectedState);
  });

  it("Should Simulate The submit event and call the createOnewayTripAction ", () => {
    const createOneWayTripMock = jest.fn();
    const props = {
      createOneWayTripAction: createOneWayTripMock
    };
    const component = setup(props);
    simulateChangeOnInput(component, "#departure-input", "departure", "2");
    simulateChangeOnInput(component, "#destination-input", "destination", "1");
    simulateChangeOnInput(
      component,
      "#trip-reason-input",
      "tripReason",
      "Going home"
    );
    simulateChangeOnInput(
      component,
      "#departure-date-input",
      "departureDate",
      "2020-08-02"
    );
    const form = component.find("form");
    expect(form.exists()).toBe(true);
    form.simulate("submit", {
      preventDefault: () => {}
    });
    expect(createOneWayTripMock).toHaveBeenCalledTimes(1);
  });
  it("Should Simulate The submit event and do not call the createOnewayTripAction ", () => {
    const createOneWayTripMock = jest.fn();
    const props = {
      createOneWayTripAction: createOneWayTripMock,
      loading: true
    };
    const component = setup(props);
    const form = component.find("form");
    expect(form.exists()).toBe(true);
    form.simulate("submit", {
      preventDefault: () => {}
    });
    expect(createOneWayTripMock).toHaveBeenCalledTimes(0);
  });

  it("mapStateToProps Should return an object", () => {
    const expectedObject = {
      places: [
        {
          id: 1,
          name: "kigali branch",
          country: "Rwanda",
          city: "kigali city",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        },
        {
          id: 2,
          name: "new york branch",
          country: "USA",
          city: "new york",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        },
        {
          id: 3,
          name: "paris branch",
          country: "France",
          city: "paris",
          createdAt: "2020-06-18T14:28:30.001Z",
          updatedAt: "2020-06-18T14:28:30.001Z"
        }
      ],
      loading: false
    };
    const stateObject = {
      places: {
        places: [
          {
            id: 1,
            name: "kigali branch",
            country: "Rwanda",
            city: "kigali city",
            createdAt: "2020-06-18T14:28:30.001Z",
            updatedAt: "2020-06-18T14:28:30.001Z"
          },
          {
            id: 2,
            name: "new york branch",
            country: "USA",
            city: "new york",
            createdAt: "2020-06-18T14:28:30.001Z",
            updatedAt: "2020-06-18T14:28:30.001Z"
          },
          {
            id: 3,
            name: "paris branch",
            country: "France",
            city: "paris",
            createdAt: "2020-06-18T14:28:30.001Z",
            updatedAt: "2020-06-18T14:28:30.001Z"
          }
        ],
        loading: false
      },
      trips: {
        loading: false
      }
    };
    const returnedObject = mapStateToProps(stateObject);
    expect(returnedObject).toStrictEqual(expectedObject);
  });

  it("should test the mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).createOneWayTripAction();
    expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});
