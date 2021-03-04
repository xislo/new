const initState = {
  authError: "",
  uid: "",
  id_type: "",
  signup: false,
  old_password:localStorage.getItem("old_password")==null ? "":localStorage.getItem("old_password")
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uid: action.uid,
        id_type: action.id_type,
        authError: ""
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        uid: "",
        id_type: "",
        authError: action.error.message,
      };
    case "LOGOUT_SUCCESS":
      localStorage.clear()
      return {
        ...state,
        authError: "",
        uid: "",
        id_type: "",
        signup: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        uid: "", //action.uid
        id_type: action.id_type,
        authError: "",
        signup: action.signup,
      };
      case "SIGNUP_SUCCESS_GOOGLE":
        return {
          ...state,
          uid: action.uid,
          id_type: action.id_type,
          authError: "",
          signup: action.signup,
        };
        
    case "SAVE_PASSWORD":
      const newState={...state}
      newState.old_password=action.old_password
      localStorage.setItem("old_password",action.old_password)
      return {
        ...newState
      };
    case "SIGNUP_FAIL":
      return {
        ...state,
        uid: "",
        id_type: "",
        authError: action.error.message,
      };
    case "FORGET_PASSWORD_SUCCESS":
      return {
        ...state,
        resetError: action.error.message,
      };
    case "FORGET_PASSWORD_FAIL":
      return {
        ...state,
        resetError: action.error.message,
      };

    default:
      return state;
  }
};

export default authReducer;
