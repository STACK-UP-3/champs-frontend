import tripReducer from "../../../../src/Redux/Reducers/Trips/tripReducer";
import {
  createTripRequest,
  createTripSuccess,
  createTripFail
} from "../../../../src/Redux/Actions/Trips/tripAction";

describe("tripReducer test suite", () => {
  it("should return a default state", () => {
    const newState = tripReducer(undefined, {});
    expect(newState).toStrictEqual({
      allTrips: [],
      loading: false,
      createdTrips: [],
      error: ""
    });
  });

  it("should return a new state with loading equal to true", () => {
    const newState = tripReducer(undefined, createTripRequest());
    expect(newState).toStrictEqual({
      allTrips: [],
      createdTrips: [],
      loading: true,
      error: ""
    });
  });
  it("should return a new state with a response", () => {
    const payload = {
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
    const newState = tripReducer(undefined, createTripSuccess(payload));
    expect(newState).toStrictEqual({
      allTrips: [],
      loading: false,
      createdTrips: [payload.data],
      error: ""
    });
  });

  it("should return a new state with error message", () => {
    const payload = "Error in finding everything";
    const newState = tripReducer(undefined, createTripFail(payload));
    expect(newState).toStrictEqual({
      allTrips: [],
      loading: false,
      createdTrips: [],
      error: "Error in finding everything"
    });
  });
});
