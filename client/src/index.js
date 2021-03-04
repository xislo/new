import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import firebase from "./firebase";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ToastContainer } from "react-toastify";
import App from "./app";
import AuthProvider from "components/Auth/AuthProvider";
const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};
ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
        <ToastContainer />
      </ReactReduxFirebaseProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);
