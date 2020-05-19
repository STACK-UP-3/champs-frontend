import React from "react";
import { shallow } from "enzyme";
import EmailVerificationResponse from "../../../../src/Components/Shared/EmailVerificationResponse/EmailVerificationResponse";

describe("<EmailVerificationResponse />", () => {
  it("it renders email response component", () => {
    const emailResponse = shallow(<EmailVerificationResponse />);
    expect(emailResponse.find("h3").length).toEqual(1);
    expect(emailResponse.find("p").length).toEqual(1);
  });
});
