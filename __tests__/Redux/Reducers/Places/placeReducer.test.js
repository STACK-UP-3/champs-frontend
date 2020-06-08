import placesReducer from "../../../../src/Redux/Reducers/Places/PlaceReducer";
import {
  getPlacesRequest,
  getPlacesSuccess,
  getPlacesFail
} from "../../../../src/Redux/Actions/Places/placeAction";

describe("placesReducer test suite", () => {
  it("should return a default state", () => {
    const newState = placesReducer(undefined, {});
    expect(newState).toStrictEqual({
      places: [],
      loading: false,
      error: ""
    });
  });

  it("should return a new state with loading equal to true", () => {
    const newState = placesReducer(undefined, getPlacesRequest());
    expect(newState).toStrictEqual({
      places: [],
      loading: true,
      error: ""
    });
  });
  it("should return a new state with a response", () => {
    const payload = [
      {
        id: 25,
        name: "kigali branch",
        country: "Rwanda",
        city: "kigali city",
        createdAt: "2020-06-14T16:16:35.470Z",
        updatedAt: "2020-06-14T16:16:35.470Z"
      },
      {
        id: 26,
        name: "new york branch",
        country: "USA",
        city: "new york",
        createdAt: "2020-06-14T16:16:35.470Z",
        updatedAt: "2020-06-14T16:16:35.470Z"
      },
      {
        id: 27,
        name: "paris branch",
        country: "France",
        city: "paris",
        createdAt: "2020-06-14T16:16:35.470Z",
        updatedAt: "2020-06-14T16:16:35.470Z"
      }
    ];
    const newState = placesReducer(undefined, getPlacesSuccess(payload));
    expect(newState).toStrictEqual({
      loading: false,
      places: payload,
      error: ""
    });
  });

  it("should return a new state with error message", () => {
    const payload = "Error in finding everything";
    const newState = placesReducer(undefined, getPlacesFail(payload));
    expect(newState).toStrictEqual({
      loading: false,
      places: [],
      error: "Error in finding everything"
    });
  });
});
