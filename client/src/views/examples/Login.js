/*eslint-disable*/
import { googleSignin, googleSignup } from "actions/authActions";
import { handleResponseWithToaster } from "components/Toaster/";
import { addToken } from "lib/helpers/localStorage/";
import React from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Form, Input } from "reactstrap";
import { compose } from "redux";
import { SignIn as login } from "state/Account/Epic";
import firebase from "../../firebase";
import { GoogleLoginButton } from "components/SocialLogins/";
class Login extends React.Component {
  state = { googleError: "", isLoading: false };
  onAfterSuccess = ({ response: { data } }) => {
    const { token, user } = data;
    debugger;
    addToken(
      JSON.stringify({
        token: token,
        userData: user,
      })
    );
    window.location.href = "/";
  };

  login = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props
      .login({
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        handleResponseWithToaster({
          response,
          onAfterSuccess: this.onAfterSuccess,
          onAfterFailure: () => {},
        });
      });
  };
  googleSignin = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.props.googleSignup({
          uid: firebase.auth().currentUser.uid,
          email: user.email,
          name: user.displayName,
        });

        // this.props.googleSignin({
        //   uid: firebase.auth().currentUser.uid,
        // });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        this.setState({ googleError: error.message });
      });
  };

  render() {
    const { authError } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <div className="main-title">
          <h1 className="mt-3 " style={{ fontSize: "40px", color: " #504de4" }}>
            xislo
            {/* <img src="/xislo.jpg" style={{width:'85px '}}/> */}
          </h1>
        </div>
        <br />
        <div className="main-form">
          <div className="form-element login-message pb-2">
            Sign in to your account
          </div>
          <GoogleLoginButton />

          <Form onSubmit={this.login}>
            <div className="form-element">
              <label className="form-label mb-0 pb-0"> Email</label>
              <br />
              <Input className="form-input" type="email" name="email" id="email" />
            </div>
            <br />
            <div className="form-down">
              <label className="form-label mb-0 pb-0">Password</label>
              <span className="forgot-password">
                <Link to="forget-password" style={{ textDecoration: "none" }}>
                  Forgot your password?{" "}
                </Link>
              </span>
              <br />
              <Input
                className="form-input"
                type="password"
                name="password"
                id="password"
              />
              <br />
            </div>
            {this.state.googleError
              ? this.state.googleError
              : authError
              ? authError
              : null}
            <LaddaButton
              type="submit"
              className="btn btn-primary btn-block btn-large"
              loading={isLoading}
              data-style={ZOOM_OUT}
            >
              Login
            </LaddaButton>
          </Form>
        </div>
        <div className="bottom-signup-link">
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: " none" }}>
            Sign up
          </Link>
        </div>
        <footer>
          <p className="text-center text-muted">
            &copy; xislo | <Link to="/auth/terms">Terms of service</Link>
          </p>
        </footer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials)),
    googleSignin: (credentials) => dispatch(googleSignin(credentials)),
    googleSignup: (credentials) => dispatch(googleSignup(credentials)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
