import tokenVerify from "../../src/Utils/tokenVerify";

describe(" TokenVerify test suite", () => {
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
