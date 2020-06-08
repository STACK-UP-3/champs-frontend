import updatePasswordReducer from "../../../../src/Redux/Reducers/ResetPassword/updatePasswordReducer";
import {
  passwordResetRequest,
  passwordResetSuccess,
  passwordResetFail
} from "../../../../src/Redux/Actions/PasswordReset/passwordResetAction";

describe("Password Reset Reducer Test Suite", () => {
  it("should return a default state", () => {
    const newState = updatePasswordReducer(undefined, {});
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: ""
    });
  });

  it("should return a new state with isPasswordUpdated equal to true", () => {
    const newState = updatePasswordReducer(undefined, passwordResetRequest());
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
    const newState = updatePasswordReducer(
      undefined,
      passwordResetSuccess(payload)
    );
    expect(newState).toStrictEqual({
      loading: false,
      message: "Reset link has been successfully",
      status: 201,
      error: ""
    });
  });

  it("should return a new state with error message", () => {
    const payload = "Error in finding everything";
    const newState = updatePasswordReducer(
      undefined,
      passwordResetFail(payload)
    );
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: "Error in finding everything"
    });
  });
});
