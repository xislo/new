export const login = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        if (data.user.emailVerified == false) {
          throw { message: "Verify you email first before logging in" };
        }
        return data.user.uid;
      })
      .then((uid) => {
        return firestore.collection("users").doc(uid).get();
      })
      .then((data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          id_type: data.data().role,
          uid: data.id,
          error: "",
        });
        dispatch({
          type: "SAVE_PASSWORD",

          old_password: credentials.password,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "LOGIN_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};
export const logout = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then((data) => {
        dispatch({
          type: "LOGOUT_SUCCESS",
          id_type: "",
          uid: "",
          signup: false,
          error: "",
        });
      });
  };
};
export const signup = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        firebase.auth().currentUser.sendEmailVerification();

        return data.user.uid;
      })
      .then((uid) => {
        firestore
          .collection("users")
          .doc(uid)
          .set({
            role: "default",
            name: credentials.name,
            email: credentials.email,
          })
          .then((data) => {
            dispatch({
              type: "SIGNUP_SUCCESS",
              id_type: "default",
              uid: uid,
              error: "",
            });
          })
          .catch((error) => {
            dispatch({
              type: "SIGNUP_FAIL",
              id_type: "",
              uid: "",
              error: error,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "SIGNUP_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};
export const googleSignup = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(credentials.uid)
      .set({
        name: credentials.name,
        email: credentials.email,
        role: "google",
      })
      .then((data) => {
        dispatch({
          type: "SIGNUP_SUCCESS_GOOGLE",
          id_type: "google",
          uid: credentials.uid,
          error: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: "SIGNUP_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};
export const googleSignin = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(credentials.uid)
      .get()
      .then((data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          id_type: data.data().role,
          uid: credentials.uid,
          error: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
          id_type: "",
          uid: "",
          error: error,
        });
      });
  };
};

export const subscribe = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("subscribers")
      .add({
        email: email,
      })
      .then((data) => {
        dispatch({
          type: "SUBSCRIBE_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "SUBSCRIBE_FAIL",
        });
      });
  };
};
export const forgetPassword = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((data) => {
        dispatch({
          type: "FORGET_PASSWORD_SUCCESS",
          error: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: "FORGET_PASSWORD_FAIL",
          error: error,
        });
      });
  };
};
