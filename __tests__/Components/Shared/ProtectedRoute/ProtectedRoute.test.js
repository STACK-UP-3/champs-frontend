import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Redirect } from "react-router-dom";
import sinon from "sinon";
import { Provider } from "react-redux";
import store from "../../../../src/Redux/store";

import Home from "../../../../src/Components/Home/Home.jsx";
import SignInComponent from "../../../../src/Components/Auth/SignIn/SignIn.jsx";
import {
  ProtectedRoute,
  mapStateToProps
} from "../../../../src/Components/Shared/ProtectedRoute/ProtectedRoute.jsx";

const setup = value => {
  const mockStore = store;
  const wrapper = mount(
    <MemoryRouter initialEntries={["/home"]}>
      <Provider store={mockStore}>
        <ProtectedRoute isAuthenticated={value} component={Home} />
      </Provider>
    </MemoryRouter>
  );
  return { wrapper };
};

describe("ProtectedRoute test suite", () => {
  it("renders home component", () => {
    const { wrapper } = setup(true);
    expect(wrapper.find(SignInComponent)).toHaveLength(0);
    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it("renders redirect", () => {
    const { wrapper } = setup(false);
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("doesn't render as it have no props", () => {
    const stub = sinon.stub(console, "error");
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]}>
        <ProtectedRoute />
      </MemoryRouter>
    );
    expect(stub.calledOnce).toBe(true);
    expect(wrapper.find(Home)).toHaveLength(0);
    // eslint-disable-next-line no-console
    console.error.restore();
  });

  it("mapStateToProps Should return an object", () => {
    const expectedObject = {
      isAuthenticated: true
    };

    const stateObject = {
      login: { isAuthenticated: true }
    };

    const returnedObject = mapStateToProps(stateObject);
    expect(returnedObject).toStrictEqual(expectedObject);
  });
});
