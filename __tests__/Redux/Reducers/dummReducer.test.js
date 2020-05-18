import dummyReducer from "../../../src/Redux/Reducers/dummyReducer";
import dummyAction from "../../../src/Redux/Actions/dummyAction";

describe("Dummy reducer test suite", () => {
  it("should return the initial state", () => {
    const initialState = {
      isDummy: false
    };
    const newState = dummyReducer(initialState, {});
    expect(newState).toStrictEqual(initialState);
  });
  it("should return a new state with isDummy to true", () => {
    const newState = dummyReducer(undefined, dummyAction());
    expect(newState).toStrictEqual({
      isDummy: true
    });
  });
});
