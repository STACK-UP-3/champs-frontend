import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import { login } from "../../../../src/Redux/Actions/Login/loginAction";

describe("login action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly with sucessfully signed in user", async () => {
    const expectedResponse = {
      token: "I am a token",
      user: {
        id: "1",
        email: "chris@email.com",
        names: "chris test",
        avatar: "link to avatar",
        oauthid: ""
      }
    };
    const formData = {
      email: "chris@email.com",
      password: "12345"
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
    await store.dispatch(login(formData));
    const newState = store.getState();
    expect(newState.login.user).toBe(expectedResponse.user);
    expect(newState.login.token).toBe(expectedResponse.token);
  });

  test("Store is updated correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      message: "Incorect email or password"
    };
    const formData = {
      email: "chrisdummy@email.com",
      password: "1234554"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(login(formData));
    const newState = store.getState();
    expect(newState.login.error).toBe(expectedResponse.message);
    expect(newState.login.token).toBe("");
    expect(newState.login.user).toStrictEqual({});
  });

  test("Store is updated correctly with an error when response have the error property", async () => {
    const expectedResponse = {
      error: "email must be a valid email"
    };
    const formData = {
      email: "chrisdummy@email.com",
      password: "1234554"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(login(formData));
    const newState = store.getState();
    expect(newState.login.error).toBe(expectedResponse.error);
    expect(newState.login.token).toBe("");
    expect(newState.login.user).toStrictEqual({});
  });

  test("Store is updated correctly with an error when we don't have response property", async () => {
    const formData = {
      email: "chrisdummy@email.com",
      password: "1234554"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(login(formData));
    const newState = store.getState();
    expect(newState.login.token).toBe("");
    expect(newState.login.user).toStrictEqual({});
  });
});
