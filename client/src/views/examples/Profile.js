import { updateGoogleProfile } from "actions/profileActions";
import Header from "components/Headers/Header.js";
import { UpdateProfile, ChangePassword } from "state/Account/Epic";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import cx from "classnames";
import isEmpty from "lodash/isEmpty";
import { handleResponseWithToaster } from "components/Toaster/";
import { updateUser } from "lib/helpers/localStorage/";

// reactstrap components
import {
  Button,
  Card,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { compose } from "redux";
import { getUser } from "lib/helpers/localStorage/";
class Clients extends Component {
  constructor(props) {
    super(props);
    const { email, fullname, id, loginType = "" } = getUser();
    this.state = {
      edit: true,
      email: email,
      id: id,
      name: fullname,
      loginType: loginType,
      old_error: false,
      old_password: "",
      old_password_error: "",
      password: "",
      modal: false,
      error: false,
      isLoading: false,
      isPasswordUpdating: false,
    };
    this.updateProfile = this.updateProfile.bind(this);
  }
  updateUserInLocalStorage = () => {
    const { name, email } = this.state;
    updateUser({ fullname: name, email });
  };
  componentDidMount() {}
  toggle = (e) => {
    e.preventDefault();
    if (this.state.edit === true) {
      const { uid, users } = this.props;
      console.log(users);
      const thisUser = users && users.filter((user) => user.id === uid)[0];
      const { email, fullname, id } = getUser();

      this.setState({
        email: email,
        name: fullname,
      });
    } else {
      this.setState({
        email: "",
        name: "",
        password: "",
      });
    }
    this.setState({ edit: !this.state.edit });
  };
  updateProfile() {
    // e.preventDefault();
    var error = false;
    debugger;
    if (isEmpty(this.state.email) && isEmpty(this.state.name)) {
      this.setState({
        email_error: "Invalid Email",
        name_error: "Please Enter a Name",
      });
      return;
    }
    if (isEmpty(this.state.email)) {
      this.setState({ email_error: "Invalid Email" });
      return;
    }
    if (isEmpty(this.state.name)) {
      this.setState({ name_error: "Please Enter a Name" });
      return;
    }

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      this.setState({ email_error: "Invalid Email" });
      error = true;
    } else {
      this.setState({ email_error: "" });
    }
    if (!this.state.name) {
      this.setState({ name_error: "Please Enter a Name" });
      error = true;
    } else {
      this.setState({ name_error: "" });
    }
    // if (this.state.password.length < 8) {
    //   this.setState({
    //     password_error: "Password should not be less than 8 characters",
    //   });
    //   error = true;
    // } else {
    //   this.setState({ password_error: "" });
    // }
    if (!error) {
      this.setState({ isLoading: true });
      this.props
        .updateProfile({
          email: this.state.email,
          fullname: this.state.name,
        })
        .then((response) => {
          this.setState({ isLoading: false });
          handleResponseWithToaster({
            response,
            onAfterSuccess: this.updateUserInLocalStorage,
          });
        });

      // this.toggle(e);
    }
  }
  updatePassword = (e) => {
    e.preventDefault();
    const { old_password, password, email, name } = this.state;
    this.setState({ isPasswordUpdating: true });
    this.props
      .updatePassword({
        old_password,
        new_password: password,
      })
      .then((response) => {
        handleResponseWithToaster({
          response,
        });
        const {
          data: { error },
        } = response;
        this.setState({
          password_error: "",
          old_password_error: "",
          old_error: false,
          error: false,
          modal: error ? true : false,
          isPasswordUpdating: false,
        });
        !error && this.toggle(e);
      });
  };
  updateGoogleProfile = (e) => {
    e.preventDefault();
    var error = false;
    if (!this.state.name) {
      this.setState({ name_error: "Please Enter a Name" });
      error = true;
    } else {
      this.setState({ name_error: "" });
    }
    if (!error) {
      this.props.updateGoogleProfile({
        name: this.state.name,
        uid: this.props.uid,
      });
      this.toggle(e);
    }
  };
  exampleRef = React.createRef();
  render() {
    const { uid, users, id_type } = this.props;
    const { isLoading, isPasswordUpdating, loginType } = this.state;
    const thisUser = users && users.filter((user) => user.id === uid)[0];
    const { email, fullname, id } = getUser();

    return (
      <>
        <Header />
        {/* Page content */}
        <div className="mt--8 ">
          {/* table */}
          <Row noGutters>
            <div className="col">
              <Card
                className=" mt-7  pl-md-1 pr-md-1 p-4 pt-4 pb-4 p-lg-5 "
                style={{ minHeight: "100vh", border: "none" }}
              >
                <Row className="align-items-center">
                  <Col>
                    <h1 className=" mb-0 text-dark">Profile</h1>
                  </Col>
                  <Col className="text-right">
                    <Button
                      hidden={!this.state.edit}
                      size="sm"
                      color="white"
                      onClick={this.toggle}
                    >
                      Edit &nbsp;
                      <i className="fas fa-pen" />
                    </Button>
                    <Button
                      hidden={this.state.edit}
                      size="sm"
                      color="white"
                      onClick={this.toggle}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={{ size: 4 }}>
                    <h3 className="mb-4 text-dark">Email</h3>
                  </Col>
                  <Col xs={{ size: 8 }}>
                    <h3 hidden={!this.state.edit} className="mb-4 text-dark">
                      {email}
                    </h3>
                    <Input
                      className="mb-4 text-dark"
                      hidden={this.state.edit}
                      disabled={loginType === "google"}
                      valid={!this.state.email_error && this.state.email}
                      invalid={this.state.email_error}
                      onChange={(e) => {
                        e.preventDefault();
                        this.setState({ email: e.target.value });
                      }}
                      defaultValue={thisUser && thisUser.email}
                      value={this.state.email}
                    />
                    <FormFeedback>{this.state.email_error}</FormFeedback>
                  </Col>
                  <Col xs={{ size: 4 }}>
                    <h3 className="mb-4 text-dark">Name</h3>
                  </Col>
                  <Col xs={{ size: 8 }}>
                    <h3 hidden={!this.state.edit} className="mb-4 text-dark">
                      {fullname}
                    </h3>
                    <Input
                      className="mb-4 text-dark"
                      hidden={this.state.edit}
                      valid={!this.state.name_error && this.state.name}
                      invalid={this.state.name_error}
                      onChange={(e) => {
                        e.preventDefault();
                        this.setState({ name: e.target.value });
                      }}
                      defaultValue={thisUser && thisUser.name}
                      value={this.state.name}
                    />
                    <FormFeedback>{this.state.name_error}</FormFeedback>
                  </Col>
                  {id_type !== "google" && this.state.edit == false && (
                    <Button
                      color="secondary"
                      onClick={() => {
                        this.setState({ modal: true });
                      }}
                      disabled={loginType === "google"}
                    >
                      Change Password
                    </Button>
                  )}

                  {id_type !== "google" && this.state.edit == true && (
                    <Col xs={{ size: 4 }}>
                      <h3 className="mb-4 text-dark">Password</h3>{" "}
                    </Col>
                  )}
                  {id_type !== "google" && (
                    <Col xs={{ size: 8 }}>
                      <h3 hidden={!this.state.edit} className="mb-4 text-dark">
                        ***********
                      </h3>

                      {/* <Input
                      className="mb-4 text-dark"
                      type="password"
                      ref={this.exampleRef}
                      disabled={id_type === "google"}
                      valid={!this.state.password_error && this.state.password}
                      invalid={this.state.password_error}
                      hidden={this.state.edit}
                      onChange={(e) => {
                        e.preventDefault();
                        this.setState({ password: e.target.value });
                      }}
                      defaultValue={this.state.password}
                    />{" "} */}
                      {/* <FormFeedback>{this.state.password_error}</FormFeedback> */}
                    </Col>
                  )}
                </Row>
                <Row
                  className={cx("mt-8 ", {
                    "d-none": this.state.edit,
                  })}
                >
                  <Col md={3} xs={8} className="mx-auto">
                    <LaddaButton
                      onClick={this.updateProfile}
                      className="btn btn-primary btn-block btn-large "
                      loading={isLoading}
                      data-style={ZOOM_OUT}
                    >
                      Save Changes
                    </LaddaButton>
                    {/* <Button size="lg" color="primary"></Button> */}
                  </Col>
                </Row>
              </Card>
            </div>
          </Row>
          {/* className={className} */}
          <Modal isOpen={this.state.modal} toggle={this.state.modal}>
            <ModalHeader>Update Password</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Old Password</Label>
                <Input
                  className="mb-4 text-dark"
                  type="password"
                  disabled={id_type === "google"}
                  valid={
                    !this.state.old_password_error && this.state.old_password
                  }
                  invalid={this.state.old_error}
                  hidden={this.state.edit}
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ old_password: e.target.value });
                  }}
                  defaultValue={this.state.password}
                />
                <FormFeedback>{this.state.old_password_error}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">New Passsword</Label>
                <Input
                  className="mb-4 text-dark"
                  type="password"
                  ref={this.exampleRef}
                  disabled={id_type === "google"}
                  valid={!this.state.password_error && this.state.password}
                  invalid={this.state.error}
                  hidden={this.state.edit}
                  onChange={(e) => {
                    e.preventDefault();
                    this.setState({ password: e.target.value });
                  }}
                  defaultValue={this.state.password}
                />
                <FormFeedback>{this.state.password_error}</FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Row className="w-100">
                <Col xs={6}>
                  <LaddaButton
                    onClick={this.updatePassword}
                    className="btn btn-primary btn-block btn-large "
                    loading={isPasswordUpdating}
                    data-style={ZOOM_OUT}
                  >
                    Update
                  </LaddaButton>
                </Col>
                <Col xs={6}>
                  <Button
                    color="secondary"
                    className="w-100"
                    onClick={() => {
                      this.setState({ modal: false });
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    id_type: state.auth.id_type,
    old_password: state.auth.old_password,
    users: state.firestore.ordered.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (credentials) => dispatch(ChangePassword(credentials)),
    updateProfile: (credentials) => dispatch(UpdateProfile(credentials)),
    updateGoogleProfile: (credentials) =>
      dispatch(updateGoogleProfile(credentials)),
  };
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Clients);
