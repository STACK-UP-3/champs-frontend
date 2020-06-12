import jwtDecode from "jwt-decode";
import queryString from "query-string";

const verifyToken = token => {
  let jsonPayload;
  try {
    jsonPayload = jwtDecode(token);
  } catch (error) {
    return false;
  }
  const { exp } = jsonPayload;
  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
};

export const getTokenFromParams = params => {
  const tokenReceived = queryString.stringify(queryString.parse(params));

  const verifiedToken = verifyToken(tokenReceived);
  if (verifiedToken) {
    localStorage.setItem("token", tokenReceived);
    window.location.href = "http://localhost:8080/home";
    return tokenReceived;
  }
  return localStorage.getItem("token");
};

export default verifyToken;
