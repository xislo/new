import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/style.scss";
import { AuthContext } from "components/Auth/AuthProvider";
import AdminLayout from "layouts/Admin.js";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { compose } from "redux";
import "style.css";
import Authindex from "views/examples/authindex";
import ForgetPassword from "views/examples/ForgetPassword";
import Login from "views/examples/Login";
import SignUp from "views/examples/Signup";
import SignupSuccess from "views/examples/SignupSuccess";
import Terms from "views/examples/Terms";
import "./app.css";
import "./login.css";

const renderPublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Authindex} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/auth/terms" component={Terms} />
      <Route exact path="/signup-success" component={SignupSuccess} />
      <Route exact path="/forget-password" component={ForgetPassword} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const renderPrivateRoutes = () => {
  return (
    <Switch>
      <Route
        path="/admin"
        render={(props) => (
          <div>
            <AdminLayout {...props} />
          </div>
        )}
      />
      <Redirect from="*" to="/admin/editprofile" />
    </Switch>
  );
};

const app = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const renderRoutes = () => {
    if (!isLoggedIn) {
      return renderPublicRoutes();
    }
    return renderPrivateRoutes();
  };

  return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // login: (credentials) => dispatch(login(credentials))
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(app);
