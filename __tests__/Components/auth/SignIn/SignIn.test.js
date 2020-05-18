import React from "react";
import { shallow } from "enzyme";

import {
  SignIn,
  mapDispatchToProps,
  mapStateToProps
} from "../../../../src/Components/Auth/SignIn/SignIn";

const setup = props => {
  const { loginAction, historyMock, isAuthenticated, location } = props;
  let history;
  if (historyMock) {
    history = historyMock;
  } else {
    history = {
      push: jest.fn(),
      replace: jest.fn()
    };
  }

  const wrapper = shallow(
    <SignIn
      loginAction={loginAction}
      history={history}
      isAuthenticated={isAuthenticated}
      location={location}
    />
  );
  return wrapper;
};

const simulateChangeOnInput = (
  component,
  inputSelector,
  inputName,
  newValue
) => {
  const input = component.find(inputSelector);
  input.simulate("change", {
    target: {
      name: inputName,
      value: newValue
    }
  });
  return component.find(inputSelector);
};

describe("Sign in test suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const loginMock = jest.fn();
      const props = {
        loginAction: loginMock,
        location: {
          state: {
            from: { pathname: "/home" }
          }
        }
      };
      wrapper = setup(props);
    });

    it("should render without errors", () => {
      const component = wrapper;
      expect(component.length).toBe(1);
    });

    it("Should have a inputbox and buttons tags", () => {
      const component = wrapper;
      expect(component.find("input").exists()).toBe(true);
      expect(component.find("#auth-email").exists()).toBe(true);
      expect(component.find("#auth-password").exists()).toBe(true);
    });

    it("should simulate a change on inputBoxes", () => {
      const component = wrapper;
      const updatedEmail = simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );
      expect(updatedEmail.props().value).toBe("kalisa@gmail.com");
      const updatedPassword = simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "QWE1234"
      );
      expect(updatedPassword.props().value).toBe("QWE1234");
    });

    it("should test the state of the app after onChange event", () => {
      const component = wrapper;
      const componentInstance = component.instance();
      const updatedEmail = simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );
      const updatedPassword = simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "QWE1234"
      );
      expect(componentInstance.state.email).toEqual(updatedEmail.props().value);
      expect(componentInstance.state.password).toEqual(
        updatedPassword.props().value
      );
    });

    it("should simulate submit event", () => {
      const loginMock = jest.fn();
      const props = {
        loginAction: loginMock,
        loading: true
      };
      const component = setup(props);

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );

      simulateChangeOnInput(component, "#auth-password", "password", "QWE1234");
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(loginMock).toHaveBeenCalledTimes(1);
    });

    it("should redirect to Home component", () => {
      const historyMock = {
        push: jest.fn(),
        replace: jest.fn()
      };
      jest.useFakeTimers();
      const props = {
        isAuthenticated: false,
        loginAction: jest.fn(),
        historyMock
      };

      const component = setup(props);

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );

      simulateChangeOnInput(component, "#auth-password", "password", "QWE1234");
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(component.instance().props.isAuthenticated).toBe(false);
      expect(component.instance().props.history).toBe(historyMock);
      component.setProps({ isAuthenticated: true });
      jest.advanceTimersByTime(500);
      expect(historyMock.push).toHaveBeenCalledTimes(1);
    });

    it("should test the mapDispatchToProps", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).loginAction();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });

    test("mapStateToProps Should return an object", () => {
      const expectedObject = {
        isAuthenticated: false,
        loading: false
      };
      const stateObject = {
        login: {
          isAuthenticated: false,
          loading: false
        }
      };
      const returnedObject = mapStateToProps(stateObject);
      expect(returnedObject).toStrictEqual(expectedObject);
    });
  });
});
