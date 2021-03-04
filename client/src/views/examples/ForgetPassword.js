import { forgetPassword } from "actions/authActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";

class ForgetPassword extends Component {
  state = { email: "" };
  reset = (e) => {
    e.preventDefault();
    var error = false;
    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      this.setState({ email_error: "Invalid Email" });
      error = true;
    } else {
      this.setState({ email_error: "" });
    }
    if (!error) {
      this.props.forgetPassword(this.state.email);
      this.setState({
        email: "",
        email_error:
          "You will receive a Mail on " +
          this.state.email +
          " to reset password",
      });
    }
  };
  render() {
    const { resetError } = this.props;
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
            <div class="form-element forgot-message">
              <p
                style={{
                  fontWeight: "600",
                  wordSpacing: "0px",
                  fontSize: "13px",
                }}
              >
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
              </p>
            </div>

            <form action="xislo.us.auth0.com" method="POST">
              <div class="form-element">
                <label class="form-label mb-0">Email</label>
                <br />
                <input
                  class="form-input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>

              <span
                id={
                  this.state.email_error === "Invalid Email" || resetError
                    ? "warning"
                    : "emailConfirmation"
                }
                class={
                  this.state.email_error === "Invalid Email" || resetError
                    ? "err-msg"
                    : null
                }
              >
                {" "}
                {resetError
                  ? resetError
                  : this.state.email_error
                  ? this.state.email_error
                  : null}
              </span>
              <br />
              <input
                class="login-button"
                type="submit"
                name="submit"
                value="Continue"
                onClick={this.reset}
                id="reset-btn"
              />
            </form>
          </div>

          <div class="bottom-signup-link">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Return to sign in
            </Link>
          </div>
        </main>
        <br />
        <footer>
          <p class="text-center text-muted">
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
    resetError: state.auth.resetError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    forgetPassword: (email) => dispatch(forgetPassword(email)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(ForgetPassword);
