import moxios from "moxios";
import testStore from "../../../../src/Redux/store";
import { resetLink } from "../../../../src/Redux/Actions/PasswordReset/sendLinkAction";

describe("Send Password Reset Link Action Test Suite", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should update store with sucessfully password updated.", async () => {
    const expectedResponse = {
      email: "Ann@email.com"
    };
    const formData = {
      email: "Ann@email.com"
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
    await store.dispatch(resetLink(formData));
    const newState = store.getState();
    expect(newState.resetLink.status).toBe(expectedResponse.status);
  });

  it("should update store correctly with an error when response have the message property", async () => {
    const expectedResponse = {
      message: "email is not exit in our system"
    };
    const formData = {
      email: "Ann@email.com"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(resetLink(formData));
    const newState = store.getState();
    expect(newState.resetLink.error).toBe(expectedResponse.message);
    expect(newState.resetLink.message).toBe("");
  });

  it("should update store correctly with an error when response have the error property", async () => {
    const expectedResponse = {
      error: "email not verified"
    };
    const formData = {
      email: "Ann@email.com"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: expectedResponse
      });
    });
    await store.dispatch(resetLink(formData));
    const newState = store.getState();
    expect(newState.resetLink.error).toBe(expectedResponse.error);
    expect(newState.resetLink.message).toBe("");
  });

  it("should update store correctly with an error when we don't have response property", async () => {
    const formData = {
      email: "Ann@email.com"
    };
    const store = testStore;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        error: "Network Error"
      });
    });
    await store.dispatch(resetLink(formData));
    const newState = store.getState();
    expect(newState.resetLink.message).toBe("");
  });
});
