import jwtDecode from "jwt-decode";

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

export default verifyToken;
