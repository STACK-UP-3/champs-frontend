import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import { signUp } from "../../../../src/Redux/Actions/SignUp/signUpAction";

describe("Signup action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly with sucessfully created account", async () => {
    const expectedResponse = {
      formData: {
        firstname: "Aggy",
        lastname: "Ann",
        username: "Ann1",
        email: "Ann@email.com",
        password: "123456789"
      }
    };
    const formData = {
      firstname: "Aggy",
      lastname: "Ann",
      username: "Ann1",
      email: "Ann@email.com",
      password: "123456789"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: expectedResponse
        }
      });
    });
    await store.dispatch(signUp(formData));
    const newState = store.getState();
    expect(newState.signUp.status).toBe(expectedResponse.status);
  });

  test("Store is updated correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      error: ""
    };
    const formData = {
      firstname: "Aggy",
      lastname: "Ann",
      username: "Ann1",
      email: "Ann1@email.com",
      password: "123456789"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(signUp(formData));
    const newState = store.getState();
    expect(newState.signUp.error).toBe(expectedResponse.error);
  });

  test("Store is updated correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      error: ""
    };
    const formData = {
      firstname: "Aggy",
      lastname: "Ann",
      username: "Ann1",
      email: "Ann1@email.com",
      password: "123456789"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(signUp(formData));
    const newState = store.getState();
    expect(newState.signUp.error).toBe(expectedResponse.error);
  });

  test("Store is updated correctly with an error when we don't have response property", async () => {
    const formData = {
      firstname: "Aggy",
      lastname: "Ann",
      username: "Ann1",
      email: "Ann1@email.com",
      password: "123456789"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(signUp(formData));
    const newState = store.getState();
    expect(newState.signUp.status).toStrictEqual(0);
    expect(newState.signUp.message).toBe("");
  });
});
