import { googleSignup } from "actions/authActions";
import { handleResponseWithToaster } from "components/Toaster/";
import React from "react";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
// reactstrap components
import { Form, Input } from "reactstrap";
import { compose } from "redux";
import { SignUp as Register } from "state/Account/Epic";
import firebase from "../../firebase";
import { addToken } from "lib/helpers/localStorage/";
import { GoogleLoginButton } from "components/SocialLogins/";

class SignUp extends React.Component {
  state = { googleError: "", message: "", isLoading: false };
  onAfterSuccess = ({ response: { data } }) => {
    const { token, user } = data;
    addToken(
      JSON.stringify({
        token: token,
        userData: user,
      })
    );
    window.location.href = "/";
  };
  signup = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props
      .signup({
        fullname: e.target.fullname.value,
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

    // // alert("Account Created succesfully. Kindly check your email to verify your account and log")
    // setTimeout(() => {
    //   // this.props.history.push('/login')
    // }, 5000);
    // setTimeout(() => {
    //   this.setState({
    //     message:
    //       "Account Created succesfully. Kindly check your email to verify your account and log",
    //   });
    //   this.props.history.push("/signup-success");
    // }, 3000);
  };
  googleSignup = (e) => {
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

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        this.setState({ googleError: error.message });
      });
  };
  render() {
    const { uid, authError } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        <main>
          <div class="main-title">
            <h1
              className="mt-3 "
              style={{ fontSize: "40px", color: " #504de4" }}
            >
              xislo
              {/* <img src="/xislo.jpg" style={{width:'85px '}}/> */}
            </h1>
          </div>
          <br />
          <div class="main-form">
            <div class="form-element login-message pb-2">
              Create your account
            </div>
            <GoogleLoginButton />
            <Form onSubmit={this.signup}>
              <div class="form-element">
                <label class="form-label mb-0 pb-0">Email</label>
                <br />
                <Input
                  class="form-input"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <br />
              <div class="form-element">
                <label class="form-label mb-0 pb-0">Full Name</label>
                <br />
                <Input
                  class="form-input"
                  type="text"
                  name="fullname"
                  id="name"
                />
              </div>
              <br />
              <div class="form-down">
                <label class="form-label mb-0 pb-0">Password</label>
                <br />
                <Input
                  class="form-input"
                  type="password"
                  name="password"
                  id="password"
                />
                <br />
              </div>
              <span id="warning" class="err-msg">
                {this.state.googleError
                  ? this.state.googleError
                  : authError
                  ? authError
                  : null}
              </span>
              <span id="warning" class="text-success">
                {this.state.message ? this.state.message : ""}
              </span>

              <LaddaButton
                type="submit"
                className="btn btn-primary btn-block btn-large"
                loading={isLoading}
                data-style={ZOOM_OUT}
              >
                Sign Up
              </LaddaButton>
            </Form>
          </div>

          <div class="bottom-signup-link">
            Have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log in
            </Link>
          </div>
        </main>

        <footer>
          <p class="text-center text-muted">
            &copy; xislo | <Link to="/terms">Terms of service</Link>
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
    signup: (credentials) => dispatch(Register(credentials)),
    googleSignup: (credentials) => dispatch(googleSignup(credentials)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
