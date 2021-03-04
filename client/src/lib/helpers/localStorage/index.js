export const addItem = (key, value = "") => {
  if (key) localStorage.setItem(key, value);
};
export const getItem = (key) => localStorage.getItem(key);

export const clearItem = (key) => {
  localStorage.removeItem(key);
};
export const addToken = (tokenObject) => {
  addItem("token", tokenObject);
};
export const getTokenItem = () => {
  return getItem("token");
};
export const updateUser = (obj) => {
  addToken(
    JSON.stringify({
      userData: obj,
      token: getToken(),
    })
  );
};

export const getToken = () => {
  const data = getTokenItem();
  if (data) {
    return JSON.parse(getItem("token")).token;
  }
  return null;
};
export const Logout = () => {
  clearItem("token");
  window.location.href = "/login";
};

export const getUser = () => {
  const token = getTokenItem();

  if (token) {
    return JSON.parse(token).userData;
  }
  return null;
};

export const isValidToken = () => {
  const token = getTokenItem();

  // JWT decode & check token validity & expiration.
  // https://www.npmjs.com/package/jwt-decode
  if (token) return true;
  return false;
};
