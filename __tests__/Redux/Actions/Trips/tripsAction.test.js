/* eslint-disable no-unused-vars */
import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import {
  createOneWayTrip,
  getTrips
} from "../../../../src/Redux/Actions/Trips/tripAction";

describe("Trip actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Store is updated correctly with sucessfully created Trip", async () => {
    const expectedResponse = {
      status: 201,
      message: "Trip request has been successfully submitted.",
      data: {
        id: 43,
        userId: 89,
        tripType: "return",
        departure: {
          id: 28,
          name: "kigali branch",
          country: "Rwanda",
          city: "kigali city",
          createdAt: "2020-06-14T17:27:27.295Z",
          updatedAt: "2020-06-14T17:27:27.295Z"
        },
        destination: [
          [
            {
              id: 29,
              name: "new york branch",
              country: "USA",
              city: "new york",
              createdAt: "2020-06-14T17:27:27.295Z",
              updatedAt: "2020-06-14T17:27:27.295Z"
            }
          ]
        ],
        date: "2050-09-13T00:00:00.000Z",
        reasons: "hound issues",
        returnDate: "2050-10-30T00:00:00.000Z",
        status: "pending",
        updatedAt: "2020-06-14T17:29:47.868Z",
        createdAt: "2020-06-14T17:29:47.868Z"
      }
    };
    const tripData = {
      departure: 28,
      destination: [29],
      date: "2050-09-13",
      returnDate: "2050-10-30",
      reasons: "hound issues"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedResponse
      });
    });
    await store.dispatch(createOneWayTrip(tripData));
    const newState = store.getState();
    expect(newState.trips.createdTrips[0]).toBe(expectedResponse.data);
  });

  it("Store is updated correctly with an error", async () => {
    const expectedResponse = {
      message: "Reasons are not allowed to be empty"
    };
    const tripData = {
      departure: 28,
      destination: [29],
      date: "2050-09-13",
      returnDate: "2050-10-30",
      reasons: ""
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(createOneWayTrip(tripData));
    const newState = store.getState();
    expect(newState.trips.error).toBe(expectedResponse.message);
  });

  it("Store is updated correctly with an error when response have the message property", async () => {
    const tripData = {
      departure: 28,
      destination: [29],
      date: "2050-09-13",
      returnDate: "2050-10-30",
      reasons: ""
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        error: ""
      });
    });
    await store.dispatch(createOneWayTrip(tripData));
    const newState = store.getState();
    expect(newState.trips.error).toBe(
      "Cannot read property 'data' of undefined"
    );
  });

  it("Store is updated correctly with a list of all trips", async () => {
    const expectedResponse = {
      results: [
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
      ]
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: expectedResponse
        }
      });
    });
    await store.dispatch(getTrips());
    const newState = store.getState();
    expect(newState.trips.allTrips).toBe(expectedResponse.results);
  });

  it("Store is updated correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      message: "JWT expired"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(getTrips());
    const newState = store.getState();
    expect(newState.trips.error).toBe(expectedResponse.message);
    expect(newState.trips.allTrips).toStrictEqual([]);
  });

  it("Store is updated correctly with an error when response have the error property", async () => {
    const expectedResponse = {
      error: "No trips found"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(getTrips());
    const newState = store.getState();
    expect(newState.trips.error).toBe(expectedResponse.error);
    expect(newState.trips.allTrips).toStrictEqual([]);
  });

  it("Store is updated correctly with an error when we don't have response property", async () => {
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(getTrips());
    const newState = store.getState();
    expect(newState.trips.allTrips).toStrictEqual([]);
  });
});
