import { signup } from "actions/authActions";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { compose } from "redux";
import { googleSignup } from "actions/authActions";

class SignUp extends React.Component {
  state = { googleError: "",message:"" };
  signup = (e) => {
    e.preventDefault();
    this.props.signup({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });


    // alert("Account Created succesfully. Kindly check your email to verify your account and log")
    setTimeout(() => {
    this.props.history.push('/login')
      
    }, 5000);
    setTimeout(() => {
      this.setState({message:"Account Created succesfully. Kindly check your email to verify your account and log"})
        
    }, 3000);
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
              Account Created
            </div>
            <div class="text-success social-logins form-element">
              {/* <div style={{cursor:'pointer'}}  class="social-connection"> */}
                You have signed up successfully 
                
              {/* </div> */}
            </div>
              
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
    signup: (credentials) => dispatch(signup(credentials)),
    googleSignup: (credentials) => dispatch(googleSignup(credentials)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);
