import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import Trip from "../../../src/Components/Shared/TripContainer/TripContainer.jsx";
import {
  LatestTrips,
  mapStateToProps,
  mapDispatchToProps
} from "../../../src/Components/LatestTrips/LatestTrips.jsx";

const setup = props => shallow(<LatestTrips {...props} />);

describe("LatestTrips test suite", () => {
  const props = {
    allTrips: [
      {
        id: 8,
        userId: 8,
        tripType: "one-way",
        destination: [3],
        date: "2020-06-24T00:00:00.000Z",
        returnDate: null,
        reasons: "Fixing the branch's internet",
        status: "pending",
        createdAt: "2020-06-18T20:10:33.128Z",
        updatedAt: "2020-06-18T20:10:33.128Z",
        User: {
          id: 8,
          lineManager: 1,
          firstname: "chris",
          lastname: "meme",
          email: "chrischris@example.com",
          role: "Requester"
        },
        Departure: {
          id: 1,
          name: "kigali branch",
          country: "Rwanda",
          city: "kigali city"
        }
      },
      {
        id: 7,
        userId: 8,
        tripType: "one-way",
        destination: [1],
        date: "2020-07-12T00:00:00.000Z",
        returnDate: null,
        reasons: "Being a manager of new trip",
        status: "pending",
        createdAt: "2020-06-18T20:06:54.409Z",
        updatedAt: "2020-06-18T20:06:54.409Z",
        User: {
          id: 8,
          lineManager: 1,
          firstname: "chris",
          lastname: "meme",
          email: "chrischris@example.com",
          role: "Requester"
        },
        Departure: {
          id: 2,
          name: "new york branch",
          country: "USA",
          city: "new york"
        }
      },
      {
        id: 6,
        userId: 8,
        tripType: "one-way",
        destination: [],
        date: "2020-06-27T00:00:00.000Z",
        returnDate: null,
        reasons: "Moving from one branch",
        status: "pending",
        createdAt: "2020-06-18T15:05:36.068Z",
        updatedAt: "2020-06-18T15:05:36.068Z",
        User: {
          id: 8,
          lineManager: 1,
          firstname: "chris",
          lastname: "meme",
          email: "chrischris@example.com",
          role: "Requester"
        },
        Departure: {
          id: 2,
          name: "new york branch",
          country: "USA",
          city: "new york"
        }
      },
      {
        id: 5,
        userId: 8,
        tripType: "one-way",
        destination: [1],
        date: "2020-06-28T00:00:00.000Z",
        returnDate: null,
        reasons: "Testing the Functionality of a new branch",
        status: "pending",
        createdAt: "2020-06-18T14:33:59.496Z",
        updatedAt: "2020-06-18T14:33:59.496Z",
        User: {
          id: 8,
          lineManager: 1,
          firstname: "chris",
          lastname: "meme",
          email: "chrischris@example.com",
          role: "Requester"
        },
        Departure: {
          id: 2,
          name: "new york branch",
          country: "USA",
          city: "new york"
        }
      }
    ],
    allPlaces: [
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
    getAllTrips: () => {},
    getPlacesAction: () => {}
  };
  let getPlaces;
  let getAllTrips;

  afterEach(() => {
    getAllTrips.reset();
    getPlaces.reset();
  });

  it("Should shallow The test component did shallow and all actions", () => {
    getAllTrips = sinon.stub(props, "getAllTrips");
    getPlaces = sinon.stub(props, "getPlacesAction");
    setup(props);
    expect(getAllTrips.calledOnce).toBe(true);
    expect(getPlaces.calledOnce).toBe(true);
  });

  it("Should return null as there are no current trips", () => {
    const component = setup({ ...props, allTrips: [] });
    expect(component.find("div").exists()).toBe(false);
    expect(component.find(Trip).exists()).toBe(false);
  });
  it("Should render all trips without modifying them", () => {
    const component = setup({
      ...props,
      allTrips: [
        {
          id: 8,
          userId: 8,
          tripType: "one-way",
          destination: [3],
          date: "2020-06-24T00:00:00.000Z",
          returnDate: null,
          reasons: "Fixing the branch's internet",
          status: "pending",
          createdAt: "2020-06-18T20:10:33.128Z",
          updatedAt: "2020-06-18T20:10:33.128Z",
          User: {
            id: 8,
            lineManager: 1,
            firstname: "chris",
            lastname: "meme",
            email: "chrischris@example.com",
            role: "Requester"
          },
          Departure: {
            id: 1,
            name: "kigali branch",
            country: "Rwanda",
            city: "kigali city"
          }
        },
        {
          id: 7,
          userId: 8,
          tripType: "one-way",
          destination: [1],
          date: "2020-07-12T00:00:00.000Z",
          returnDate: null,
          reasons: "Being a manager of new trip",
          status: "pending",
          createdAt: "2020-06-18T20:06:54.409Z",
          updatedAt: "2020-06-18T20:06:54.409Z",
          User: {
            id: 8,
            lineManager: 1,
            firstname: "chris",
            lastname: "meme",
            email: "chrischris@example.com",
            role: "Requester"
          },
          Departure: {
            id: 2,
            name: "new york branch",
            country: "USA",
            city: "new york"
          }
        }
      ]
    });
    expect(component.find(Trip).exists()).toBe(true);
  });
  it("should render without errors", () => {
    const component = setup(props);
    expect(component.find("div").exists()).toBe(true);
    expect(component.find(Trip).exists()).toBe(true);
  });

  it("mapStateToProps Should return an object", () => {
    const expectedObject = {
      allPlaces: props.allPlaces,
      allTrips: props.allTrips
    };
    const stateObject = {
      places: {
        places: props.allPlaces
      },
      trips: {
        allTrips: props.allTrips
      }
    };
    const returnedObject = mapStateToProps(stateObject);
    expect(returnedObject).toStrictEqual(expectedObject);
  });

  it("should test the mapDispatchToProps", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getPlacesAction();
    mapDispatchToProps(dispatch).getAllTrips();
    expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    expect(dispatch.mock.calls[1][0]).toBeInstanceOf(Function);
  });
});
