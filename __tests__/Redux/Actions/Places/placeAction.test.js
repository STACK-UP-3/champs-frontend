import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import { getPlaces } from "../../../../src/Redux/Actions/Places/placeAction";

describe("placesAction action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Store is updated correctly with a list of places", async () => {
    const expectedResponse = {
      results: [
        {
          id: 28,
          name: "kigali branch",
          country: "Rwanda",
          city: "kigali city",
          createdAt: "2020-06-14T17:27:27.295Z",
          updatedAt: "2020-06-14T17:27:27.295Z"
        },
        {
          id: 29,
          name: "new york branch",
          country: "USA",
          city: "new york",
          createdAt: "2020-06-14T17:27:27.295Z",
          updatedAt: "2020-06-14T17:27:27.295Z"
        },
        {
          id: 30,
          name: "paris branch",
          country: "France",
          city: "paris",
          createdAt: "2020-06-14T17:27:27.295Z",
          updatedAt: "2020-06-14T17:27:27.295Z"
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
    await store.dispatch(getPlaces());
    const newState = store.getState();
    expect(newState.places.places).toBe(expectedResponse.results);
  });

  it("Store is updated correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      message: "Invalid token"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(getPlaces());
    const newState = store.getState();
    expect(newState.places.error).toBe(expectedResponse.message);
    expect(newState.places.places).toStrictEqual([]);
  });

  it("Store is updated correctly with an error when response have the error property", async () => {
    const expectedResponse = {
      error: "email must be a valid email"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(getPlaces());
    const newState = store.getState();
    expect(newState.places.error).toBe(expectedResponse.error);
    expect(newState.places.places).toStrictEqual([]);
  });

  it("Store is updated correctly with an error when we don't have response property", async () => {
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(getPlaces());
    const newState = store.getState();
    expect(newState.places.places).toStrictEqual([]);
  });
});
