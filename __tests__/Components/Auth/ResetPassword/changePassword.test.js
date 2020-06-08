import React from "react";
import { shallow } from "enzyme";

import {
  UpdatePassword,
  mapDispatchToProps,
  mapStateToProps
} from "../../../../src/Components/Auth/ForgetPassword/ChangePassword/ChangePassword";

const setup = props => {
  const { passwordResetAction, isPasswordUpdated, history, loading } = props;

  let historyMock;
  if (history) {
    historyMock = history;
  } else {
    historyMock = {
      push: jest.fn(),
      replace: jest.fn()
    };
  }

  const wrapper = shallow(
    <UpdatePassword
      passwordResetAction={passwordResetAction}
      isPasswordUpdated={isPasswordUpdated}
      history={historyMock}
      loading={loading}
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

describe("Password Reset Test Suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const passwordMock = jest.fn();
      const props = {
        passwordResetAction: passwordMock
      };
      wrapper = setup(props);
    });

    it("should render without errors", () => {
      const component = wrapper;
      expect(component.length).toBe(1);
    });

    it("should have inputbox and button tag", () => {
      const component = wrapper;
      expect(component.find("input").exists()).toBe(true);
      expect(component.find("#auth-password").exists()).toBe(true);
      expect(component.find("#auth-passwordConfirm").exists()).toBe(true);
    });

    it("should simulate a change on inputBox", () => {
      const component = wrapper;
      const updatedPassword = simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "1234567"
      );
      expect(updatedPassword.props().value).toBe("1234567");

      const updatedPasswordConfirm = simulateChangeOnInput(
        component,
        "#auth-passwordConfirm",
        "passwordConfirm",
        "1234567"
      );
      expect(updatedPasswordConfirm.props().value).toBe("1234567");
    });

    it("should test the state of the app after onChange event", () => {
      const component = wrapper;
      const componentInstance = component.instance();

      const updatedPassword = simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "QWE1234"
      );

      const updatedPasswordConfirm = simulateChangeOnInput(
        component,
        "#auth-passwordConfirm",
        "passwordConfirm",
        "QWE1234"
      );
      expect(componentInstance.state.password).toEqual(
        updatedPassword.props().value
      );
      expect(componentInstance.state.passwordConfirm).toEqual(
        updatedPasswordConfirm.props().value
      );
    });

    it("should simulate submit event", () => {
      const passwordMock = jest.fn();
      const props = {
        passwordResetAction: passwordMock,
        loading: true
      };
      const component = setup(props);
      simulateChangeOnInput(component, "#auth-password", "password", "1234567");
      simulateChangeOnInput(
        component,
        "#auth-passwordConfirm",
        "passwordConfirm",
        "1234567"
      );
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(passwordMock).toHaveBeenCalledTimes(1);
    });

    it("should redirect to signin component", () => {
      const history = {
        push: jest.fn()
      };
      jest.useFakeTimers();
      const props = {
        status: 400,
        passwordResetAction: jest.fn(),
        history
      };

      const component = setup(props);
      simulateChangeOnInput(component, "#auth-password", "password", "1234567");
      simulateChangeOnInput(
        component,
        "#auth-passwordConfirm",
        "passwordConfirm",
        "1234567"
      );
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(component.instance().props.status).toBe(0);
      expect(component.instance().props.history).toBe(history);
      component.setProps({ status: 200 });
      jest.advanceTimersByTime(500);
      expect(history.push).toHaveBeenCalledTimes(1);
    });

    it("should test the mapDispatchToProps", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).passwordResetAction();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });

    it("should return an object", () => {
      const expectedObject = {
        status: 400,
        loading: false
      };
      const stateObject = {
        passwordUpdate: {
          status: 400,
          loading: false
        }
      };
      const returnedObject = mapStateToProps(stateObject);
      expect(returnedObject).toStrictEqual(expectedObject);
    });
  });
});
