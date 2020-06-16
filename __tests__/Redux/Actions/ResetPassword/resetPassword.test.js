import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import { passwordUpdate } from "../../../../src/Redux/Actions/PasswordReset/passwordResetAction";

describe("Password Reset Action Test Suite", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should update store correctly with sucessfully send reset link", async () => {
    const expectedResponse = {
      password: "12345678"
    };
    const formData = {
      password: "123456",
      confirmPassword: "12345609"
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
    await store.dispatch(passwordUpdate(formData));
    const newState = store.getState();
    expect(newState.passwordUpdate.status).toBe(expectedResponse.status);
  });

  it(" should update store correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      message: "password mismatch"
    };
    const formData = {
      password: "123456",
      confirmPassword: "12345609"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(passwordUpdate(formData));
    const newState = store.getState();
    expect(newState.passwordUpdate.error).toBe(expectedResponse.message);
    expect(newState.passwordUpdate.message).toBe("");
  });

  it("should update store correctly with an error when response have the error property", async () => {
    const expectedResponse = {
      error: "password must be at least 3 characters"
    };
    const formData = {
      password: "12345",
      confirmPassword: "123458"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(passwordUpdate(formData));
    const newState = store.getState();
    expect(newState.passwordUpdate.error).toBe(expectedResponse.error);
    expect(newState.passwordUpdate.message).toBe("");
  });

  it("should update store with an error when we don't have response property", async () => {
    const formData = {
      password: "1234567",
      confirmPassword: "1234567"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(passwordUpdate(formData));
    const newState = store.getState();
    expect(newState.passwordUpdate.message).toBe("");
  });
});
