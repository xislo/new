import {
  addItem,
  clearItem,
  getToken,
  getUser,
  isValidToken,
} from "lib/helpers/localStorage";
import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());

  /**
   * For 3rd-party Authentication [e.g. Autho0, firebase, AWS etc]
   *
   */
  const tokenAuth = (token, user = {}) => {
    setUser(user);
    setToken(token);
    addItem("token", token);
    setIsLoggedIn(true);
  };

  const forgetPass = (params) => {
    console.log(params, "forget password form Props");
  };

  const changePass = (params) => {
    console.log(params, "change password form Props");
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    clearItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logOut,
        forgetPass,
        changePass,
        tokenAuth,
        user,
        token,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
