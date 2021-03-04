import API from "../../lib/api/Users";

import {
  accountLoginBegin,
  accountLoginFailure,
  accountLoginSuccess,
  changePasswordBegin,
  changePasswordFailure,
  changePasswordSuccess,
} from "./Actions";

// Actions API

const SignIn = (params) => async (dispatch) => {
  try {
    dispatch(accountLoginBegin());

    let response = await API.signIn(params);

    if (response.error) {
      return dispatch(accountLoginFailure(response || "ERROR"));
    } else {
      return dispatch(accountLoginSuccess(response));
    }
  } catch (error) {
    dispatch(accountLoginSuccess("Something Went Wrong" || "ERROR"));
  }
};

const SignUp = (params) => async (dispatch) => {
  try {
    dispatch(accountLoginBegin());

    let response = await API.signUp(params);

    if (response.error) {
      return dispatch(accountLoginFailure(response || "ERROR"));
    } else {
      return dispatch(accountLoginSuccess(response));
    }
  } catch (error) {
    dispatch(accountLoginSuccess("Something Went Wrong" || "ERROR"));
  }
};

const ChangePassword = (params) => async (dispatch) => {
  try {
    dispatch(changePasswordBegin());

    let response = await API.updatePassword(params);

    if (response.error) {
      return dispatch(changePasswordFailure(response || "ERROR"));
    } else {
      return dispatch(changePasswordSuccess(response));
    }
  } catch (error) {
    dispatch(changePasswordFailure("Something Went Wrong" || "ERROR"));
  }
};

const UpdateProfile = (params) => async (dispatch) => {
  try {
    dispatch(changePasswordBegin());
    debugger;
    let response = await API.updateProfile(params);
    debugger;
    if (response.error) {
      return dispatch(changePasswordFailure(response || "ERROR"));
    } else {
      return dispatch(changePasswordSuccess(response));
    }
  } catch (error) {
    dispatch(changePasswordFailure("Something Went Wrong" || "ERROR"));
  }
};

const AuthorizedUser = () => async (dispatch) => {
  try {
    dispatch(accountLoginBegin());
    let response = await API.getAuthorizedUser();

    if (response.error) {
      return dispatch(accountLoginFailure(response || "ERROR"));
    } else {
      return dispatch(accountLoginSuccess(response));
    }
  } catch (error) {
    dispatch(accountLoginSuccess("Something Went Wrong" || "ERROR"));
  }
};

const GoogleLogin = (params) => async (dispatch) => {
  try {
    dispatch(accountLoginBegin());

    let response = await API.googleLogin(params);

    if (response.error) {
      return dispatch(accountLoginFailure(response || "ERROR"));
    } else {
      return dispatch(accountLoginSuccess(response));
    }
  } catch (error) {
    dispatch(accountLoginSuccess("Something Went Wrong" || "ERROR"));
  }
};

export {
  SignIn,
  SignUp,
  ChangePassword,
  AuthorizedUser,
  GoogleLogin,
  UpdateProfile,
};
