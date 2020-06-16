import sendLinkReducer from "../../../../src/Redux/Reducers/ResetPassword/sendLinkReducer";
import {
  resetLinkRequest,
  resetLinktSuccess,
  resetLinkFail
} from "../../../../src/Redux/Actions/PasswordReset/sendLinkAction";

describe("Send Password Reset Link Reducer Test Suite", () => {
  it("should return a default state", () => {
    const newState = sendLinkReducer(undefined, {});
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: ""
    });
  });

  it("should return a new state with loading equal to true", () => {
    const newState = sendLinkReducer(undefined, resetLinkRequest());
    expect(newState).toStrictEqual({
      loading: true,
      message: "",
      status: 0,
      error: ""
    });
  });
  it("should return a new state with a response", () => {
    const payload = {
      message: "Reset link has been successfully",
      status: 201
    };
    const newState = sendLinkReducer(undefined, resetLinktSuccess(payload));
    expect(newState).toStrictEqual({
      loading: false,
      message: "Reset link has been successfully",
      status: 201,
      error: ""
    });
  });

  it("should return a new state with error message", () => {
    const payload = "Error in finding everything";
    const newState = sendLinkReducer(undefined, resetLinkFail(payload));
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: "Error in finding everything"
    });
  });
});
