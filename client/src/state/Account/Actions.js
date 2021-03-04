// Action Constants
export const ACCOUNT_LOGIN_BEGIN = "ACCOUNT_LOGIN_BEGIN";
export const ACCOUNT_LOGIN_SUCCESS = "ACCOUNT_LOGIN_SUCCESS";
export const ACCOUNT_LOGIN_FAILURE = "ACCOUNT_LOGIN_FAILURE";

export const CHANGE_PASSWORD_BEGIN = "CHANGE_PASSWORD_BEGIN";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// Action creators

export const accountLoginBegin = () => ({
  type: ACCOUNT_LOGIN_BEGIN,
});

export const accountLoginSuccess = (data) => ({
  type: ACCOUNT_LOGIN_SUCCESS,
  data,
});

export const accountLoginFailure = (error) => ({
  type: ACCOUNT_LOGIN_FAILURE,
  data: error,
});

export const changePasswordBegin = () => ({
  type: CHANGE_PASSWORD_BEGIN,
});

export const changePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  data,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  data: error,
});
