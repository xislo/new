export const updateProfile = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .currentUser.updateEmail(credentials.email)
      .then((data) => {
        // firebase
        //   .auth()
        //   .currentUser.updatePassword(credentials.password)
        //   .then((data) => {
            firestore
              .collection("users")
              .doc(credentials.uid)
              .update({
                name: credentials.name,
                email: credentials.email,
              })
              .then((data) => {
                dispatch({
                  type: "UPDATE_PROFILE_SUCCESS",
                  error: "",
                });
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                  type: "UPDATE_PROFILE_FAIL",
                  error: error,
                });
              });
          })
      //     .catch((error) => {
      //       console.log(error);
      //       dispatch({
      //         type: "UPDATE_PASSWORD_FAIL",
      //         error: error,
      //       });
      //     });
      // })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "UPDATE_EMAIL_FAIL",
          error: error,
        });
      });
  };
};

export const updatePassword = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log("fuckokk")
        console.log(credentials)
        firebase 
          .auth()
          .currentUser.updatePassword(credentials.password)
          .then((data) => {
            console.log("updated")
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: "UPDATE_PASSWORD_FAIL",
              error: error,
            });
          });
      }
};

export const updateGoogleProfile = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(credentials.uid)
      .update({
        name: credentials.name,
      })
      .then((data) => {
        dispatch({
          type: "UPDATE_PROFILE_SUCCESS",
          error: "",
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "UPDATE_PROFILE_FAIL",
          error: error,
        });
      });
  };
};
