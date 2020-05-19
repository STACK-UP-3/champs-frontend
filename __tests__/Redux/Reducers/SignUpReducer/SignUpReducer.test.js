import signUpReducer from "../../../../src/Redux/Reducers/SignUp/signUpReducer";
import {
  signUpRequest,
  signUpSuccess,
  signUpFail
} from "../../../../src/Redux/Actions/SignUp/signUpAction";

describe("signUpReducer test suite", () => {
  it("should return a default state", () => {
    const newState = signUpReducer(undefined, {});
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: ""
    });
  });

  it("should return a new state with loading equal to true", () => {
    const newState = signUpReducer(undefined, signUpRequest());
    expect(newState).toStrictEqual({
      loading: true,
      message: "",
      status: 0,
      error: ""
    });
  });
  it("should return a new state with a response", () => {
    const payload = {
      message: "Account created successfully",
      status: 201
    };
    const newState = signUpReducer(undefined, signUpSuccess(payload));
    expect(newState).toStrictEqual({
      loading: false,
      message: "Account created successfully",
      status: 201,
      error: ""
    });
  });

  it("should return a new state with error message", () => {
    const payload = "Error in finding everything";
    const newState = signUpReducer(undefined, signUpFail(payload));
    expect(newState).toStrictEqual({
      loading: false,
      message: "",
      status: 0,
      error: "Error in finding everything"
    });
  });
});
