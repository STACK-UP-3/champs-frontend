import React from "react";
import { shallow } from "enzyme";

import {
  SignUp,
  mapDispatchToProps,
  mapStateToProps
} from "../../../../src/Components/Auth/SignUp/SignUp";

const setup = props => {
  const { signUpAction, history, status, loading } = props;
  const wrapper = shallow(
    <SignUp
      signUpAction={signUpAction}
      history={history}
      status={status}
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

describe("Sign up test suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const signUpMock = jest.fn();
      const props = {
        signUpAction: signUpMock
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
      expect(component.find("#auth-firstname").exists()).toBe(true);
      expect(component.find("#auth-lastname").exists()).toBe(true);
      expect(component.find("#auth-username").exists()).toBe(true);
      expect(component.find("#auth-email").exists()).toBe(true);
      expect(component.find("#auth-password").exists()).toBe(true);
    });

    it("should simulate a change on inputBoxes", () => {
      const component = wrapper;

      const updatedFirstname = simulateChangeOnInput(
        component,
        "#auth-firstname",
        "firstname",
        "Aggy"
      );
      expect(updatedFirstname.props().value).toBe("Aggy");

      const updatedLastname = simulateChangeOnInput(
        component,
        "#auth-lastname",
        "lasstname",
        ""
      );
      expect(updatedLastname.props().value).toBe("");

      const updatedUsername = simulateChangeOnInput(
        component,
        "#auth-username",
        "username",
        "Ann"
      );
      expect(updatedUsername.props().value).toBe("Ann");

      const updatedEmail = simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "aggy@gmail.com"
      );
      expect(updatedEmail.props().value).toBe("aggy@gmail.com");

      const updatedPassword = simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "ann12345"
      );
      expect(updatedPassword.props().value).toBe("ann12345");
    });

    it("should test the state of the app after onChange event", () => {
      const component = wrapper;
      const componentInstance = component.instance();

      const updatedFirstname = simulateChangeOnInput(
        component,
        "#auth-firstname",
        "firstname",
        "Aggy"
      );

      const updatedLastname = simulateChangeOnInput(
        component,
        "#auth-lastname",
        "lasstname",
        "Ann"
      );

      const updatedUsername = simulateChangeOnInput(
        component,
        "#auth-username",
        "username",
        "Ann"
      );

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

      expect(componentInstance.state.firstname).toEqual(
        updatedFirstname.props().value
      );
      expect(componentInstance.state.lastname).toEqual(
        updatedLastname.props().value
      );
      expect(componentInstance.state.username).toEqual(
        updatedUsername.props().value
      );
      expect(componentInstance.state.email).toEqual(updatedEmail.props().value);
      expect(componentInstance.state.password).toEqual(
        updatedPassword.props().value
      );
    });

    it("should simulate submit event", () => {
      const signUpMock = jest.fn();
      const props = {
        signUpAction: signUpMock,
        loading: true
      };
      const component = setup(props);

      simulateChangeOnInput(component, "#auth-firstname", "firstname", "Aggy");
      simulateChangeOnInput(component, "#auth-lastname", "lastname", "Ann");
      simulateChangeOnInput(component, "#auth-username", "username", "Ann");

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );

      simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "ann12345"
      );
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(signUpMock).toHaveBeenCalledTimes(1);
    });

    it("should redirect to Home component", () => {
      const history = {
        push: jest.fn()
      };
      jest.useFakeTimers();
      const props = {
        status: 400,
        signUpAction: jest.fn(),
        history
      };

      const component = setup(props);

      simulateChangeOnInput(component, "#auth-firstname", "firstname", "Aggy");
      simulateChangeOnInput(component, "#auth-lastname", "lastname", "Ann");
      simulateChangeOnInput(component, "#auth-username", "username", "Ann");

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "aggy@gmail.com"
      );

      simulateChangeOnInput(
        component,
        "#auth-password",
        "password",
        "ann12345"
      );
      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(component.instance().props.status).toBe(400);
      expect(component.instance().props.history).toBe(history);
      component.setProps({ status: 201 });
      jest.advanceTimersByTime(500);
      expect(history.push).toHaveBeenCalledTimes(1);
    });

    it("should test the mapDispatchToProps", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).signUpAction();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });

    test("mapStateToProps Should return an object", () => {
      const expectedObject = {
        status: 400,
        loading: false
      };
      const stateObject = {
        signUp: {
          status: 400,
          loading: false
        }
      };
      const returnedObject = mapStateToProps(stateObject);
      expect(returnedObject).toStrictEqual(expectedObject);
    });
  });
});
