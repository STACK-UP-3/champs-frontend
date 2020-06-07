import tokenVerify, { getTokenFromParams } from "../../src/Utils/tokenVerify";

describe("Local Sign In Token VerificationToken Verification Tests", () => {
  describe("Local Sign In Token Verification", () => {
    it("should return false if no or wrong token is passed", () => {
      const returned = tokenVerify();
      expect(returned).toBe(false);
    });
    it("should return false when provided token is expired", () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZ2d5cmVpbmFAZ21haWwuY29tIiwiaWF0IjoxNTg2NDI1OTg3LCJleHAiOjE1ODY0MzMxODd9.xCmrCgWKewE1HhM5EsogAGdh6Nvjqyo0sFBhjKznGJs";
      const returned = tokenVerify(token);
      expect(returned).toBe(false);
    });
    it("should return true when provided token is correct and not expired", () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJicmlhbi5pbmV6YUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MTQ0ODh9.hQyEoAzddqte4Tr6nhM5ufkXA7-PoNXw59YV8QVjHvs";
      const returned = tokenVerify(token);
      expect(returned).toBe(true);
    });
  });

  describe("Social Auth Token Verification", () => {
    it("should not return token if parameters are invalid or undefined", () => {
      window.location.search = undefined;
      const token = getTokenFromParams();
      expect(token).toBe(null);
    });

    it("should return token if parameters are valid", () => {
      const token = getTokenFromParams(
        "?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJicmlhbi5pbmV6YUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MTQ0ODh9.hQyEoAzddqte4Tr6nhM5ufkXA7-PoNXw59YV8QVjHvs"
      );
      expect(token).toBe(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJicmlhbi5pbmV6YUBnbWFpbC5jb20iLCJpYXQiOjE1ODY1MTQ0ODh9.hQyEoAzddqte4Tr6nhM5ufkXA7-PoNXw59YV8QVjHvs"
      );
    });
  });
});
