import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { compose } from "redux";
import rocket from "../../assets/img/rocket.svg";
import { subscribe } from "../../actions/authActions";
// import aboutImg from '../Images/team@2x.png'

class authindex extends Component {
  state = { email: "" };
  subscribe = (e) => {
    e.preventDefault();
    var error = false;
    this.setState({ email_error: "Invalid Email" });
    let arrs=this.props.subscribers.filter(item=>item.email==this.state.email)
    if(arrs.length>0){
      console.log("cames")
      this.setState({ email_error: "Email already submitted" });
      error = true; 
    }
    else if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      this.setState({ email_error: "Invalid Email" });
      error = true;
    } else {
      this.setState({ email_error: "" });
    }
    if (!error) {
      this.props.subscribe(this.state.email);
      this.setState({
        email: "",
        email_error: "Thank you for signing up"
      });
    }
  };
  render() {
    return (
      <>
        <div class="Home">
          <div id="home_txt">
            <h1>xislo</h1>
            {/* <img src="/xislo.jpg" style={{marginTop:'10px',width:'154px '}}/> */}


            <h2 className="text-darker mt-md-5" style={{lineHeight:'35px'}}>
              Something cool is about to launch here
            </h2>

            <h3>Leave us your email and we'll let you know when it's up</h3>

            <input
              placeholder="Your email address"
              name="email"
              type="email"
              id="userEmail"
              onChange={(e) => {
                e.preventDefault();
                this.setState({ email: e.target.value });
              }}
            />

            <button onClick={this.subscribe} id="submit">
              Ping me when it’s up
            </button>
            <p
              id={
                this.state.email_error != "" && this.state.email_error!='Thank you for signing up'
                  ? "warning"
                  : "emailConfirmation"
              }
              class={
                this.state.email_error != "" ? "err-msg" : null
              }
            >
              {this.state.email_error ? this.state.email_error : null}
            </p>
          </div>
          <div id="home_img">
            <img src={rocket} />
          </div>
        </div>

        <footer>
          <Link to="/auth/terms">Terms of service</Link>
        </footer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subscribers: state.firestore.ordered.subscribers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (email) => dispatch(subscribe(email)),
  };
};

export default compose(
  firestoreConnect(() => ['users','subscribers']),
  // firestoreConnect([{ collection: "users" },{ subscribers: "subscribers" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(authindex);
